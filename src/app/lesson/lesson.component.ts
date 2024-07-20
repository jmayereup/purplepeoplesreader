import { Component, effect, inject, input, signal } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, DOCUMENT, Location, NgClass, NgOptimizedImage } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { PlayVideoComponent } from "../play-video/play-video.component";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe, PlayButtonComponent, NgClass, MarkdownPipe, NgOptimizedImage, PlayVideoComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  id = input<string>();
  db = inject(DbService);
  document = inject(DOCUMENT);
  location = inject(Location);
  lesson = this.db.lesson;
  baseUrl = this.db.baseUrl;
  imageUrl = this.db.imageUrl;
  audioUrl = this.db.audioUrl;
  showTranslation = true;
  languageReactorUrl = 'https://www.languagereactor.com/text'; 

  constructor() {

    effect(() => {
      this.id();
      this.db.fetchLesson(this.id() || 'none');
    })
  }

  openLanguageReactor() {
    const articleText = this.document.getElementById('full-text')?.textContent || "";
    navigator.clipboard.writeText(articleText)
      .then(() => {
        console.log('Text copied to clipboard');
        const confirmed = window.confirm("Text copied. Please paste it into Language Reactor which will open in a new window.");
        if (confirmed) window.open(this.languageReactorUrl, "_blank");
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to Copy.");
      });

  }

  goBack() {
    this.location.back();
  }

  readThis(ev: Event) {

  }

  // readAll(text: string = 'No Text Found') {

  // }

}
