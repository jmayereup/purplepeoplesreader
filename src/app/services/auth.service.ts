import { Injectable, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { UsersResponse } from '../shared/pocketbase-types';
import { RecordAuthResponse, RecordSubscription } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;


  userIdSignal = signal<string | undefined>(undefined);
  userNameSignal = signal<string | undefined>(undefined);
  userEmailSignal = signal<string | undefined>(undefined);
  userPlaylistSignal = signal<[{id: string, title: string, points?: string}] | undefined>(undefined);

  constructor() {
    this.checkUser();
  }

  async loginWithEmail(username: string, password: string) {
    const authData = await this.db.collection('users').authWithPassword(username, password);
    this.getUser(authData);
  }

  async loginWithGoogle() {
    const authData = await this.db.collection('users').authWithOAuth2({ provider: 'google' });
    this.getUser(authData);
  }

  async checkUser() {
    const authData = await this.db.collection('users').authRefresh();
    this.getUser(authData);
    console.log('authData', authData);
  }

  async getUser(authData: RecordAuthResponse<UsersResponse>) {
    console.log('authData', authData);
    const userName = authData.record.name;
    const userId = authData.record.id;
    const userEmail = authData.record.email;
    const userPlaylist = authData.record.playlist;
    console.log('username', userName);
    console.log('playlist', userPlaylist);
    this.userNameSignal.set(userName);
    this.userIdSignal.set(userId);
    this.userEmailSignal.set(userEmail);
    this.userPlaylistSignal.set(userPlaylist);
    return;
  }





}