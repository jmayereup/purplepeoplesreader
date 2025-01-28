import { Component, inject, input, OnChanges } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-play-video',
    standalone: true,
    imports: [],
    templateUrl: './play-video.component.html',
    styleUrl: './play-video.component.css'
})
export class PlayVideoComponent implements OnChanges {

  videoUrl = input<string>();
  
  sanitizer = inject(DomSanitizer);

  videoId: string | undefined = '';
  baseUrl: string = 'https://www.youtube.com/embed/';
  safeUrl: SafeUrl | null = null;

  ngOnChanges() {
    if (this.videoUrl()) this.formatVideoUrl(this.videoUrl()!)
  }


  formatVideoUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      this.videoId = match[2];
      const url = this.baseUrl + this.videoId;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.log('Could not extract video ID.');
    }

  }

}
