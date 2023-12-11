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

  constructor() {

  }
  
  async loginWithEmail(username: string, password: string) {
    await this.db.collection('users').authWithPassword(username, password);
  } 

  async loginWithGoogle() {
    const authData = await this.db.collection('users').authWithOAuth2({ provider: 'google' });
  }

  // async getUser() {
  //    const username =  await this.db.authStore.model?.['username'] || "";
  //    this.userName.set(username);
  //    const userId = await this.db.authStore.model?.['id'];
  //    this.userId.set(userId);
  //    return userId;
  // }
 


  

}