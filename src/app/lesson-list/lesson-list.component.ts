import { Component, Input, inject, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";
import { StoreService } from '../services/store.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { LangChooserComponent } from "../lang-chooser/lang-chooser.component";
import { LessonLevelChooserComponent } from "../lesson-level-chooser/lesson-level-chooser.component";

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css',
    imports: [CommonModule, RouterLink, TagChooserComponent, LangChooserComponent, LessonLevelChooserComponent]
})
export class LessonListComponent implements OnChanges, OnInit {

  store = inject(StoreService);
  router = inject(Router);

  @Input() type = "";
  
  itemDetails = this.store.lessons.details;
  resultList = this.store.lessons.results;
  loading = this.store.lessons.loading;
  
  defaultImage = "../../assets/icons/book.svg";

  constructor() {  }

  ngOnInit() {
    if (this.type == "user") this.resultList = this.store.lessons.userResults;
    this.loadLessons();
  }
  
  ngOnChanges() {
    this.loadLessons();
  }

loadLessons() {
    if (this.type == "user") this.store.lessons.fetchUserCreatedLessons(this.store.user.userId()!);
    else this.store.lessons.fetchTagResults();
}


async deleteLesson(item: LessonsResponse) {
  let confirmed = confirm(`Are you sure you want to delete lesson: \n ${item.title}`)
  if (confirmed) { 
    try {
      this.loading.set(true);
      await this.store.lessons.delete(item.id);
      await this.loadLessons();
      this.loading.set(false);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      this.loading.set(false);
    }
  } else {
    return;
  }
}

}


