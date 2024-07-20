import { inject, Injectable, signal } from '@angular/core';
import { LessonsResponse, LessonsRecord } from '../shared/pocketbase-types';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  // db = new PocketBase('https://www.purplepeoplesreader.com') as TypedPocketBase;
  
  allLessons = signal<LessonsResponse[] | null>(null);
  lesson = signal<LessonsRecord | null>(null);
  baseUrl = `https://www.purplepeoplesreader.com/`;
  allRoutes = signal<LessonsResponse[] | null>(null);
  imageUrl = signal<string>(this.baseUrl + 'apps/assets/purple-people-eater.jpg')

  http = inject(HttpClient);

  constructor() {

  }

  async fetchLessons(lang: string = 'English', tag: string = "A1") {
    try {
      const lessons = await lastValueFrom(this.http.get<any>('assets/all-records.json'));
      const filteredLessons = lessons?.items.filter((lesson: LessonsResponse) =>
        lesson.language === lang && lesson.tags.toString().includes(tag) && lesson.shareable
      ).sort((a: { created: string | number | Date; }, b: { created: string | number | Date; }) => new Date(b.created).getTime() - new Date(a.created).getTime());

      this.allLessons.set(filteredLessons || null);
      return filteredLessons as LessonsResponse[];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      this.allLessons.set(null);
      return null;
    }
  }

  async fetchLesson(id: string) {
    try {
      const lessons = await lastValueFrom(this.http.get<{ items: LessonsResponse[] }>('assets/all-records.json'));
      const lesson = lessons?.items.find(lesson => lesson.id === id) || null;
      this.lesson.set(lesson);
      return lesson;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      this.lesson.set(null);
      return null;
    }
  }

  formatImageUrl() {
    if (!(this.lesson()?.imageUrl)) {
      this.imageUrl.set(`${this.baseUrl}apps/assets/purple-people-eater.jpg`);
      return
    }
    const imageFile = this.lesson()?.imageUrl!.substring(this.lesson()!.imageUrl!.lastIndexOf('/') + 1);
    this.imageUrl.set(`${this.baseUrl}apps/assets/${imageFile}`);
    return
  }


  // async fetchLessons(lang: string = 'English', tag: string = "A1") {
  //   const lessons = await this.db.collection('lessons').getFullList({
  //     filter: `language='${lang}' && tags~'${tag}' && shareable=true`,
  //     sort: '-created',
  //   })
  //   this.allLessons.set(lessons);
  //   return lessons;
  // }

  // async fetchLesson(id: string) {
  //   const lesson = await this.db.collection('lessons').getOne(id)
  //   this.lesson.set(lesson);
  //   return lesson;
  // }

  async fetchAllRoutes() {
    // const routes = await this.db.collection('lessons').getFullList({
    //   fields: 'id',
    // })
    // this.allRoutes.set(routes);
    // return routes;
  }

}
