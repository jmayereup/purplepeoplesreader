import { inject, Injectable, signal } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { HttpClient } from '@angular/common/http';
import { assignLanguageCode, BASE } from '../shared/utils';
import { Router } from '@angular/router';
import { MetaService } from './meta.service';
import { LessonsService } from './lessons.service';
import { AuthService } from './auth.service';
import { lastValueFrom, map } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  http = inject(HttpClient);
  router = inject(Router);
  meta = inject(MetaService);
  lessonsService = inject(LessonsService);
  authServe = inject(AuthService);
  document = inject(DOCUMENT);

  lesson = signal<LessonsResponse | null>(null);
  currentIndex = -1;
  lessons = signal<LessonsResponse[] | null>(null);
  filteredLessons = signal<LessonsResponse[] | null>(null);
  baseUrl = BASE.baseUrl;
  baseImage = BASE.baseImage;
  allRoutes = signal<LessonsResponse[] | null>(null);
  lessonTitle = signal<string | null>(null);
  language = signal<string>("English");
  langCode = signal<string>("en_US");
  tag = signal<string>("A1");
  currentPath = signal<string>(this.router.url);
  // isChrome = signal<boolean>(false);
  waiting = signal<boolean>(true);
  isAuthenticated = this.authServe.isAuthenticated;

  el = this.document.getElementsByTagName('html');

  async fetchLessons(lang: string = 'English', tag: string = "A1") {
    try {
      let lessons: LessonsResponse[];
      let filteredLessons: LessonsResponse[];
      if (!this.lessons() || !this.lessons()?.length) {
        this.waiting.set(true);
        console.log('fetching lessons');
        lessons = await lastValueFrom(this.http.get<{ items: LessonsResponse[] }>('assets/lessons.json').pipe(
          map(data => data.items)
        ));
        // lessons = await this.lessonsService.fetchLessons() || [];
        lessons.sort((a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title));
        this.lessons.set(lessons);
      } else {
        lessons = this.lessons() || [];
        console.log('using prior lessons');
      }
      const partialPath = this.router.url.split('?')[0];
      this.currentPath.set(this.baseUrl + partialPath);
      this.langCode.set(assignLanguageCode(lang || 'English'));
      this.el[0].setAttribute('lang', this.langCode());
      this.lessonTitle.set(lang + ' - ' + tag + ' - The Purple Peoples Reader');
      this.meta.setMetaTags({ title: this.lessonTitle() || 'List', image: this.baseImage, path: this.currentPath() })

      // lessons = await lastValueFrom(this.http.get<any>(`assets/all-records.json`));
      // filteredLessons = lessons.filter((lesson: LessonsResponse) =>
      //   lesson.language === lang && lesson.tags.toString().includes(tag) && lesson.shareable
      // ).sort((a: { created: string | number | Date; }, b: { created: string | number | Date; }) => new Date(b.created).getTime() - new Date(a.created).getTime());

      filteredLessons = lessons.filter((lesson: LessonsResponse) =>
        lesson.language === lang && lesson.tags.toString().includes(tag) && lesson.shareable
      ) || [];

      (filteredLessons.length) ? this.filteredLessons.set(filteredLessons) : this.filteredLessons.set([]);
      this.waiting.set(false);
      return filteredLessons as LessonsResponse[];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      this.filteredLessons.set(null);
      return null;
    }
  }

  async fetchLesson(id: string) {
    try {
      const lesson = this.filteredLessons()?.find(lesson => lesson.id === id) || null;
      if (lesson) {
        this.currentIndex = (this.filteredLessons()?.indexOf(lesson) || -1);
        // const formattedContentLines = addLineBreaksWithTranslatedDivs(lesson.content);
        // lesson.contentLines = formattedContentLines;
        this.lesson.set(lesson);
        lesson.audioUrl = this.formatAudioUrl() || "";
        lesson.imageUrl = this.formatImageUrl() || "";
        this.lesson.set(lesson);

        this.langCode.set(assignLanguageCode(this.lesson()?.language || 'English'));
        this.el[0].setAttribute('lang', this.langCode());
        this.language.set(lesson?.language || 'English');
        this.tag.set(lesson.tags[0]);
        this.currentPath.set(this.baseUrl + this.router.url);
        this.lessonTitle.set(lesson?.title.toUpperCase() || 'PPR Lesson');
        this.meta.setMetaTags({ title: this.lessonTitle() || "PPR", image: lesson.imageUrl, path: this.currentPath() });

        this.waiting.set(false);
        return;
      } else return
    } catch (error) {
      console.error('Error fetching lesson:', error);
      this.lesson.set(null);
      return null;
    }
  }

  nextLesson() {
    if (!this.lessons()?.length) return;
    if (this.currentIndex < this.lessons()?.length! - 1) {
      this.currentIndex++;
      const id = this.lessons()?.[this.currentIndex].id!;
      this.router.navigate(['lesson', id]);
    }
  }

  previousLesson() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const id = this.lessons()?.[this.currentIndex].id!;
      this.router.navigate(['lesson', id]);
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
