import { ResolveFn } from '@angular/router';
import { DbService } from './db.service';
import { inject } from '@angular/core';

export const listResolverResolver: ResolveFn<boolean> = (route, state) => {

  const db = inject(DbService);
  
  const lang = route.paramMap.get('lang') || "English";
  const tag = route.paramMap.get('tag') || "A1";

  return db.fetchLessons(lang, tag).then(() => {return true});
};
