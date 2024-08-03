import { Component, input, OnChanges, OnInit, output } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-lesson-list-simple',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-list-simple.component.html',
  styleUrl: './lesson-list-simple.component.css'
})
export class LessonListSimpleComponent implements OnInit, OnChanges {
  lessons = input<LessonsResponse[]>([]);
  selectLesson = output<string>();
  removeLesson = output<string>();

  searchControl = new FormControl('');
  filteredLessons: LessonsResponse[] = [];


  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adding debounce
      map(term => this.filterLessons(term || ''))
    ).subscribe(filtered => this.filteredLessons = filtered);

    this.filteredLessons = this.lessons();
  }

  ngOnChanges() {
    this.searchControl.reset();
    this.filteredLessons = this.lessons();
  }

  filterLessons(term: string): LessonsResponse[] {
    term = term.toLowerCase();
    return this.lessons().filter(lesson =>
      lesson.title.toLowerCase().includes(term)
    );
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