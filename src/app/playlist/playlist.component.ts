import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-playlist',
    standalone: true,
    templateUrl: './playlist.component.html',
    styleUrl: './playlist.component.css',
    imports: [CommonModule, PlayButtonComponent, RouterLink, SpinnerComponent]
})
export class PlaylistComponent implements OnInit {

  store = inject(StoreService);

  playlist = this.store.user.userPlaylist;
  textOrUrlArray: string[] | undefined = undefined;
  loading = this.store.lessons.loading;

  ngOnInit() {
    this.store.user.checkUser();
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

  async removeLesson(lessonId: string) {
    try {
      this.loading.set(true);
      this.store.user.removeLessonFromPlaylist(lessonId);
      await this.store.user.checkUser();
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }


}
