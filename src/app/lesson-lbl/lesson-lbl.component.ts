import { Component, inject, input, OnChanges } from '@angular/core';
import { SpeakService } from '../services/speak.service';
import { FormsModule } from '@angular/forms';
import { MarkdownPipe } from 'ngx-markdown';
import { AsyncPipe, NgClass } from '@angular/common';
import { addLineBreaksWithTranslatedDivs } from '../shared/utils';

@Component({
  selector: 'app-lesson-lbl',
  standalone: true,
  imports: [FormsModule, MarkdownPipe, AsyncPipe, NgClass],
  templateUrl: './lesson-lbl.component.html',
  styleUrl: './lesson-lbl.component.css'
})
export class LessonLblComponent implements OnChanges {

  langCode = input<string>('en-US');
  lessonTitle = input<string | undefined>('');
  lessonText = input<string | undefined>('');
  lessonLines = '';


  speakService = inject(SpeakService);
  showTranslation = true;

  ngOnChanges() {
    this.lessonLines = addLineBreaksWithTranslatedDivs(this.lessonText() || '');
  }

  readThis(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const closestDiv = targetElement.closest('div');
    // console.log('readthis', targetElement, closestDiv?.textContent);
  
    if(closestDiv) {
      const textContent = closestDiv.textContent?.trim() || 'No text found';
      this.speakService.speak(textContent, this.langCode());
    }
  }
  
}
