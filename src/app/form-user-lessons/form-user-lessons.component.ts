import { Component, inject, input, OnInit } from '@angular/core';
import { UserLesson } from '../shared/pocketbase-types';
import { FormsModule } from '@angular/forms';
import { LessonListUserComponent } from "../lesson-list-user/lesson-list-user.component";
import { DOCUMENT } from '@angular/common';
import { LessonLblComponent } from "../lesson-lbl/lesson-lbl.component";
import { assignLanguageCode } from '../shared/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-form-user-lessons',
    imports: [FormsModule, LessonListUserComponent, LessonLblComponent],
    templateUrl: './form-user-lessons.component.html',
    styleUrl: './form-user-lessons.component.css'
})
export class FormUserLessonsComponent implements OnInit {

  title: string = '';
  lesson: string = '';
  language: string = 'English';
  savedLesson = input<UserLesson>();
  lessons: UserLesson[] = [];
  document = inject(DOCUMENT);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.loadLessons();
    const params = this.route.snapshot.queryParams;
    if (params && params['text']) {
      this.lesson = decodeURIComponent(params['text']);
      this.title = params['title'] ? decodeURIComponent(params['title']) : this.lesson.slice(0, 30);
      this.language = params['language'] ? params['language'] : 'English';
    }
  }

  loadLessons(): void {
    const storedLessons = this.document.defaultView?.localStorage?.getItem('lessons');
    if (storedLessons) {
      this.lessons = JSON.parse(storedLessons);
    }
  }

  addLesson(): void {
    if (this.title && this.lesson) {
      const newLesson: UserLesson = { title: this.title, lesson: this.lesson, language: this.language };
      const existingLessonIndex = this.lessons.findIndex(lesson => lesson.title === newLesson.title);

      if (existingLessonIndex !== -1) {
        const overwriteConfirmed = confirm(`A lesson with the title "${newLesson.title}" already exists. Do you want to overwrite it?`);

        if (!overwriteConfirmed) return;
        this.lessons[existingLessonIndex] = newLesson;
      } else {
        this.lessons.push(newLesson);
      }
      localStorage.setItem('lessons', JSON.stringify(this.lessons));
    }
  }

  async pasteLesson() {
      try {
        this.lesson = await navigator.clipboard.readText();
        this.title = this.lesson.slice(0,30);
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }

  loadSelectedLesson(title: string) {
    const existingLessonIndex = this.lessons.findIndex(lesson => lesson.title === title);
    if (existingLessonIndex !== -1) {
      this.title = this.lessons[existingLessonIndex].title;
      this.lesson = this.lessons[existingLessonIndex].lesson;
      this.language = this.lessons[existingLessonIndex].language;

    if (this.lesson.length < 50000) {
      const queryParams = {
        title: encodeURIComponent(this.title),
        language: encodeURIComponent(this.language),
        text: encodeURIComponent(this.lesson)
      };
      // console.log(queryParams);
      this.router.navigate([], {
        queryParams: queryParams
      });
    }


    }
  }


  removeSelectedLesson(title: string): void {
    // Find the index of the lesson to be removed
    const lessonIndex = this.lessons.findIndex(lesson => lesson.title === title);

    if (lessonIndex !== -1) {
      // Remove the lesson from the array
      this.lessons.splice(lessonIndex, 1);

      // Update the localStorage with the modified lessons array
      localStorage.setItem('lessons', JSON.stringify(this.lessons));
    }
  }
  convertToLangCode(language: string) {
    return assignLanguageCode(language)
  }





}
