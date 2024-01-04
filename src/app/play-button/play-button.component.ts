import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent implements OnChanges {

  @Input() textArray: string[] = [];
  @Input() textSource: string = '';
  @Input() speed: number = .9;
  @Input() points: number = 1;

  store = inject(StoreService);
  @ViewChild('audioButton') audioButton!: ElementRef<HTMLAudioElement>;
  audioPlaying = this.store.tts.audioPlaying;
  path: string = '';

  ngOnChanges(): void {
    if (this.textSource) {
      this.playTextArray([this.textSource]);
    }
      this.readById(this.textArray);
    
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
      this.path = path;
      this.audioButton.nativeElement.onplaying = () => {
        this.audioButton.nativeElement.autoplay = true;
      }
      if (!this.audioButton?.nativeElement) return;
      this.audioButton.nativeElement.onended = () => {
        this.audioPlaying.set(false);
        this.store.user.updateLinesRead(5);
        resolve(true);
      };
      this.audioButton.nativeElement.onerror = (error) => {
        this.audioPlaying.set(false);
        reject(error);
      };
    });
  }


  async readById(id: string[] = []) {
    if (!id[0]) {
      this.audioPlaying.set(false);
      if (this.audioButton?.nativeElement) this.audioButton.nativeElement.pause();
      return;
    }
    this.audioButton.nativeElement.autoplay = false;
    console.log('reading  ids', id);
    const lessonArray: string[] = [];
    for (const record of id) {
      const fetchedRecord = await this.store.lessons.fetchDetails(record);
      lessonArray.push(fetchedRecord?.audioUrl || fetchedRecord?.content || '');
    }
    console.log('reading', lessonArray);
    this.playTextArray([...lessonArray]);
  }

}
