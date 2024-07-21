import { Component, inject, input, OnChanges } from '@angular/core';
import { DbService } from '../services/db.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { stripMarkdown } from '../shared/utils';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NavPillsComponent } from "../nav-pills/nav-pills.component";
import { NgOptimizedImage } from '@angular/common';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, NavPillsComponent, NgOptimizedImage],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent implements OnChanges {

  db = inject(DbService);
  meta = inject(MetaService);
  route = inject(ActivatedRoute);
  allLessons = this.db.allLessons;
  baseUrl = this.db.baseUrl;

  lang = input<string>('English');
  tag = input<string>('A1');

  constructor() {

  }

  ngOnInit() {
    this.db.language.set(this.lang());
    (this.tag()) ? this.db.tag.set(this.tag()): this.db.tag.set('A1');
  }

  ngOnChanges() {
    this.db.fetchLessons(this.lang(), this.tag()).then(() => 
      this.meta.setMetaTags({title: this.lang()?.toUpperCase() + " " + this.tag() || "", image: this.baseUrl + "/apps/assets/purple-people-eat.jpg", path: this.db.currentPath()},));
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

}

