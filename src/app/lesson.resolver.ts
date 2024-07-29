import { ResolveFn } from '@angular/router';
import { DbService } from './services/db.service';
import { inject } from '@angular/core';
import { MetaService } from './services/meta.service';

export const lessonResolver: ResolveFn<boolean> = async (route, state) => {

  const db = inject(DbService);
  const meta = inject(MetaService);

  const lessonId = route.paramMap.get('id');
  if (lessonId) {
    db.lesson.set(null);
    await db.fetchLessons();
    db.filteredLessons.set(db.lessons());
    await db.fetchLesson(lessonId);
    db.waiting.set(false);
  }

  return true;
};