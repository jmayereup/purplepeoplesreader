import { Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'app-lesson-list-simple',
    imports: [ReactiveFormsModule, SearchComponent],
    templateUrl: './lesson-list-simple.component.html',
    styleUrl: './lesson-list-simple.component.css'
})
export class LessonListSimpleComponent implements OnChanges {
  lessons = input<LessonsResponse[]>([]);
  filteredLessons = signal<LessonsResponse[]>([]);
  selectLesson = output<string>();
  removeLesson = output<string>();
  searchControl = new FormControl('');

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredLessons.set(this.lessons());
  }


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