import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, debounceTime, map } from 'rxjs';
import { LessonsResponse } from '../shared/pocketbase-types';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  lessons = input<LessonsResponse[]>([]);

  searchControl = new FormControl('');
  filteredLessons = output<LessonsResponse[]>();


  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adding debounce
      map(term => this.filterLessons(term || ''))
    ).subscribe(filtered => this.filteredLessons.emit(filtered));

    this.filteredLessons.emit(this.lessons() || []);
  }

  

  filterLessons(term: string): LessonsResponse[] {
    term = term.toLowerCase();
    return this.lessons()?.filter(lesson =>
      lesson.title.toLowerCase().includes(term)
    ) || [];
  }

}
