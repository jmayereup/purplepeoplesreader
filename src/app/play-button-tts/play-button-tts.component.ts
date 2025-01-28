import { Component, inject, input } from '@angular/core';
import { SpeakService } from '../services/speak.service';

@Component({
    selector: 'app-play-button-tts',
    standalone: true,
    imports: [],
    templateUrl: './play-button-tts.component.html',
    styleUrl: './play-button-tts.component.css'
})
export class PlayButtonTtsComponent {

  content = input<string>();
  lang = input<string>();
  speakService = inject(SpeakService);
  
  play(content: string, lang: string) {
    console.log(content, lang);
    this.speakService.speak(content, lang);

  }
 

}
