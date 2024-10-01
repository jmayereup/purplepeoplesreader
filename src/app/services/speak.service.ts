import { inject, Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  db = inject(DbService);
  lang = this.db.langCode;

  constructor() { 
  }

  
  async speak(line:string, lang: string = this.lang()) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(line);

    // const selectedVoice = await this.getMatchingVoice(this.lang());
    // if (selectedVoice) {
    //   utterance.voice = selectedVoice;
    // }

    utterance.lang = lang;
    utterance.rate = .8;
    window.speechSynthesis.speak(utterance);
  }

  async loadVoices() {
    const voices = await window.speechSynthesis.getVoices();
    return voices;
  }
  
//   async getMatchingVoice(langCode: string) {
//     let voices = await this.loadVoices();
//     console.log("voices", voices);
//     let voice = voices.find(voice => voice.lang.startsWith(langCode) && !voice.localService);
    
//     if (!voice) {
//         voice = voices.find(voice => voice.lang.startsWith(langCode));
//     }
    
//     return voice;
// }

}
