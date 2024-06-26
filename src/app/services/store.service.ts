import { Injectable, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, shareReplay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakService } from './speak.service';
import { LessonsLanguageOptions, LessonsRecord } from '../shared/pocketbase-types';
import { assignLanguageCode } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private db = inject(PocketbaseService);
  private auth = inject(AuthService);
  private speak = inject(SpeakService);
  public route = inject(ActivatedRoute);
  public router = inject(Router);

  private tagParam: string = "A1";
  private langParam: string = "English";
  private resetParam: string = "false";  //used to clear the detailsSignal to allow creatin a new lesson
  public tempLinesRead = this.speak.currentLinesRead;

  user = {
    checkUser: () => this.auth.checkUser().then((d) => {
      console.log('user checked', d);
      if (!d) return;
      this.lessons.fetchUserCreatedLessons(d.record.id);
    }),
    clearUser: () => {
      this.user.userId.set(undefined);
      this.user.userName.set(undefined);
      this.user.userEmail.set(undefined);
      this.user.userLinesRead.set(undefined);
      this.user.userPlaylist.set(undefined);
      this.lessons.userResults.set(null);
    },
    userId: this.auth.userIdSignal,
    userName: this.auth.userNameSignal,
    userEmail: this.auth.userEmailSignal,
    userLinesRead: this.auth.userLinesReadSignal,
    // userLinesReadTemp: () => this.speak.currentLinesRead,
    userPlaylist: this.auth.userPlaylistSignal,
    addToPlaylist: (id: string, title: string, language: LessonsLanguageOptions) => {
      if (!this.user.userId()) {
        const newPlaylist = this.user.userPlaylist() || undefined;
        if (!newPlaylist) {
          this.user.userPlaylist.set([{ id, title, language }]);
          return;
        }
        if (newPlaylist.find((item) => item.id == id)) return console.log('already in playlist');
        if (newPlaylist) {
          newPlaylist.push({ id, title, language });
          this.user.userPlaylist.set(newPlaylist);
        }
        return;
      }
      this.db.addToPlaylist(id, title, language, this.user.userId() || 'none', this.user.userPlaylist());
    },
    removeLessonFromPlaylist: (id: string) => {
      if (!this.user.userId()) return;
      this.db.removeLessonFromPlaylist(id, this.user.userId()!, this.user.userPlaylist())
        .then((d) => this.user.userPlaylist.set(d?.playlist || [{ id: '', title: '', language: LessonsLanguageOptions.English }]));

    },
    updateLinesRead: (points: number) => {
      if (!this.user.userId()) return;
      this.db.updateLinesRead(points, this.user.userId()!, this.user.userLinesRead() || 1).then((d) => {
        this.user.userLinesRead.set(d?.linesRead || 0);
      });
      if (!this.user.userLinesRead()) return;
      // this.user.userLinesRead.set(this.user.userLinesRead()! + points);
    },
    updateUsername: (username: string) => this.auth.updateUsername(username),
    refresh: () => this.auth.db.collection('users').authRefresh(),
    clear: () => this.auth.authStore.clear(),
    loginWithEmail: (email: string, password: string) => this.auth.loginWithEmail(email, password),
    loginWithGoogle: () => this.auth.loginWithGoogle(),
    registerWithEmail: (email: string, password: string, username: string) => {
      this.auth.registerWithEmail(email, password, username).then(
        (d) => {
          if (this.user.userId()) this.router.navigate(['/']);
        });
    },
    isValid: () => this.auth.authStore.isValid,
  };

  lessons = {
    results: this.db.getFetchedResults(),
    all: this.db.getAllResults(),
    userResults: this.db.getUserCreatedLessons(),
    details: this.db.getItemDetailsState(),
    create: (data: LessonsRecord) => this.db.createItem(data),
    update: (id: string, data: LessonsRecord) => this.db.updateItem(id, data).then(() => this.lessons.fetchTagResults((this.app.tag()), (data.language?.valueOf() || this.app.lang()))),
    delete: (id: string) => this.db.deleteItem(id).then(() => this.lessons.fetchTagResults()),
    fetchTagResults: (tag: string = this.tagParam, lang: string = this.langParam) => {
      this.lessons.results.set(null);
      this.db.fetchTagResults(tag, lang);
    },
    fetchDetails: (id: string) => this.db.fetchDetails(id).then((data) => data),
    fetchUserCreatedLessons: (userId: string) => this.db.fetchUserCreatedLessons(userId),
    fetchAllResults: () => this.db.fetchAllResults(),
    loading: signal<boolean>(false),
  }

  app = {
    showEdit: signal<boolean>(false),
    selectedLanguage: signal<string | null>(null),
    selectedRate: signal<number | null>(null),
    tag: signal<string>(""),
    lang: signal<string>(""),
    fontSize: signal<string>('large'),
    baseUrl: "https://www.purplepeoplesreader.com/",
  }

  tts = {
    readUtterance: (text: string, points: number = 1, rate: number = .8) => this.speak.readUtterance(text, points,
      this.app.selectedLanguage() || assignLanguageCode(this.lessons.details()?.language || 'English'),
      this.app.selectedRate() || rate,
    ).then((points: number) => {
      console.log(this.user.userLinesRead(), points);
      this.tempLinesRead.update(old => old + points);
    }),
    audioPlaying: signal<boolean>(false),
    pause: () => this.speak.pauseVoice,
  }

  fetchQueryParams() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      this.tagParam = params.get('tag') || 'A1';
      this.langParam = params.get('lang') || 'English';
      this.resetParam = (params.get('reset') || 'false');
      if (this.resetParam == 'true') {
        this.lessons.details.set(null);
        this.router.navigate([], {
          queryParams: {
            resetParam: null
          },
          queryParamsHandling: 'merge'
        });

      }
      this.app.tag.set(this.tagParam);
      this.app.lang.set(this.langParam);
      console.log('fetching tag results', this.tagParam, this.langParam, this.user.userId());
      if ((this.tagParam == 'user') && this.user.userId()) return this.lessons.fetchUserCreatedLessons(this.user.userId()!);
      // if (!this.tagParam || !this.langParam) return console.log('no tag or lang');
      return this.lessons.fetchTagResults(this.app.tag(), this.app.lang());
    });
  }

  autoSave() {
    if (!this.user.userId()) return;
    if (this.tempLinesRead() == 0) return;
    this.user.updateLinesRead(this.tempLinesRead());
    this.tempLinesRead.set(0);
  }


  constructor() {
    this.fetchQueryParams();
  }

}