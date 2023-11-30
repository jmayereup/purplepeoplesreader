import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsResponse } from '../shared/pocketbase-types';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent {

  @Input() itemDetails: LessonsResponse | null = null;

}
