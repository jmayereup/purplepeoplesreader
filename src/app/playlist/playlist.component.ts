import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-playlist',
    standalone: true,
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.css',
    imports: [CommonModule, PlayButtonComponent, RouterLink]
})
export class PlaylistComponent {

  store = inject(StoreService);

  playlist = this.store.user.userPlaylist;
  textOrUrlArray: string[] | undefined = undefined;

  constructor() { 
    // this.store.user.checkUser();

  }

  toggleLesson(lessonId: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.textOrUrlArray) this.textOrUrlArray = [];
      this.textOrUrlArray.push(lessonId);
    } else {
      if (!this.textOrUrlArray) return;
      this.textOrUrlArray = this.textOrUrlArray.filter(id => id !== lessonId);
    }
  }

  removeLesson(lessonId: string) {
    this.store.user.removeLessonFromPlaylist(lessonId);
  }


}
