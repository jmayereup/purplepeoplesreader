import { CommonModule } from '@angular/common';
import {Component, Input, OnInit, inject} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  selector: 'video-player',
})
export class VideoPlayerComponent implements OnInit {


@Input() videoUrl: string = 'https://www.youtube.com/watch?v=Xu-QfE_1ksk';

videoId: string | undefined = '';
baseUrl: string  = 'https://www.youtube.com/embed/';
safeUrl: SafeUrl | null  = null;
sanitizer = inject(DomSanitizer);

constructor() { 
  
}

ngOnInit() {
  this.getVideoId(this.videoUrl);
  const url = this.baseUrl + this.videoId;
  this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  console.log('safeurl', this.safeUrl);
}



getVideoId(url: string) {
  // if (url.includes('youtu.be')) {
  //   const urlArray = url.split('/');
  //   this.videoId = urlArray[3];
  //   console.log('videoId', this.videoId);
  //   return;
  // }
  // const urlArray = url.split('=');
  // this.videoId = urlArray[1];
  // console.log('videoId', this.videoId);
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    this.videoId = match[2];
  } else {
    console.log('Could not extract video ID.');
  }

}
}


