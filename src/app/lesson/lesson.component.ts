import { Component, inject, input, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, DOCUMENT, Location, NgClass, NgOptimizedImage } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { PlayVideoComponent } from "../play-video/play-video.component";
import { MetaService } from '../services/meta.service';
import { SpeakService } from '../services/speak.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe, PlayButtonComponent, NgClass, MarkdownPipe, NgOptimizedImage, PlayVideoComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {

  id = input<string>();
  db = inject(DbService);
  meta = inject(MetaService);
  document = inject(DOCUMENT);
  location = inject(Location);
  speakService = inject(SpeakService);
  route = inject(ActivatedRoute);
  lesson = this.db.lesson;
  baseUrl = this.db.baseUrl;
  imageUrl = this.db.imageUrl;
  audioUrl = this.db.audioUrl;
  lessonTitle = this.db.lessonTitle;
  showTranslation = true;
  languageReactorUrl = 'https://www.languagereactor.com/text';

  data = { lesson: {}, lang: "", path: "" }

  constructor() {

  }

  ngOnInit() {
    console.log('oninit called', this.id());
    if (this.id()) this.db.fetchLesson(this.id()!)
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
