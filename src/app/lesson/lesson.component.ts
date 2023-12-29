import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LessonDetailsComponent } from "../lesson-full-text/lesson-full-text.component";
import { RouterLink } from '@angular/router';
import { FormLessonComponent } from '../form-lesson/form-lesson.component';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.css',
    imports: [CommonModule, LessonDetailsComponent, FormLessonComponent, RouterLink, ChangeSettingsComponent]
})
export class LessonComponent implements OnChanges {

  @Input() id = "";
  store = inject(StoreService);
  location = inject(Location);

  itemDetails = this.store.lessons.details;
  showEdit = this.store.app.showEdit;
  fSize = this.store.app.fontSize;

  constructor() {
  }

  ngOnChanges(): void {
    console.log('on changes called in lessons component');
    if(this.id) this.store.lessons.fetchDetails(this.id);
    this.showEdit.set(false);
  }

  toggleShowEdit() {
    this.showEdit.set(!this.showEdit());
  }

  goBack() {
    this.location.back();
  }


}
