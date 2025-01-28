import { Component, input, output } from '@angular/core';
import { UserLesson } from '../shared/pocketbase-types';

@Component({
    selector: 'app-lesson-list-user',
    imports: [],
    templateUrl: './lesson-list-user.component.html',
    styleUrl: './lesson-list-user.component.css'
})
export class LessonListUserComponent {
  
  selectLesson = output<string>();
  removeLesson = output<string>();
 
  lessons = input<UserLesson[]>([]);

  onSelectLesson(title: string) {
    console.log('called', title);
    this.selectLesson.emit(title);
  }

  onRemoveLesson(title: string) {
    const confirmed = confirm("Are you sure you want to delete this lesson?")
    if (!confirmed) return;
    this.removeLesson.emit(title);
  }


}
