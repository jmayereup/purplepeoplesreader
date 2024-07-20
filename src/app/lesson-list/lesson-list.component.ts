import { Component, inject, input, OnChanges } from '@angular/core';
import { DbService } from '../services/db.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { stripMarkdown } from '../shared/utils';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class LessonListComponent implements OnChanges {

  db = inject(DbService);
  route = inject(ActivatedRoute);
  allLessons = this.db.allLessons;
  baseUrl = this.db.baseUrl;

  lang = input<string>()
  tag = input<string>()
  
  constructor() {

  }

  ngOnChanges() {
    this.db.fetchLessons(this.lang(), this.tag());
    console.log('fetching', this.lang(), this.tag());
    // this.route.queryParamMap.subscribe(params => {
    //   this.language = params.get('lang') || 'English';
    //   this.tag = params.get('tag') || 'A1';
    //   this.db.fetchLessons(this.language, this.tag);
    // })

  }

  getImageThumbnail(item: LessonsResponse) {
    if (item.imageUrl) {
      const baseName = item.imageUrl.substring(item.imageUrl.lastIndexOf('/') + 1, item.imageUrl.lastIndexOf('.'));
      const thumbnailUrl = `apps/assets/thumbnails/${baseName}_thumbnail.png`;
      return this.baseUrl + thumbnailUrl;
    }
    return this.baseUrl + "apps/assets/thumbnails/purple-people-eater_thumbnail.png";
  }

  removeMarkdown(content: string) {
    return stripMarkdown(content);
  }

}

