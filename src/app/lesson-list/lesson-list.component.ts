import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PocketbaseService } from '../pocketbase.service';
import { TagChooserComponent } from "../tag-chooser/tag-chooser.component";

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.css',
    imports: [CommonModule, RouterLink, TagChooserComponent]
})
export class LessonListComponent {

  db = inject(PocketbaseService);
  itemDetails = this.db.itemDetails;
  resultList = this.db.fetchedResults;
  type = 'A1';

  defaultImage = "../../assets/icons/book.svg"

  ngOnInit() {
    this.db.fetchResults();
  }

}
