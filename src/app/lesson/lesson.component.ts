import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonDetailsComponent } from "../lesson-full-text/lesson-full-text.component";
import { PocketbaseService } from '../pocketbase.service';
import { RouterLink } from '@angular/router';
import { FormLessonComponent } from '../form-lesson/form-lesson.component';

@Component({
  selector: 'app-lesson',
  standalone: true,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  imports: [CommonModule, LessonDetailsComponent, FormLessonComponent, RouterLink]
})
export class LessonComponent implements OnChanges {

  @Input() id = "";
  db = inject(PocketbaseService);
  itemDetails = this.db.itemDetails;

  showEdit = false;

  constructor() {
  }
  ngOnChanges(): void {
    console.log('on changes called in lessons component');
    this.db.fetchDetails(this.id);
    console.log('fetchDetails called with:', this.id);
  }



}
