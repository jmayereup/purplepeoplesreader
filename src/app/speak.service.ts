import { ChangeDetectorRef, Injectable, inject, signal } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { assignLanguageCode } from './shared/utils';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

db = inject(PocketbaseService);

cdRef: ChangeDetectorRef | undefined;
rate = signal<number>(1);
selectedLanguage = signal<string | undefined>(undefined);
itemState = this.db.getItemState(); //allows the user to override the default voice
currentLinesRead = signal(0);
hasplayed = signal<boolean>(false);

isPlaying = signal<boolean>(false);
isPaused: boolean = false;

constructor() { 

}


setChangeDetector(cdr: ChangeDetectorRef) {
  this.cdRef = cdr;
}

  pauseVoice() {
    if (!this.isPaused) {
      speechSynthesis.pause();
      this.isPlaying.set(false);
      this.isPaused = true;
    }
    else {
    speechSynthesis.resume();
    this.isPlaying.set(true);
    this.isPaused = false;
    }
  }

  readUtterance(line: string, points: number, lang?: string, rate?: number): void {
    this.hasplayed.set(true);
    if (this.isPlaying() && !this.isPaused) {
      speechSynthesis.cancel();
      this.isPlaying.set(false);
      return;
    }
    if (this.isPaused) {
      speechSynthesis.resume();
      this.isPlaying.set(true);
      this.isPaused = false;
      return;
    }
    else {
      
      this.isPlaying.set(true);
      
      if (lang)  lang = this.selectedLanguage() || lang;
      if (!lang) lang = this.selectedLanguage() || this.getItemLang();
      console.log(lang);
      let utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = lang;
      utterance.rate = rate || this.rate();
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        this.currentLinesRead.update(old => old + points)
        this.isPlaying.set(false);
        console.log("lines read", this.currentLinesRead());
        this.cdRef?.detectChanges();
      };
    }
  }

  getItemLang() {
    return assignLanguageCode(this.itemState().language || 'en-CA');
  }
}
