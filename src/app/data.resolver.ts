// import { ResolveFn } from '@angular/router';
// import { StoreService } from './services/store.service';
// import { inject } from '@angular/core';
// import { Meta, Title } from '@angular/platform-browser';
// import { LessonsResponse } from './shared/pocketbase-types';
// // import { assignLanguageCode } from './shared/utils';

// export const dataResolver: ResolveFn<LessonsResponse | null> = (route, state) => {
//   const storeService = inject(StoreService);
//   const metaService = inject(Meta);
//   const titleService = inject(Title);
//   const lessonId = route.paramMap.get('id');
//   const baseUrl = storeService.app.baseUrl;
//   const itemDetails = storeService.lessons.details;

//   console.log('resolving data');
//   console.log('lessonId', lessonId);
//   if (!lessonId) return null;
//   storeService.lessons.fetchDetails(lessonId).then((data) => {
//     titleService.setTitle(data?.title || 'Lesson Details');
//     metaService.updateTag({ name: 'og:title', content: data?.title || "The Purple People's Reader 1" });
//     metaService.updateTag({ name: 'og:description', content: data?.content?.slice(0, 50).replace(/[#_*\[\]\(\)]/g, "") || "1 Learn languages through listenings and reading." });
//     metaService.updateTag({ name: 'og:image', content: getImage() });
//     itemDetails.set(data);
//     console.log('fetched details in resolver - ', data?.title);

//     function getImage(): string {
//       const coverImage = data?.imageUrl;
//       if (coverImage) return `${baseUrl}${coverImage}`;
//       else
//         return `${baseUrl}apps/assets/purple-people-eater.jpeg`;
//     }
//     return itemDetails();
//   });
//   return null;


// };

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StoreService } from './services/store.service';
import { Meta, Title } from '@angular/platform-browser';
import { LessonsResponse } from './shared/pocketbase-types';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<LessonsResponse | null> {
  constructor(
    private storeService: StoreService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonsResponse | null> | Promise<LessonsResponse | null> | LessonsResponse | null {
    const lessonId = route.paramMap.get('id');
    const baseUrl = this.storeService.app.baseUrl;

    if (!lessonId) {
      return of(null); 
    }

    return new Observable<LessonsResponse | null>(observer => {
      this.storeService.lessons.fetchDetails(lessonId).then((data) => {
       this.titleService.setTitle(data?.title || 'Lesson Details');
        this.metaService.updateTag({ name: 'og:title', content: data?.title || "The Purple People's Reader 1" });
        this.metaService.updateTag({ name: 'og:description', content: data?.content?.slice(0, 50).replace(/[#_*\[\]\(\)]/g, "") || "1 Learn languages through listenings and reading." });
        this.metaService.updateTag({ name: 'og:image', content: getImage() });
        // this.itemDetails.set(data);
        console.log('fetched details in resolver - ', data?.title);
    
         function getImage(): string {
          const imageUrl = data?.imageUrl || 'purple-people-eater.png';
          const coverImage = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          console.log("cover image", coverImage);
      
          return `${baseUrl}apps/assets/${coverImage}`;
        }

        observer.next(data); // Emit the data through Observable
        observer.complete();
      }).catch(err => {
        observer.error(err); // Emit an error through Observable
      });
    });
  }
}
