import { Injectable, effect, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;


  userId: string | undefined = this.db.authStore.model?.['id'];
  userName: string | undefined = this.db.authStore.model?.['username'];
  userEmail: string | undefined = this.db.authStore.model?.['email'];

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
    this.userName = await this.db.authStore.model?.['username'];
    //  this.userName.set(username);
    this.userId = await this.db.authStore.model?.['id'];
    this.userEmail = await this.db.authStore.model?.['email'];
    //  this.userId.set(userId);
    return;
  }





}