import { Component, input, output, signal } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-lesson-list-simple',
  standalone: true,
  imports: [ReactiveFormsModule, SearchComponent],
  templateUrl: './lesson-list-simple.component.html',
  styleUrl: './lesson-list-simple.component.css'
})
export class LessonListSimpleComponent {
  lessons = input<LessonsResponse[]>([]);
  filteredLessons = signal<LessonsResponse[]>([]);
  selectLesson = output<string>();
  removeLesson = output<string>();
  searchControl = new FormControl('');


  onSelectLesson(id: string) {
    this.selectLesson.emit(id);
  }

  onRemoveLesson(id: string) {
    this.removeLesson.emit(id);
  }

  trackById(index: number, item: LessonsResponse) {
    return item.id;
  }
}