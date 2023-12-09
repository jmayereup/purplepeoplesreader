import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";
import { StoreService } from '../services/store.service';

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css',
    imports: [CommonModule, RouterLink, TagChooserComponent]
})
export class LessonListComponent {

  store = inject(StoreService);
  
  itemDetails = this.store.lessons.details;
  resultList = this.store.lessons.results;
  
  defaultImage = "../../assets/icons/book.svg"

}
