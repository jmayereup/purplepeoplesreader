import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord, Collections } from '../shared/pocketbase-types'; // Adjust the import path accordingly
import { BASE } from '../shared/utils';
import { AuthService } from './auth.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  pb: TypedPocketBase = new PocketBase('https://purplepeoplesreader.com') as TypedPocketBase;
  authService = inject(AuthService);
  platformId = inject(PLATFORM_ID);
  http = inject(HttpClient);
  lessons = signal<LessonsResponse[]>([]);
  lesson = signal<LessonsResponse | null>(null);

  baseImage = BASE.baseImage;
  baseUrl = BASE.baseUrl;

  async fetchLessons(): Promise<LessonsResponse[] | null> {
    try {
      if(isPlatformServer(this.platformId)) {
        // const lessons: {items: LessonsResponse[]} = require('../../../lessons.json')
        const lessons = await lastValueFrom(this.http.get<{ items: LessonsResponse[] }>('assets/lessons.json'));
        this.lessons.set(lessons.items);
        console.log('server fetch');
        return lessons.items;
      } else if (isPlatformBrowser(this.platformId)) {
        console.log('fetching from pocketbase');
        const result = await this.pb.collection(Collections.Lessons).getFullList<LessonsResponse>({
          sort: '-created',
        });
        console.log('fetched');
        this.lessons.set(result);
        return result;
      } else return null
    } catch (error) {
      console.error('Error fetching lessons', error);
      return null;
    }  
  }
  

  async fetchLessonById(id: string): Promise<LessonsResponse | void> {
    try {
      const result = await this.pb.collection(Collections.Lessons).getOne<LessonsResponse>(id);
      this.lesson.set(result);
      result.imageUrl = this.formatImageUrl();
      result.audioUrl = this.formatAudioUrl();
      this.lesson.set(result);
      return result;
    } catch (error) {
      console.error('Error fetching lesson', error);
    }
  }

  async createLesson(lessonData: LessonsRecord): Promise<LessonsResponse | null> {
    try {
      console.log('create called', lessonData);
      const newLesson: LessonsResponse = await this.pb.collection(Collections.Lessons).create<LessonsResponse>(lessonData);
      this.lessons.set([newLesson, ...this.lessons()]);
      return newLesson;
    } catch (error) {
      console.error('Error creating lesson', error);
      return null;
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

  async deleteLesson(id: string): Promise<string | void> {
    try {
      const success = await this.pb.collection(Collections.Lessons).delete(id);
      if (success) {
        this.lessons.set(this.lessons().filter(lesson => lesson.id !== id));
        return id;
      }
      return;
    } catch (error) {
      console.error('Error deleting lesson', error);
    }
  }

  formatImageUrl() {
    if (!(this.lesson()?.imageUrl)) {
      return ''
    }
    const imageFile = this.lesson()?.imageUrl!.substring(this.lesson()!.imageUrl!.lastIndexOf('/') + 1);
    return `${this.baseUrl}/apps/assets/${imageFile}`
  }

  formatAudioUrl() {
    if (this.lesson()?.audioUrl) {
      const audioFile = this.lesson()?.audioUrl!.substring(this.lesson()!.audioUrl!.lastIndexOf('/') + 1);
      return `${this.baseUrl}/apps/assets/${audioFile}`
    } else return "";
  }

}
