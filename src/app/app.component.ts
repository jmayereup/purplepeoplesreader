import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { NavPillsComponent } from "./nav-pills/nav-pills.component";
import { isPlatformBrowser } from '@angular/common';
import { SpinnerComponent } from "./spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LessonListComponent, NavPillsComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ppr';

  db = inject(DbService);
  platformId = inject(PLATFORM_ID);
  lang = this.db.language;
  tag = this.db.tag;
  constructor() {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator?.userAgent?.toLowerCase();
      if (userAgent?.includes('chrome')) {
        this.db.isChrome.set(true);
      }
    }
  }

}
