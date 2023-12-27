import { OnInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { LessonComponent } from "./lesson/lesson.component";
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { StoreService } from './services/store.service';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, LoginComponent, LessonComponent, RouterLink, NavBarComponent]
})



export class AppComponent implements OnInit {

  title = 'Level Up:LBL';
  store = inject(StoreService);
  // route = inject(ActivatedRoute);


  username = this.store.user.userName;
  userId = this.store.user.userId;
  fSize = this.store.app.fontSize;
  constructor() {
  }
  ngOnInit(): void {
    this.store.user.checkUser();
    // setTimeout(() => this.fetchUserRecords(), 1000);
  }

  attemptFetch() {
    let status = false;
    let retries = 0;
    const maxRetries = 3;
    status = this.fetchUserRecords();
    while (!status && retries < 3) {
      this.fetchUserRecords();
      retries++;
    }
  }

  fetchUserRecords() {
    if (this.userId()) {
      this.store.lessons.fetchUserCreatedLessons(this.userId()!);
      return true;
    }
    return false;
  }

}

