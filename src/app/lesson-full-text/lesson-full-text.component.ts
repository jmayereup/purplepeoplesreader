import { AfterViewInit, Component, OnInit, ViewChild, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MarkdownPipe } from 'ngx-markdown';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";
import { PlayButtonComponent } from '../play-button/play-button.component';
import { LessonsLanguageOptions } from '../shared/pocketbase-types';
import { VideoPlayerComponent } from "../video-player/video-player.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-lesson-full-text',
    standalone: true,
    templateUrl: './lesson-full-text.component.html',
    styleUrl: './lesson-full-text.component.css',
    imports: [CommonModule, MarkdownPipe, ChangeSettingsComponent, PlayButtonComponent, VideoPlayerComponent]
})
export class LessonDetailsComponent implements OnInit, AfterViewInit {

  store = inject(StoreService);
  document = inject(DOCUMENT);
  showTranslation = true;

  itemDetails = this.store.lessons.details;
  audioPlaying = this.store.tts.audioPlaying;
  baseUrl = "https://www.purplepeoplesreader.com/";

  textOrUrl = '';

  titleService = inject(Title);
  metaService = inject(Meta);

  @ViewChild(PlayButtonComponent) playButton!: PlayButtonComponent;

  constructor() {
    effect(() => {
      this.itemDetails();
      this.textOrUrl = this.itemDetails()?.audioUrl || '';
      
    });
  }
  
  ngOnInit() {
    console.log('init');
    this.titleService.setTitle(this.itemDetails()?.title || 'Lesson Details');
    this.metaService.updateTag({ name: 'og:title', content: this.itemDetails()?.title || "The Purple People's Reader" });
    this.metaService.updateTag({ name: 'og:description', content: this.itemDetails()?.content?.slice(0,50) || "Learn languages through listenings and reading." });
    this.metaService.updateTag({ name: 'og:image', content: this.getImage() });
  }

  ngAfterViewInit() {
    console.log('after view init');
  }


  readThis($event: any) {
    const myText = $event.target.closest("div");
    const points = Math.ceil((myText.textContent?.length || 100) / 100);
    console.log('points', points);
    this.store.tts.readUtterance(myText.textContent || "", points)
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
      this.store.tts.readUtterance(myText.textContent || "", points);
      // this.textOrUrl = this.itemDetails()?.audioUrl || myText.textContent || 'none';
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

  getImage(): string {
    const coverImage = this.itemDetails()?.imageUrl;
    if (coverImage) return `${this.baseUrl}${coverImage}`;
    else
      return `${this.baseUrl}apps/assets/purple-people-eater.jpeg`;
  }


}