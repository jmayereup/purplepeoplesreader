import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { NavPillsComponent } from "./nav-pills/nav-pills.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LessonListComponent, NavPillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ppr';

  db = inject(DbService);
  lang = this.db.lesson()?.language?.toLowerCase();

  constructor() {
  }
  
  ngOnInit() {
    // this.db.fetchLessons
  }

}
