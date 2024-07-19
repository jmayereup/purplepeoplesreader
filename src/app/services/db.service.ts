import { Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord } from '../shared/pocketbase-types';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = new PocketBase('https://www.purplepeoplesreader.com') as TypedPocketBase;

  allLessons = signal<LessonsResponse[] | null>(null);
  lesson = signal<LessonsRecord | null>(null);
  baseUrl = `https://www.purplepeoplesreader.com/`;
  allRoutes = signal<LessonsResponse[] | null>(null);

  constructor() {

  }

  async fetchLessons(lang: string = 'English', tag: string = "A1") {
    const lessons = await this.db.collection('lessons').getFullList({
      filter: `language='${lang}' && tags~'${tag}' && shareable=true`,
      sort: '-created',
    })
    this.allLessons.set(lessons);
    return lessons;
  }

  async fetchLesson(id: string) {
    const lesson = await this.db.collection('lessons').getOne(id)
    this.lesson.set(lesson);
    return lesson;
  }

  async fetchAllRoutes() {
    const routes = await this.db.collection('lessons').getFullList({
      fields: 'id',
    })
    this.allRoutes.set(routes);
    return routes;
  }

}
