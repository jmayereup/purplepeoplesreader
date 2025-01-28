import { Component, inject, input, OnChanges } from '@angular/core';
import { DbService } from '../services/db.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { stripMarkdown } from '../shared/utils';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NavPillsComponent } from "../nav-pills/nav-pills.component";
import { NgOptimizedImage } from '@angular/common';
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'app-lesson-list',
    imports: [RouterLink, SpinnerComponent, NavPillsComponent, NgOptimizedImage, SearchComponent],
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css'
})
export class LessonListComponent implements OnChanges {

  db = inject(DbService);
  lang = input<string>('English');
  tag = input<string>('A1');
  lessons = this.db.filteredLessons;
  allLessons = this.db.lessons;

  baseUrl = this.db.baseUrl;

  langNav = this.db.language;
  tagNav = this.db.tag;

  
  constructor() {}
  
  ngOnChanges(): void {
    this.db.language.set(this.lang());
    this.db.tag.set(this.tag());
    this.db.fetchLessons(this.lang(), this.tag());
    
  }


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

  filterLessons(filtered: LessonsResponse[]) {
    this.lessons.set(filtered);
    this.db.language.set('');
    this.db.tag.set('');
    this.db.router.navigate(['list','', 'search']);

  }

}

