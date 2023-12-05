import { Injectable, inject } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbService = inject(PocketbaseService);
  db = this.dbService.db;
  authStore = this.db.authStore;

  constructor() {
  }
  
  async loginWithEmail(username: string, password: string) {
    await this.db.collection('users').authWithPassword(username, password);
  } 

  getUsername() {
    return this.db.authStore.model?.['username'] || "";
  }
 


  

}