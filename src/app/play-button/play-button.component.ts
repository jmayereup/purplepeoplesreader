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

  @Input() textArray: string[] = [];
  @Input() speed: number = .9;
  @Input() points: number = 1;

  store = inject(StoreService);
  currentAudio: HTMLAudioElement | undefined = undefined;
  audioPlaying = this.store.tts.audioPlaying;


  async readArray(data: string[] , t = 0, f = 0) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = undefined;
      this.audioPlaying.set(false);
      return;
    }
    this.playTextArray(data, t);
  }

  async playTextArray(data: string[], t = 0) {
    this.audioPlaying.set(true);
    if (t < data.length) {
      if (data[t].endsWith('.mp3')) {
        console.log('reading', data[t]);
        this.playAudio(`https://www.purplepeoplesreader.com/${data[t]}`).then(() => {
        this.playTextArray(data, t + 1);
          return;
        });
        return;
      }
      this.store.tts.readUtterance(data[t], this.points).then(() => {
        this.playTextArray(data, t + 1);
        this.audioPlaying.set(false);
        return;
      });
    }
  }

  async playAudio(path: string) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(path);
      this.currentAudio = audio;
      audio.play();
      audio.onended = () => {
        this.currentAudio = undefined;
        this.audioPlaying.set(false);
        resolve(true);
      };
      audio.onerror = (error) => {
        this.currentAudio = undefined;
        this.audioPlaying.set(false);
        reject(error);
      };
    });
  }
  

  async readById(id: string[]) {
    console.log('reading  ids', id);
    const lessonArray: string[] = [];
    for (const record of id) {
      const fetchedRecord = await this.store.lessons.fetchDetails(record);
      lessonArray.push(fetchedRecord?.audioUrl || fetchedRecord?.content || '');
    }
    console.log('reading', lessonArray);
    this.readArray([...lessonArray]);
  }

}
