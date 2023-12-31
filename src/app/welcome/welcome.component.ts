import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from "../video-player/video-player.component";

@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.css',
    imports: [CommonModule, VideoPlayerComponent]
})
export class WelcomeComponent {

  defaultUrl: string = 'https://youtu.be/J_EQDtpYSNM';
  // defaultUrl: string = "";

}
