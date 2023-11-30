import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PocketbaseService } from './pocketbase.service';
import { LoginComponent } from "./login/login.component";
import { AuthService } from './auth.service';
import { LessonComponent } from "./lesson/lesson.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent, LessonComponent]
})



export class AppComponent {
  constructor() {}

  title = 'pb-demo';
  db = inject(PocketbaseService);
  auth = inject(AuthService);
  router = inject(Router);
  authStore = this.auth.authStore;
  itemDetails = this.db.itemDetails;
  
  resultList = this.db.fetchResults();

  showDetails(itemId: string) {
    return this.db.fetchDetails(itemId);
  } 

    
}
