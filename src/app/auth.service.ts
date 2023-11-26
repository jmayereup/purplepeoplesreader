import { Injectable, inject, signal } from '@angular/core';

import  PocketBase, { AdminAuthResponse, RecordAuthResponse }  from 'pocketbase';
import { PostItem, PostResponseData, Pagination } from './shared/posts';
import { Observable, from, map } from 'rxjs';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // pb = new PocketBase('https://blog.teacherjake.com');
  pbService = inject(PocketbaseService);
  pb = this.pbService.pb;
  authStore = this.pb.authStore;

  constructor() {
    
  }
  
  async loginWithEmail(username: string, password: string) {
    await this.pb.collection('users').authWithPassword(username, password);
  } 



  

}