import { Component, effect, inject, input, OnChanges, Signal, signal } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent implements OnChanges {

  db = inject(DbService);
  audioUrl = input<string>("");
  path = signal<string | undefined>(undefined);

  constructor() {
  }

  ngOnChanges() {
    this.fixUrl(this.audioUrl());
  }

  fixUrl(audioUrl: string | undefined) {
    const audioFile = audioUrl?.substring(audioUrl.lastIndexOf('/') +1);
    if (audioFile) this.path.set(`https://www.purplepeoplesreader.com/apps/assets/${audioFile}`);
  }



}
