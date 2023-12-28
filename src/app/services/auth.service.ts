import { Injectable, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { Playlist, UsersResponse } from '../shared/pocketbase-types';
import { RecordAuthResponse, RecordSubscription } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;
  subscription: any = null;


  userIdSignal = signal<string | undefined>(undefined);
  userNameSignal = signal<string | undefined>(undefined);
  userEmailSignal = signal<string | undefined>(undefined);
  userPlaylistSignal = signal<Playlist | undefined>(undefined);
  userLinesReadSignal = signal<number | undefined>(undefined);


  async loginWithEmail(username: string, password: string) {
    const authData = await this.db.collection('users').authWithPassword(username, password);
    console.log('logged in with email', authData);
    this.setUserSignals(authData);
  }

  async loginWithGoogle() {
    const authData = await this.db.collection('users').authWithOAuth2({ provider: 'google' });
    console.log('logged in with google', authData);
    this.setUserSignals(authData);
  }

  async checkUser() {
    try {
      const authData = await this.db.collection('users').authRefresh();
      this.setUserSignals(authData);
      return authData;
    } catch (error) {
      console.error('Error checking user:', error);
      return undefined;
    }
  }

  setUserSignals(authData: RecordAuthResponse<UsersResponse> | RecordSubscription<UsersResponse>) {
    try {
      if (!authData) return authData;
      const userName = authData.record.username;
      const userId = authData.record.id;
      const userEmail = authData.record.email;
      const userPlaylist = authData.record.playlist;
      const userLinesRead = authData.record.linesRead;
      this.userNameSignal.set(userName);
      this.userIdSignal.set(userId);
      this.userEmailSignal.set(userEmail);
      this.userPlaylistSignal.set(userPlaylist);
      this.userLinesReadSignal.set(userLinesRead);
      this.dbService.fetchUserCreatedLessons(authData.record.id);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }

  updateUsername(username: string) {
    if (!this.userIdSignal()) return;
    this.db.collection('users').update(this.userIdSignal()!, { username: username });
  }





}