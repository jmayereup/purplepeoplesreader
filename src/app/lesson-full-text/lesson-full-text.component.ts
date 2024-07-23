import { Component, inject, input } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { PlayVideoComponent } from '../play-video/play-video.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { AsyncPipe, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'app-lesson-full-text',
  standalone: true,
  imports: [PlayVideoComponent, PlayButtonComponent, NgOptimizedImage, MarkdownPipe, AsyncPipe],
  templateUrl: './lesson-full-text.component.html',
  styleUrl: './lesson-full-text.component.css'
})
export class LessonFullTextComponent {

  lesson = input<LessonsResponse>();
  baseImage = input.required<string>()

  document = inject(DOCUMENT);

  audioUrl = this.lesson()?.audioUrl;
  imageUrl = this.lesson()?.imageUrl;
  languageReactorUrl = 'https://www.languagereactor.com/text';
  

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


  



}
