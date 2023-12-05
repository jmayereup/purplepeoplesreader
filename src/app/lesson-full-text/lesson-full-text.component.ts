import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsResponse } from '../shared/pocketbase-types';
import { SpeakService } from '../speak.service';

@Component({
  selector: 'app-lesson-full-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-full-text.component.html',
  styleUrl: './lesson-full-text.component.css'
})
export class LessonDetailsComponent {

  @Input() itemDetails: LessonsResponse | null = null;

  speak = inject(SpeakService);

  readThis($event: any) {
    let myText = $event.target as HTMLElement;
    this.speak.readUtterance(myText.innerHTML || "none", 1 )
  }

  readAll(myText: string) {
    this.speak.readUtterance(myText, 1);
  }

}
