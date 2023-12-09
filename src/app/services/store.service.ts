import { Injectable, effect, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, shareReplay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakService } from './speak.service';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  db = inject(PocketbaseService);
  auth = inject(AuthService);
  speak = inject(SpeakService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  lessons = {
    results: this.db.getFetchedResults(),
    details: this.db.getItemDetailsState(),
    create: this.db.createItem,
    edit: this.db.updateItem,
    fetchTagResults: (tag: string) => this.db.fetchResults(tag),
    fetchDetails: (id: string) => this.db.fetchDetails(id)
  }

   app = {
    showEdit: signal<boolean>(false),
    removeEditTag: () => this.removeEditTag(),
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
      const editValue = params.get('edit')?.valueOf();
      editValue === 'true' ? this.app.showEdit.set(true) : this.app.showEdit.set(false);
      if (this.app.tag != tagParam) {
        this.app.tag = tagParam;
        this.lessons.fetchTagResults(this.app.tag || "A1");
      }
    });
   }

   removeEditTag() {
    this.router.navigate([], {
      queryParams: {
        edit: null
      },
      queryParamsHandling: "merge",
      preserveFragment: true
    });
   }

}
