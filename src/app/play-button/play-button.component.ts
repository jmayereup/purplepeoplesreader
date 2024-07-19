import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {

  audioUrl = input<string>();
  path = "";

  constructor() {

    effect(() => {
      this.audioUrl();
      this.fixUrl();
    })

  }

  fixUrl(audioUrl: string = "") {
    const audioFile = audioUrl.substring(audioUrl.lastIndexOf('/') +1);
    this.path = `https://www.purplepeoplesreader.com/apps/assets/${audioFile}`;
  }



}
