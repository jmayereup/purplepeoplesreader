import { OnInit, Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationStart, NavigationEnd, RouterOutlet } from '@angular/router';
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



export class AppComponent implements OnInit, AfterViewInit {

  title = "Purple People's Reader";
  store = inject(StoreService);
  router = inject(Router);

  itemDetails = this.store.lessons.details;
  username = this.store.user.userName;
  userId = this.store.user.userId;
  fSize = this.store.app.fontSize;
  loading = true;

  constructor() { }


  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('nav start');
        this.loading = true;
        this.store.lessons.details.set(null);
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.store.user.checkUser();
    if (typeof window === 'undefined') return;
    window.addEventListener('beforeunload', () => this.store.autoSave());
    window.setInterval(() => this.store.autoSave(), 10000);
  }

}

