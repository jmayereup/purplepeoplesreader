import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PocketbaseService } from '../pocketbase.service';
import { Observable } from 'rxjs';
import { LessonsResponse } from '../shared/pocketbase-types';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {

  db = inject(PocketbaseService);
  itemDetails = this.db.itemDetails;
  resultList = this.db.fetchedResults as Observable<LessonsResponse[]>;
  type = 'A1';

  defaultImage = "../../assets/icons/book.svg"

}
