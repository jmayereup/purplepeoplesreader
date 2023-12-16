import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsResponse } from '../shared/pocketbase-types';
import { MarkdownPipe } from 'ngx-markdown';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";
import { assignLanguageCode } from '../shared/utils';

@Component({
    selector: 'app-lesson-full-text',
    standalone: true,
    templateUrl: './lesson-full-text.component.html',
    styleUrl: './lesson-full-text.component.css',
    imports: [CommonModule, MarkdownPipe, ChangeSettingsComponent]
})
export class LessonDetailsComponent {
  
  store = inject(StoreService);
  showTranslation = true;
  
  itemDetails = this.store.lessons.details;
  lang = assignLanguageCode(this.itemDetails()?.language || "English");
  

  readThis($event: any) {
    const myText = $event.target.closest("div");
    const points = Math.round((myText.textContent?.length || 100) / 100);
    this.store.tts.readUtterance(myText.textContent || "none", points )
  }

  readAll(myText: string) {
    const points = Math.round(myText.length / 100);
    this.store.tts.readUtterance(myText, 1);
  }

}
