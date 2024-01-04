import { Component, OnInit, inject, signal } from '@angular/core';
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
  textOrUrlArray: string[] = [];
  loading = this.store.lessons.loading;
  allChecked = false;

  ngOnInit() {
    this.store.user.checkUser();
  }

  toggleLesson(lessonId: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.textOrUrlArray.push(lessonId);
      this.textOrUrlArray = [...this.textOrUrlArray];
    } else {
      if (!this.textOrUrlArray) return;
      this.textOrUrlArray = this.textOrUrlArray.filter(id => id !== lessonId);
      this.textOrUrlArray = [...this.textOrUrlArray];
    }
  }

  toggleAll()
  {
    if (!this.playlist()) return;
    let newTextOrUrlArray: string[] = [];
    if (this.textOrUrlArray.length == this.playlist()?.length) {
      this.textOrUrlArray = [...newTextOrUrlArray];
    }
    else {
      newTextOrUrlArray = this.playlist()?.map((item) => item.id) || [];
    }
    this.textOrUrlArray = [...newTextOrUrlArray];
    this.allChecked = !this.allChecked;
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
