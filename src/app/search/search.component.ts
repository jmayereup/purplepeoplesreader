import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { LessonsResponse } from '../shared/pocketbase-types';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-search',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  lessons = input<LessonsResponse[]>([]);

  searchControl = new FormControl('');
  filteredLessons = output<LessonsResponse[]>();


  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Adding debounce
      map(term => this.filterLessons(term || ''))
    ).subscribe(filtered => this.filteredLessons.emit(filtered));

  }

  

  filterLessons(term: string): LessonsResponse[] {
    term = term.toLowerCase();
    return this.lessons()?.filter(lesson =>
      lesson.title.toLowerCase().includes(term)
    ) || [];
  }

}
