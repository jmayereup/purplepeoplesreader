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

  private tagParam: string = "A1";
  private langParam: string = "English";
  // private resetParam: string = "false";

  user = {
    checkUser: () => this.auth.checkUser(),
    userId: this.auth.userIdSignal,
    userName: this.auth.userNameSignal,
    userEmail: this.auth.userEmailSignal,
    userLinesRead: this.auth.userLinesReadSignal,
    userLinesReadTemp: 0,
    userPlaylist: this.auth.userPlaylistSignal,
    addToPlaylist: (id: string, title: string, language: string) => {
      if (!this.user.userId()) return;
      this.db.addToPlaylist(id, title, this.user.userId()!, language, this.user.userPlaylist())
    },
    removeLessonFromPlaylist: (id: string) => {
      if (!this.user.userId()) return;
      this.db.removeLessonFromPlaylist(id, this.user.userId()!, this.user.userPlaylist())
    },
    updateLinesRead: (points: number) => {
      if (!this.user.userId()) return;
      this.db.updateLinesRead(points, this.user.userId()!, this.user.userLinesRead() || 1 )
      if (!this.user.userLinesRead()) return;
      this.user.userLinesRead.set(this.user.userLinesRead()! + points);
    },
    refresh: () => this.auth.db.collection('users').authRefresh(),
    clear: () => this.auth.authStore.clear(),
    loginWithEmail: (email: string, password: string) => this.auth.loginWithEmail(email, password),
    loginWithGoogle: () => this.auth.loginWithGoogle(),
    isValid: () => this.auth.authStore.isValid,
  }

  lessons = {
    results: this.db.getFetchedResults(),
    all: this.db.getAllResults(),
    userResults: this.db.getUserCreatedLessons(),
    details: this.db.getItemDetailsState(),
    create: (data: LessonsRecord) => this.db.createItem(data),
    update: (id: string, data: LessonsRecord) => this.db.updateItem(id, data).then(() => this.lessons.fetchTagResults((this.app.tag()), (data.language?.valueOf() || this.app.lang()))),
    delete: (id: string) => this.db.deleteItem(id).then(() => this.lessons.fetchTagResults()),
    fetchTagResults: (tag: string = this.tagParam, lang: string = this.langParam) => this.db.fetchTagResults(tag, lang),
    fetchDetails: (id: string) => this.db.fetchDetails(id).then((data) => data),
    fetchUserCreatedLessons: (userId: string) => this.db.fetchUserCreatedLessons(userId),
    fetchAllResults: () => this.db.fetchAllResults()
  }

  app = {
    showEdit: signal<boolean>(false),
    selectedLanguage: signal<string | null>(null),
    selectedRate: signal<number | null>(null),
    tag: signal<string>(""),
    lang: signal<string>(""),
    fontSize: signal<string>('large'),
  }

  tts = {
    readUtterance: (text: string, points: number = 1, rate: number = .8) => this.speak.readUtterance(text, points,
      this.app.selectedLanguage() || assignLanguageCode(this.lessons.details()?.language || 'English'),
      this.app.selectedRate() || rate,
    ).then((points: number) => {
      console.log(this.user.userLinesRead(), points);
      this.user.userLinesReadTemp = this.user.userLinesReadTemp + points;
      if (this.user.userLinesReadTemp >= 10) {
        this.user.updateLinesRead(this.user.userLinesReadTemp);
        this.user.userLinesReadTemp = 0;
      }
    }),
    audioPlaying: signal<boolean>(false),
    pause: () => this.speak.pauseVoice
  }


  constructor() {

    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      this.tagParam = params.get('tag') || 'A1';
      this.langParam = params.get('lang') || 'English';
      // this.resetParam = (params.get('reset') || 'false');
      // if (this.resetParam == 'true') {
      //   this.lessons.details.set(null);
      // }
      this.app.tag.set(this.tagParam);
      this.app.lang.set(this.langParam);
      console.log('fetching tag results', this.tagParam, this.langParam, this.user.userId());
      if ((this.tagParam == 'user') && this.user.userId()) return this.lessons.fetchUserCreatedLessons(this.user.userId()!);
      // if (!this.tagParam || !this.langParam) return console.log('no tag or lang');
      return this.lessons.fetchTagResults(this.app.tag(), this.app.lang());
    });

  }
}
