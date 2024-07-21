import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DbService } from './db.service';

export const dataResolverResolver: ResolveFn<boolean> = (route, state) => {

  const db  = inject(DbService);

  const lessonId = route.paramMap.get('id');

  return db.fetchLesson(lessonId || "").then(
    () => {
      return true
    }).catch(error => {
      console.error('Fetch failed:', error);
      return false;
    });
};
