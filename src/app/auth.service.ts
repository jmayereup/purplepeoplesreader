import { Injectable, inject } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pbService = inject(PocketbaseService);
  pb = this.pbService.pb;
  authStore = this.pb.authStore;

  constructor() {
    
  }
  
  async loginWithEmail(username: string, password: string) {
    await this.pb.collection('users').authWithPassword(username, password);
  } 



  

}