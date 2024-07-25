import { inject, Injectable, signal } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { addLineBreaksWithTranslatedDivs, assignLanguageCode, BASE } from '../shared/utils';
import { Router } from '@angular/router';
import { MetaService } from './meta.service';
import { LessonsService } from './lessons.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  http = inject(HttpClient);
  router = inject(Router);
  meta = inject(MetaService);
  lessonsService = inject(LessonsService);

  allLessons = signal<LessonsResponse[] | null>(null);
  lesson = signal<LessonsResponse | null>(null);
  lessons = signal<LessonsResponse[] | null>(null);
  baseUrl = BASE.baseUrl;
  baseImage = BASE.baseImage;
  allRoutes = signal<LessonsResponse[] | null>(null);
  lessonTitle = signal<string | null>(null);
  language = signal<string>("English");
  langCode = signal<string>("en_US");
  tag = signal<string>("A1");
  currentPath = signal<string>(this.router.url);
  isChrome = signal<boolean>(false);

  async fetchLessons(lang: string = 'English', tag: string = "A1") {
    try {
      console.log('fetching lessons');
      const partialPath = this.router.url.split('?')[0];
      this.currentPath.set(this.baseUrl + partialPath);
      this.langCode.set(assignLanguageCode(lang || 'English'));
      this.lessonTitle.set(lang + ' - ' + tag + ' - The Purple Peoples Reader');
      const lessons = await lastValueFrom(this.http.get<any>(`assets/all-records.json`));
      this.meta.setMetaTags({ title: this.lessonTitle() || 'List', image: this.baseImage, path: this.currentPath() })
      // const filteredLessons: LessonsResponse[] = lessons?.items.filter((lesson: LessonsResponse) =>
      //   lesson.language === lang && lesson.tags.toString().includes(tag) && lesson.shareable
      // ).sort((a: { created: string | number | Date; }, b: { created: string | number | Date; }) => new Date(b.created).getTime() - new Date(a.created).getTime());
      const filteredLessons: LessonsResponse[] = lessons?.items.filter((lesson: LessonsResponse) =>
        lesson.language === lang && lesson.tags.toString().includes(tag) && lesson.shareable
      ).sort((a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title));
      (filteredLessons.length > 1) ? this.lessons.set(filteredLessons) : this.lessons.set([]);
      return filteredLessons as LessonsResponse[];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      this.lessons.set(null);
      return null;
    }
  }

  async fetchLesson(id: string) {
    try {
      const lessons = await lastValueFrom(this.http.get<{ items: LessonsResponse[] }>('assets/all-records.json'));
      const lesson = lessons?.items.find(lesson => lesson.id === id) || null;
      if (lesson) {
        console.log('FETCHING LESSON');
        const formattedContentLines = addLineBreaksWithTranslatedDivs(lesson.content);
        lesson.contentLines = formattedContentLines;
        this.lesson.set(lesson);
        lesson.audioUrl = this.formatAudioUrl() || "";
        lesson.imageUrl = this.formatImageUrl() || "";
        this.lesson.set(lesson);
        this.langCode.set(assignLanguageCode(lesson?.language || 'English'));
        this.currentPath.set(this.baseUrl + this.router.url);
        this.lessonTitle.set(lesson?.title.toUpperCase() || 'PPR Lesson');
        this.meta.setMetaTags({ title: this.lessonTitle() || "PPR", image: lesson.imageUrl, path: this.currentPath() })
        return;
      } else return
    } catch (error) {
      console.error('Error fetching lesson:', error);
      this.lesson.set(null);
      return null;
    }
  }

  formatImageUrl() {
    if (!(this.lesson()?.imageUrl)) {
      return this.baseImage;
    }
    const imageFile = this.lesson()?.imageUrl!.substring(this.lesson()!.imageUrl!.lastIndexOf('/') + 1);
    return `${this.baseUrl}/apps/assets/${imageFile}`
  }

  formatAudioUrl() {
    if (this.lesson()?.audioUrl) {
      const audioFile = this.lesson()?.audioUrl!.substring(this.lesson()!.audioUrl!.lastIndexOf('/') + 1);
      return `${this.baseUrl}/apps/assets/${audioFile}`
    } else return
  }




}
