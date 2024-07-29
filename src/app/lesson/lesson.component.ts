import { Component, inject, OnChanges } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { SpeakService } from '../services/speak.service';
import { Router } from '@angular/router';
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

  // id = input<string>();
  db = inject(DbService);
  speakService = inject(SpeakService);
  router = inject(Router);
  lesson = this.db.lesson;
  lessonTitle = this.lesson()?.title;
  isChrome = this.db.isChrome;
  showTranslation = true;
  baseImage = this.db.baseImage;
  languageReactorUrl = 'https://www.languagereactor.com/text';
  waiting = this.db.waiting;

  data = { lesson: {}, lang: "", path: "" }

  constructor() {}    

  
  ngOnChanges() {
    console.log('lesson on changes');
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   window.scrollTo(0, 0);
    // });
  }


readThis(event: Event): void {
  const targetElement = event.target as HTMLElement;
  const closestDiv = targetElement.closest('div');
  console.log('readthis', targetElement, closestDiv?.textContent);

  if(closestDiv) {
    const textContent = closestDiv.textContent?.trim() || 'No text found';
    this.speakService.speak(textContent, this.db.langCode());
  }
}

}
