import { Component, Input, inject, OnChanges, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";
import { StoreService } from '../services/store.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { LangChooserComponent } from "../lang-chooser/lang-chooser.component";
import { LessonLevelChooserComponent } from "../lesson-level-chooser/lesson-level-chooser.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { stripMarkdown } from '../shared/utils';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
  imports: [CommonModule, RouterLink, TagChooserComponent, LangChooserComponent, LessonLevelChooserComponent, SpinnerComponent]
})
export class LessonListComponent implements OnChanges, OnInit {

  store = inject(StoreService);
  router = inject(Router);
  userIsAuthenticated = this.store.user.userId;

  @Input() type = "";

  itemDetails = this.store.lessons.details;
  resultList = this.store.lessons.results;
  loading = this.store.lessons.loading;
  baseUrl = this.store.app.baseUrl;

  constructor() {
    // effect(() => {
    //   this.store.lessons.results();
    //   this.loadLessons();
    // })
  }

  ngOnInit() {
    this.resultList.set(null);
    this.loadLessons();
  }

  ngOnChanges() {
    this.resultList.set(null)
    this.loadLessons();
    console.log("ngOnChanges");
  }

  loadLessons() {
    console.log("Loading lessons");
    if (this.type == "user") {
      this.store.lessons.fetchUserCreatedLessons(this.store.user.userId()!).then(() => {
        this.resultList = this.store.lessons.userResults;
      });
      }
    else {
      this.store.lessons.fetchTagResults();
      this.resultList = this.store.lessons.results;
    }
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

  getImageThumbnail(item: LessonsResponse) {
    if (item.imageUrl) {
      const baseName = item.imageUrl.substring(item.imageUrl.lastIndexOf('/') + 1, item.imageUrl.lastIndexOf('.'));
      console.log(baseName);
      const thumbnailUrl = `apps/assets/thumbnails/${baseName}_thumbnail.png`;
      return this.baseUrl + thumbnailUrl;
    }
    return this.baseUrl + "apps/assets/thumbnails/purple-people-eater_thumbnail.png";
  }
  


removeMarkdown(content: string) {
  return stripMarkdown(content);
}

}

