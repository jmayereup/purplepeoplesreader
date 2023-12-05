import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PocketbaseService } from './pocketbase.service';
import { LoginComponent } from "./login/login.component";
import { AuthService } from './auth.service';
import { LessonComponent } from "./lesson/lesson.component";
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, LoginComponent, LessonComponent, RouterLink, NavBarComponent]
})



export class AppComponent {
 
  title = 'Level Up:LBL';
  db = inject(PocketbaseService);
  auth = inject(AuthService);
  username = "";

  constructor() {    

  }

  ngOnInit() {
    this.getUsername();
  }

  async getUsername() {
    this.username = await this.auth.getUsername();
  }

  // router = inject(Router);
  // itemDetails = this.db.itemDetails;
  // itemID = signal("");
  // resultList = this.db.fetchResults();




  // showDetails(itemId: string) {
  //   return this.db.fetchDetails(itemId);
  // } 

    
}
