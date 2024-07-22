import { Component, inject } from '@angular/core';
import { DbService } from '../services/db.service';
import { LessonsResponse } from '../shared/pocketbase-types';
import { stripMarkdown } from '../shared/utils';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NavPillsComponent } from "../nav-pills/nav-pills.component";
import { NgOptimizedImage } from '@angular/common';
import { MetaService } from '../services/meta.service';
import { shareReplay, Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, NavPillsComponent, NgOptimizedImage],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {

  db = inject(DbService);
  meta = inject(MetaService);
  route = inject(ActivatedRoute);
  allLessons = this.db.allLessons;
  baseUrl = this.db.baseUrl;

  lang = this.db.language;
  tag = this.db.tag;

  paramSub: Subscription;

  constructor() {
    this.paramSub = this.route.paramMap.pipe(
      shareReplay(1)
    )
      .subscribe(
        params => {
          const currentLang = params.get('lang');
          const currentTag = params.get('tag');
          if (currentLang != this.lang()) {
            this.tag.set('A1');
            this.lang.set(currentLang || 'English')
            this.db.fetchLessons(currentLang || 'English', currentTag || 'A1').then(() => {
              this.meta.setMetaTags({ title: this.lang()?.toUpperCase() + " " + this.tag() || "", image: this.baseUrl + "/apps/assets/purple-people-eat.jpg", path: this.db.currentPath() });
            });
            return
          }
          else if (currentTag != this.tag()) {
            this.lang.set(currentLang);
            this.tag.set(currentTag || 'A1');
            this.db.fetchLessons(currentLang, currentTag || 'A1').then(() => {
              this.meta.setMetaTags({ title: this.lang()?.toUpperCase() + " " + this.tag() || "", image: this.baseUrl + "/apps/assets/purple-people-eat.jpg", path: this.db.currentPath() });
            });
            return
          }
        }
      )

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

