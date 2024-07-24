import { inject, Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord, Collections } from '../shared/pocketbase-types'; // Adjust the import path accordingly
import { BASE } from '../shared/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  pb: TypedPocketBase = new PocketBase('https://purplepeoplesreader.com') as TypedPocketBase;
  authService = inject(AuthService);
  lessons = signal<LessonsResponse[]>([]);
  lesson = signal<LessonsResponse | null>(null);

  baseImage = BASE.baseImage;
  baseUrl = BASE.baseUrl;

  async fetchLessons(): Promise<LessonsResponse[] | null> {
    try {
      const result = await this.pb.collection(Collections.Lessons).getFullList<LessonsResponse>({
        sort: '-created',
      });
      this.lessons.set(result);
      return result;
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

  async createLesson(lessonData: LessonsRecord): Promise<LessonsResponse | void> {
    try {
      console.log('create called', lessonData);
      const newLesson = await this.pb.collection(Collections.Lessons).create<LessonsResponse>(lessonData);
      this.lessons.set([newLesson, ...this.lessons()]);
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
