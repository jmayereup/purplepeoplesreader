import { Component, ViewChild, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";
import { PlayButtonComponent } from '../play-button/play-button.component';
import { LessonsLanguageOptions } from '../shared/pocketbase-types';

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
  audioPlaying = this.store.tts.audioPlaying;
  coverImage = `https://www.purplepeoplesreader.com/${this.store.lessons.details()?.imageUrl}`;

  textOrUrl = '';

  @ViewChild(PlayButtonComponent) playButton!: PlayButtonComponent;

  constructor() {
    effect(() => {
      this.itemDetails();
      this.textOrUrl = this.itemDetails()?.audioUrl || 'none';
      this.coverImage = `https://www.purplepeoplesreader.com/${this.store.lessons.details()?.imageUrl}`;
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


  async readAll() {
    try {
      const myText = this.document.getElementById("full-text");
      if (!myText) {
        throw new Error("Element with id 'full-text' not found");
      }
      const points = Math.ceil((myText.textContent?.length || 100) / 100);
      this.textOrUrl = this.itemDetails()?.audioUrl || myText.textContent || 'none';
      this.playButton.readArray([this.textOrUrl]).then(() => {
        // this.store.user.updateLinesRead(points);
      });
    } catch (error) {
      console.error(error);
    }
  }

  addToPlaylist() {
    try {
      const itemId = this.itemDetails()?.id || 'none';
      const itemTitle = this.itemDetails()?.title || 'none';
      const itemLanguage = this.itemDetails()?.language || LessonsLanguageOptions.English; // Replace Language.English with the default language enum value
      console.log(itemId, itemTitle, itemLanguage);
      this.store.user.addToPlaylist(itemId, itemTitle, itemLanguage);
    } catch (error) {
      console.error(error);
    }
  }
}