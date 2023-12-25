import { Injectable, effect, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;


  userIdSignal = signal<string>("undefined");
  userNameSignal = signal<string>("undefined");
  userEmailSignal = signal<string>("undefined");

  constructor() {

    


  }

  async loginWithEmail(username: string, password: string) {
    const authData = await this.db.collection('users').authWithPassword(username, password);
    if (authData.record.id) {
    this.db.collection('users').subscribe(authData.record.id, function (e){
      console.log(e.record);
    })
    }
  }

  async loginWithGoogle() {
    const authData = await this.db.collection('users').authWithOAuth2({ provider: 'google' });
    if (authData.record.id) {
      this.db.collection('users').subscribe(authData.record.id, function (e){
        console.log(e.record);
      })
      }
  }

  async getUser() {
    const userName = await this.db.authStore.model?.['username'];
    const userId = await this.db.authStore.model?.['id'];
    const userEmail = await this.db.authStore.model?.['email'];
    this.userNameSignal.set(userName);
    this.userIdSignal.set(userId);
    this.userEmailSignal.set(userEmail);
    return;
  }





}