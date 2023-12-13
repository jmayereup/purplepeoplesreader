import { Component, Input, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";
import { StoreService } from '../services/store.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { LangChooserComponent } from "../lang-chooser/lang-chooser.component";

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css',
    imports: [CommonModule, RouterLink, TagChooserComponent, LangChooserComponent]
})
export class LessonListComponent implements OnChanges {

  store = inject(StoreService);
  router = inject(Router);

  @Input() type = "";
  
  itemDetails = this.store.lessons.details;
  resultList = this.store.lessons.results;
  
  defaultImage = "../../assets/icons/book.svg";

  constructor() {  }
  
  ngOnChanges() {
        if (this.type == "user") this.resultList = this.store.lessons.userResults;
  }

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


