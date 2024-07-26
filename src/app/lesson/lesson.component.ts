import { Component, inject, input, OnChanges } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { MetaService } from '../services/meta.service';
import { SpeakService } from '../services/speak.service';
import { ActivatedRoute } from '@angular/router';
import { LessonFullTextComponent } from "../lesson-full-text/lesson-full-text.component";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe,
    NgClass, MarkdownPipe, LessonFullTextComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnChanges {

  id = input<string>();
  db = inject(DbService);
  meta = inject(MetaService);
  speakService = inject(SpeakService);
  route = inject(ActivatedRoute);
  lesson = this.db.lesson;
  lessonTitle = this.db.lessonTitle;
  isChrome = this.db.isChrome;
  showTranslation = true;
  baseImage = this.db.baseImage;
  languageReactorUrl = 'https://www.languagereactor.com/text';
  waiting = true;

  data = { lesson: {}, lang: "", path: "" }

  constructor() {

  }

  ngOnChanges() {
    this.fetchLesson();
  }
  
  async fetchLesson() {
    const lessons = this.db.allLessons();
    const id = this.id();
    if (!lessons) {
      await this.db.fetchLessons()
        if(id) {
          await this.db.fetchLesson(id);
          this.waiting = false;
        }
        return
    }
    else {
      if(id) {
        await this.db.fetchLesson(id);
        this.waiting = false;
        return
      }
    }
    
  }

  readThis(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const closestDiv = targetElement.closest('div');
    console.log('readthis', targetElement, closestDiv?.textContent);

    if (closestDiv) {
      const textContent = closestDiv.textContent?.trim() || 'No text found';
      this.speakService.speak(textContent);
    }
  }

}
