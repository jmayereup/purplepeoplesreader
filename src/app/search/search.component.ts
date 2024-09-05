import { Component, inject, input, OnInit } from '@angular/core';
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
  db = inject(DbService);
  lessons = input<LessonsResponse[]>([]);

  searchControl = new FormControl('');
  filteredLessons = this.db.filteredLessons;


  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adding debounce
      map(term => this.filterLessons(term || ''))
    ).subscribe(filtered => this.filteredLessons.set(filtered));

    this.filteredLessons.set(this.lessons());
  }

  

  filterLessons(term: string): LessonsResponse[] {
    term = term.toLowerCase();
    return this.lessons().filter(lesson =>
      lesson.title.toLowerCase().includes(term)
    );
  }

}
