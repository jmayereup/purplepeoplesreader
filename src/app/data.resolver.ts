import { ResolveFn } from '@angular/router';
import { StoreService } from './services/store.service';
import { inject } from '@angular/core';


export const dataResolver: ResolveFn<boolean> = (route, state) => {
  console.log('resolving data');
  const storeService = inject(StoreService);
  const lessonId = route.paramMap.get('id');
  console.log('lessonId', lessonId);
  if (!lessonId) return false;
  storeService.lessons.fetchDetails(lessonId).then(() => {
    console.log('fetched details in resolver');
    return true;
  });
  return false;
};
