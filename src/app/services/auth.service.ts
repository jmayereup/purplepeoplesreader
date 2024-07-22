import { Injectable, Signal, signal } from '@angular/core';
import { TypedPocketBase } from '../shared/pocketbase-types';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pb = new PocketBase('https://purplepeoplesreader.com') as TypedPocketBase;
  private _isAuthenticated = signal(false);
  private _user = signal<any>(null);

  get isAuthenticated(): Signal<boolean> {
    return this._isAuthenticated;
  }

  get user(): Signal<any> {
    return this._user;
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      this._user.set(authData.record);
      this._isAuthenticated.set(true);
    } catch (error) {
      console.error('Login failed', error);
      this._isAuthenticated.set(false);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const authData = await this.pb.collection('users').authWithOAuth2({ provider: 'google' });
      this._user.set(authData.record);
      this._isAuthenticated.set(true);
    } catch (error) {
      console.error('Google login failed', error);
      this._isAuthenticated.set(false);
    }
  }

  logout(): void {
    this.pb.authStore.clear();
    this._user.set(null);
    this._isAuthenticated.set(false);
  }
}
