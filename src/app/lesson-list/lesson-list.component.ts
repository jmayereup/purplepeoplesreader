import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";
import { StoreService } from '../services/store.service';
import { LessonsRecord, LessonsResponse } from '../shared/pocketbase-types';

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css',
    imports: [CommonModule, RouterLink, TagChooserComponent]
})
export class LessonListComponent {

  store = inject(StoreService);
  router = inject(Router);
  
  itemDetails = this.store.lessons.details;
  resultList = this.store.lessons.results;
  
  defaultImage = "../../assets/icons/book.svg"

deleteLesson(item: LessonsResponse) {
  let confirmed = confirm(`Are you sure you want to delete lesson: \n ${item.title}`)
  if (confirmed) { this.store.lessons.delete(item.id)}
    else return
  }

editLesson(item: LessonsResponse) {
  this.store.app.showEdit.set(true);
  this.router.navigate(['/lesson', item.id], {queryParamsHandling: 'preserve'});
  }

}


