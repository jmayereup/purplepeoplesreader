import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsResponse } from '../shared/pocketbase-types';
import { LessonDetailsComponent } from "../lesson-details/lesson-details.component";
import { PocketbaseService } from '../pocketbase.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css',
  imports: [CommonModule, LessonDetailsComponent]
})
export class LessonComponent implements OnChanges {

  @Input() id = "";
  db = inject(PocketbaseService);
  itemDetails = this.db.itemDetails;

  constructor() {
    // this.db.fetchDetails(this.id);
    // console.log("lesson component constructor");
  }
  ngOnChanges(): void {
    console.log('on changes called in lessons component');
    this.db.fetchDetails(this.id);
    console.log('fetchDetails called');
  }

  // @Input() lesson: LessonsResponse | undefined = undefined;



}
