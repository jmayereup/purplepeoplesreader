import { Component, ViewChild, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";
import { assignLanguageCode } from '../shared/utils';
import { PlayButtonComponent } from '../play-button/play-button.component';

@Component({
  selector: 'app-lesson-full-text',
  standalone: true,
  templateUrl: './lesson-full-text.component.html',
  styleUrl: './lesson-full-text.component.css',
  imports: [CommonModule, MarkdownPipe, ChangeSettingsComponent, PlayButtonComponent]
})
export class LessonDetailsComponent {

  store = inject(StoreService);
  document = inject(DOCUMENT);
  showTranslation = true;

  itemDetails = this.store.lessons.details;
  coverImage = this.store.lessons.details()?.imageUrl || 'assets/purple-people-eater.jpeg';

  textOrUrl = '';

  @ViewChild(PlayButtonComponent) playButton!: PlayButtonComponent;

  constructor() {
    effect(() => {
      this.itemDetails();
      this.textOrUrl = this.itemDetails()?.audioUrl || '';
      this.coverImage = this.itemDetails()?.imageUrl || 'assets/purple-people-eater.jpeg';
    });
  }



  readThis($event: any) {
    const myText = $event.target.closest("div");
    const points = Math.ceil((myText.textContent?.length || 100) / 100);
    console.log('points', points);
    this.store.tts.readUtterance(myText.textContent || "none", points)
  }

  calculatePoints(text: string) {
    return Math.ceil((text.length || 100) / 100);
  }


  readAll() {
    const myText = this.document.getElementById("full-text");
    const points = Math.ceil((myText?.textContent?.length || 100) / 100);
    this.textOrUrl = this.itemDetails()?.audioUrl || myText?.textContent || 'none';
    this.playButton.readArray().then(() => {
      this.store.user.updateLinesRead(points);
    });
  }
}
