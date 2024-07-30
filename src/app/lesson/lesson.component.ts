import { Component, inject, input, OnChanges, PLATFORM_ID } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { SpeakService } from '../services/speak.service';
import { LessonFullTextComponent } from "../lesson-full-text/lesson-full-text.component";
import { AdComponent } from '../ad-component/ad-component.component';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe,
    NgClass, MarkdownPipe, LessonFullTextComponent, AdComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnChanges {

  id = input<string>();
  db = inject(DbService);
  speakService = inject(SpeakService);
  platformId = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
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
