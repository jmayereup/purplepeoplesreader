import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {

  @Input() textArray: string[] | string = '';
  @Input() speed: number = .9;
  @Input() points: number = 1;

  store = inject(StoreService);
  currentAudio: HTMLAudioElement | undefined = undefined;


  async readArray(t = 0, f = 0) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = undefined;
      return;
    }
    this.playTextArray(t);
  }

  async playTextArray(t = 0) {
    if (typeof this.textArray === 'string' && this.textArray.length > 0) {
      if (this.textArray.endsWith('.mp3')) this.playAudio(this.textArray);
      else
        this.store.tts.readUtterance(this.textArray, this.points);
      return;
    }
    if (t < this.textArray.length && this.textArray.length > 0) {
      if (this.textArray[t].endsWith('.mp3')) {
        await this.playAudio(this.textArray[t]).then(() => {
          this.playTextArray(t + 1);
          return;
        });
        return;
      }
      this.store.tts.readUtterance(this.textArray[t], this.points).then(() => {
        this.playTextArray(t + 1);
        return;
      });
    }
  }

  async playAudio(path: string) {
    const audio = new Audio(path);
    this.currentAudio = audio;
    audio.play();
    audio.onended = () => {
      this.currentAudio = undefined;
    }
  }

  readById(id: string | string[]) {
    if (typeof id === 'string') {
      this.store.lessons.fetchDetails(id).then(() => {
        this.textArray = this.store.lessons.details()?.audioUrl || this.store.lessons.details()?.content || '';
        this.readArray();
      });
    }
    else {
      const lessonArray = [''];
      id.forEach((id) => {
        this.store.lessons.fetchDetails(id).then(() => {
          lessonArray.push(this.store.lessons.details()?.audioUrl || this.store.lessons.details()?.content || '');
        });
      });
      this.textArray = lessonArray;
      this.readArray();
    }

  }

}
