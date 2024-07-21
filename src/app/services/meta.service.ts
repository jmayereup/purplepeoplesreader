import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  meta = inject(Meta);
  db = inject(DbService);

  imageUrl = this.db.imageUrl;
  lessonTitle = this.db.lessonTitle;
  langCode = this.db.langCode;
  currentPath = this.db.currentPath;

  constructor() { }

  setMetaTags() {
    this.meta.updateTag({ property: 'og:image', content: this.imageUrl() });
    this.meta.updateTag({ property: 'og:title', content: this.lessonTitle() || 'PPR' });
    this.meta.updateTag({ property: 'og:url', content: this.currentPath() || this.db.baseUrl });
  }
}
