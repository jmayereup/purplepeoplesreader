import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { LessonListComponent } from "./lesson-list/lesson-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LessonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ppr';

  db = inject(DbService);

  constructor() {
  }
  
  ngOnInit() {
    this.db.fetchAllLessons();
  }

}
