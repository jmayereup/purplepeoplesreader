import { Injectable, effect, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, shareReplay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakService } from './speak.service';
import { sign } from 'crypto';
import { LessonsRecord } from '../shared/pocketbase-types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private db = inject(PocketbaseService);
  private auth = inject(AuthService);
  private speak = inject(SpeakService);
  private route = inject(ActivatedRoute);
  // private router = inject(Router);

  user = {
    getUser: () => this.auth.getUser(),
    userId: this.auth.userId,
    userName: this.auth.userName
  }

  lessons = {
    results: this.db.getFetchedResults(),
    details: this.db.getItemDetailsState(),
    create: (data: LessonsRecord) => this.db.createItem(data),
    update: (id: string, data: LessonsRecord) => this.db.updateItem(id, data).then(() => this.lessons.fetchTagResults(this.app.tag)),
    delete: (id: string) => this.db.deleteItem(id).then(() => this.lessons.fetchTagResults(this.app.tag)),
    fetchTagResults: (tag: string) => this.db.fetchResults(tag),
    fetchDetails: (id: string) => this.db.fetchDetails(id)
  }

   app = {
    showEdit: signal<boolean>(false),
    selectedLanguage: signal<string | null >(null),
    selectedRate: signal<number | null>(null),
    tag: "",
    fontSize: signal<string>('large')
  }

  tts = {
    readUtterance: (text: string, points: number, lang?: string, rate?: number) => this.speak.readUtterance(text, points, 
      this.app.selectedLanguage() || lang || this.lessons.details()?.language, 
      this.app.selectedRate() || rate || .8
      ),
    pause: () => this.speak.pauseVoice
  }


  constructor() {

    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      const tagParam = (params.get('tag')?.valueOf() || 'A1');
      if (this.app.tag != tagParam) {
        this.app.tag = tagParam;
        this.lessons.fetchTagResults(this.app.tag || "A1");
      }
    });
   }
  
}
