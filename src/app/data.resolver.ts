import { ResolveFn } from '@angular/router';
import { StoreService } from './services/store.service';
import { inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


export const dataResolver: ResolveFn<boolean> = (route, state) => {
  const storeService = inject(StoreService);
  const metaService = inject(Meta);
  const titleService = inject(Title);
  const lessonId = route.paramMap.get('id');
  const baseUrl = storeService.app.baseUrl;

  console.log('resolving data');
  console.log('lessonId', lessonId);
  if (!lessonId) return false;
  storeService.lessons.fetchDetails(lessonId).then((data) => {
    titleService.setTitle(data?.title || 'Lesson Details');
    metaService.updateTag({ name: 'og:title', content: data?.title || "The Purple People's Reader" });
    metaService.updateTag({ name: 'og:description', content: data?.content?.slice(0, 50).replace(/[#_*\[\]\(\)]/g, "") || "Learn languages through listenings and reading." });
    metaService.updateTag({ name: 'og:image', content: getImage() });
    console.log('fetched details in resolver');
    
    function getImage(): string {
      const coverImage = data?.imageUrl;
      if (coverImage) return `${baseUrl}${coverImage}`;
      else
        return `${baseUrl}apps/assets/purple-people-eater.jpeg`;
    }
    return true;
  });
  return false;


};

