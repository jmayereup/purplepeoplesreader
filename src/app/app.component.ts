import { Component, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PocketbaseService } from './pocketbase.service';
import { Observable, from, map } from 'rxjs';
import { PostItem } from './shared/posts';
import { LoginComponent } from "./login/login.component";
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent]
})



export class AppComponent {
  title = 'pb-demo';
  db = inject(PocketbaseService);
  auth = inject(AuthService);
  authStore = this.auth.authStore;
  itemDetails: Observable<PostItem> | undefined;
  
  resultList = this.db.fetchResults();
  showDetails(itemId: string) {
    return this.itemDetails = this.db.fetchDetails(itemId);
  } 

  constructor() {

    
  }
    
}
