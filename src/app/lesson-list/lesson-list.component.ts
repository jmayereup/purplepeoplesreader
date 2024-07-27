import { Component, inject } from '@angular/core';
import { DbService } from '../services/db.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { stripMarkdown } from '../shared/utils';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NavPillsComponent } from "../nav-pills/nav-pills.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, NavPillsComponent, NgOptimizedImage],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {

  db = inject(DbService);
  lessons = this.db.filteredLessons;
  baseUrl = this.db.baseUrl;

  langNav = this.db.language;
  tagNav = this.db.tag;
  waiting = this.db.waiting;


  constructor() {}


  getImageThumbnail(item: LessonsResponse) {
    if (item.imageUrl) {
      const baseName = item.imageUrl.substring(item.imageUrl.lastIndexOf('/') + 1, item.imageUrl.lastIndexOf('.'));
      const thumbnailUrl = `/apps/assets/thumbnails/${baseName}_thumbnail.png`;
      return this.baseUrl + thumbnailUrl;
    }
    return this.baseUrl + "/apps/assets/thumbnails/purple-people-eater_thumbnail.png";
  }

  removeMarkdown(content: string) {
    return stripMarkdown(content);
  }

}

