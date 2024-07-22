import { Injectable, Signal, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord, Collections, LessonsLanguageOptions, LessonsTagsOptions } from '../shared/pocketbase-types'; // Adjust the import path accordingly

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private pb: TypedPocketBase = new PocketBase('https://purplepeoplesreader.com') as TypedPocketBase;
  lessons = signal<LessonsResponse[]>([]);
  lesson = signal<LessonsResponse | null>(null);

  // get lessons(): Signal<LessonsResponse[]> {
  //   return this._lessons;
  // }

  // get lesson(): Signal<LessonsResponse | null> {
  //   return this._lesson;
  // }


  async fetchAllLessons(lang?: LessonsLanguageOptions, tag?: LessonsTagsOptions): Promise<void> {
    try {
      const filters: string[] = [];
  
      if (lang) {
        filters.push(`language = '${lang}'`);
      }
  
      if (tag) {
        filters.push(`tags ?= '${tag}'`);
      }
  
      const filterQuery = filters.length ? filters.join(' && ') : '';
  
      const result = await this.pb.collection(Collections.Lessons).getFullList<LessonsResponse>({
        sort: '-created',
        filter: filterQuery,
      });
      
      this.lessons.set(result);
    } catch (error) {
      console.error('Error fetching lessons', error);
    }
  }
  

  async fetchLessonById(id: string): Promise<void> {
    try {
      const result = await this.pb.collection(Collections.Lessons).getOne<LessonsResponse>(id);
      this.lesson.set(result);
    } catch (error) {
      console.error('Error fetching lesson', error);
    }
  }

  async createLesson(lessonData: LessonsRecord): Promise<LessonsResponse | void> {
    try {
      const newLesson = await this.pb.collection(Collections.Lessons).create<LessonsResponse>(lessonData);
      this.lessons.set([...this.lessons(), newLesson]);
      return newLesson;
    } catch (error) {
      console.error('Error creating lesson', error);
    }
  }

  async updateLesson(id: string, lessonData: Partial<LessonsRecord>): Promise<LessonsResponse | void> {
    try {
      const updatedLesson = await this.pb.collection(Collections.Lessons).update<LessonsResponse>(id, lessonData);
      this.lessons.set(this.lessons().map(lesson => lesson.id === id ? updatedLesson : lesson));
      return updatedLesson;
    } catch (error) {
      console.error('Error updating lesson', error);
    }
  }

  async deleteLesson(id: string): Promise<void> {
    try {
      await this.pb.collection(Collections.Lessons).delete(id);
      this.lessons.set(this.lessons().filter(lesson => lesson.id !== id));
    } catch (error) {
      console.error('Error deleting lesson', error);
    }
  }
}
