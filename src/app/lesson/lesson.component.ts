import { Component, effect, inject, input } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { PlayButtonComponent } from "../play-button/play-button.component";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe, MarkdownPipe, PlayButtonComponent, NgClass],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  id = input<string>()
  db = inject(DbService);
  document = inject(Document);
  lesson = this.db.lesson;
  baseUrl = this.db.baseUrl;
  imageUrl: string = 'purple-peoples-reader';
  showTranslation = true;
  textOrUrl = "";
  languageReactorUrl = 'https://www.languagereactor.com/text'; 

  constructor() {

    effect(() => {
      this.id();
      this.db.fetchLesson(this.id() || 'none').then(() => {
        this.getImage();
      });
    })
  }

  getImage(): string {
    this.imageUrl = this.lesson()?.imageUrl || 'purple-people-eater.png';
    const coverImage = this.imageUrl.substring(this.imageUrl.lastIndexOf('/') + 1);
    console.log("cover image", coverImage);

    return `${this.baseUrl}apps/assets/${coverImage}`;
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

  readThis(ev: Event) {

  }

  readAll(){

  }

}
