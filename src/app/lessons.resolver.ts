import { ResolveFn } from '@angular/router';
import { DbService } from './services/db.service';
import { inject } from '@angular/core';

export const lessonsResolver: ResolveFn<boolean> = async (route, state) => {
  const db = inject(DbService);
  
  const lang = route.paramMap.get('lang') || 'English';
  const tag = route.paramMap.get('tag') || 'A1';
  db.language.set(lang);
  db.tag.set(tag);
  await db.fetchLessons(lang, tag);
  db.waiting.set(false);

  return true;
};
