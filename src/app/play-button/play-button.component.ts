import { Component, input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {

  audioUrl = input<string | undefined>(undefined);

  constructor() {
  }




}
