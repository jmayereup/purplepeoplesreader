import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  meta = inject(Meta);


  constructor() { }

  setMetaTags(data: {title: string, image: string, path: string}) {
    this.meta.updateTag({ property: 'og:title', content: data.title.toUpperCase() || 'PPR' });
    this.meta.updateTag({ property: 'og:image', content: data.image});
    this.meta.updateTag({ property: 'og:url', content: data.path || ''});
  }
}
