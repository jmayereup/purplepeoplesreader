import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { PlayButtonComponent } from "../play-button/play-button.component";

@Component({
    selector: 'app-playlist',
    standalone: true,
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.css',
    imports: [CommonModule, PlayButtonComponent]
})
export class PlaylistComponent implements OnInit {

  store = inject(StoreService);

  playlist = this.store.user.userPlaylist;
  textOrUrlArray: string[] = [''];

  constructor() { 
    // this.store.user.checkUser();

  }

  ngOnInit() {
    this.store.user.checkUser();
  }

  toggleLesson(lessonId: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.textOrUrlArray.push(lessonId);
    } else {
      this.textOrUrlArray = this.textOrUrlArray.filter(id => id !== lessonId);
    }
  }

  removeLesson(lessonId: string) {
    this.store.user.removeLessonFromPlaylist(lessonId);
    this.store.user.checkUser();
  }


}
