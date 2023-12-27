import { Injectable, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { Playlist, UsersResponse } from '../shared/pocketbase-types';
import { RecordAuthResponse, RecordSubscription } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;
  subscription: any = null;


  userIdSignal = signal<string | undefined>(undefined);
  userNameSignal = signal<string | undefined>(undefined);
  userEmailSignal = signal<string | undefined>(undefined);
  userPlaylistSignal = signal<Playlist | undefined>(undefined);
  userLinesReadSignal = signal<number | undefined>(undefined);

  ngOnInit() {
    this.checkUser().then((d) => {
      console.log('user checked', d);
      const userId = d?.record.id;
      if (!userId) return;
      this.subscription = this.db.collection('users').subscribe(userId, (authData) => {
        console.log('subscribed to user', authData);
        this.setUserSignals(authData);
      });
    });
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  async loginWithEmail(username: string, password: string) {
    const authData = await this.db.collection('users').authWithPassword(username, password);
    this.setUserSignals(authData);
  }

  async loginWithGoogle() {
    const authData = await this.db.collection('users').authWithOAuth2({ provider: 'google' });
    this.setUserSignals(authData);
  }

  async checkUser() {
    try {
      const authData = await this.db.collection('users').authRefresh();
      this.setUserSignals(authData);
      // if (!this.subscription && this.userIdSignal()) {
      //   this.subscription = this.db.collection('users').subscribe(this.userIdSignal()!, (authData) => {
      //     console.log('subscribed to user', authData);
      //     this.setUserSignals(authData);
      //   });
      // }

      return authData;
    } catch (error) {
      console.error('Error checking user:', error);
      return undefined;
    }
  }

  setUserSignals(authData: RecordAuthResponse<UsersResponse> | RecordSubscription<UsersResponse>) {
    try {
      if (!authData) return authData;
      const userName = authData.record.name;
      const userId = authData.record.id;
      const userEmail = authData.record.email;
      const userPlaylist = authData.record.playlist;
      const userLinesRead = authData.record.linesRead;
      this.userNameSignal.set(userName);
      this.userIdSignal.set(userId);
      this.userEmailSignal.set(userEmail);
      this.userPlaylistSignal.set(userPlaylist);
      this.userLinesReadSignal.set(userLinesRead);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }





}