import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { NavPillsComponent } from "./nav-pills/nav-pills.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { AdComponent } from "./ad-component/ad-component.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LessonListComponent, NavPillsComponent, SpinnerComponent, AdComponent, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef;

  title = 'ppr';
  db = inject(DbService);
  lang = this.db.language;
  tag = this.db.tag;
  constructor() {
  }



}
