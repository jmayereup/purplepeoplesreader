import { ChangeDetectorRef, Injectable, inject, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  cdRef: ChangeDetectorRef | undefined;
  // rate = signal<number>(1);
  // selectedLanguage = signal<string | undefined>(undefined);
  currentLinesRead = signal(0);
  private hasplayed = signal<boolean>(false);
  private isPlaying = signal<boolean>(false);
  private isPaused: boolean = false;

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

  readUtterance(line: string, points: number = 1, lang?: string, rate?: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.hasplayed.set(true);
      if (this.isPlaying() && !this.isPaused) {
        speechSynthesis.cancel();
        this.isPlaying.set(false);
        reject("cancelled");
        return 0;
      }
      if (this.isPaused) {
        speechSynthesis.resume();
        this.isPlaying.set(true);
        this.isPaused = false;
        reject("resumed");
        return 0;
      }
      else {

        this.isPlaying.set(true);
        let utterance = new SpeechSynthesisUtterance(line);
        utterance.lang = lang || "en-CA";
        utterance.rate = rate || .8;
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => {
          this.currentLinesRead.update(old => old + points)
          this.isPlaying.set(false);
          this.cdRef?.detectChanges();
          resolve(points = points);
        };
      }
      return points;
    });
  }


}
