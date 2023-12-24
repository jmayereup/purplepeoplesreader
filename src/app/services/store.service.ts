import { Injectable, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, shareReplay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpeakService } from './speak.service';
import { LessonsRecord } from '../shared/pocketbase-types';
import { assignLanguageCode } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private db = inject(PocketbaseService);
  private auth = inject(AuthService);
  private speak = inject(SpeakService);
  public route = inject(ActivatedRoute);

  user = {
    getUser: () => this.auth.getUser().then(() => {
      if (this.auth.authStore.model?.['id']) this.lessons.fetchUserCreatedLessons(this.auth.authStore.model?.['id']);
    }),
    userId: this.auth.authStore.model?.['id'],
    userName: this.auth.authStore.model?.['username'],
    refresh: () => this.auth.db.collection('users').authRefresh()
  }

  lessons = {
    results: this.db.getFetchedResults(),
    userResults: this.db.getUserCreatedLessons(),
    details: this.db.getItemDetailsState(),
    create: (data: LessonsRecord) => this.db.createItem(data),
    update: (id: string, data: LessonsRecord) => this.db.updateItem(id, data).then(() => this.lessons.fetchTagResults((this.app.tag()), (data.language?.valueOf() || this.app.lang()))),
    delete: (id: string) => this.db.deleteItem(id).then(() => this.lessons.fetchTagResults(this.app.tag(), this.app.lang())),
    fetchTagResults: (tag: string, lang: string) => this.db.fetchTagResults(tag, lang),
    fetchDetails: (id: string) => this.db.fetchDetails(id),
    fetchUserCreatedLessons: (userId: string) => this.db.fetchUserCreatedLessons(userId)
  }

  app = {
    showEdit: signal<boolean>(false),
    selectedLanguage: signal<string | null>(null),
    selectedRate: signal<number | null>(null),
    tag: signal<string>(""),
    lang: signal<string>(""),
    fontSize: signal<string>('large')
  }

  tts = {
    readUtterance: (text: string, points: number = 1, rate: number = .8) => this.speak.readUtterance(text, points,
      this.app.selectedLanguage() || assignLanguageCode(this.lessons.details()?.language || 'English'),
      this.app.selectedRate() || rate
    ),
    pause: () => this.speak.pauseVoice
  }


  constructor() {

    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      const tagParam = (params.get('tag') || 'A1');
      const langParam = (params.get('lang') || 'English');
      if (this.app.tag() != tagParam || this.app.lang() != langParam) {
        this.app.tag.set(tagParam);
        this.app.lang.set(langParam);
        if (tagParam == 'user') return this.lessons.fetchUserCreatedLessons(this.user.userId);
        return this.lessons.fetchTagResults(this.app.tag(), this.app.lang());
      } else return console.log('no lesson found');
    });

  }
}
