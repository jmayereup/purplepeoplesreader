import { Component, input } from '@angular/core';
import { LessonsResponse } from '../shared/pocketbase-types';
import { PlayVideoComponent } from '../play-video/play-video.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { AsyncPipe } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { BASE } from '../shared/utils';
import { PlayButtonTtsComponent } from "../play-button-tts/play-button-tts.component";

@Component({
    selector: 'app-lesson-full-text',
    imports: [PlayVideoComponent, PlayButtonComponent, MarkdownPipe, AsyncPipe, PlayButtonTtsComponent],
    templateUrl: './lesson-full-text.component.html',
    styleUrl: './lesson-full-text.component.css'
})
export class LessonFullTextComponent {

  lesson = input<LessonsResponse>();
  langCode = input<string>();
  baseImage = BASE.baseImage;
  // document = inject(DOCUMENT);

  // languageReactorUrl = 'https://www.languagereactor.com/text';
  

  // openLanguageReactor() {
  //   const articleText = this.document.getElementById('full-text')?.textContent || "";
  //   navigator.clipboard.writeText(articleText)
  //     .then(() => {
  //       console.log('Text copied to clipboard');
  //       const confirmed = window.confirm("Text copied. Please paste it into Language Reactor which will open in a new window.");
  //       if (confirmed) window.open(this.languageReactorUrl, "_blank");
  //     })
  //     .catch(err => {
  //       console.error('Failed to copy: ', err);
  //       alert("Failed to Copy.");
  //     });

  // }



  



}
