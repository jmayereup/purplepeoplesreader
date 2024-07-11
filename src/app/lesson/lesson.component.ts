import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LessonDetailsComponent } from "../lesson-full-text/lesson-full-text.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormLessonComponent } from '../form-lesson/form-lesson.component';
import { StoreService } from '../services/store.service';
import { ChangeSettingsComponent } from "../change-settings/change-settings.component";
import { SpinnerComponent } from '../spinner/spinner.component';
import { Meta, Title } from '@angular/platform-browser';
import { assignLanguageCode } from '../shared/utils';

@Component({
    selector: 'app-lesson',
    standalone: true,
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.css',
    imports: [CommonModule, LessonDetailsComponent, FormLessonComponent, 
      RouterLink, ChangeSettingsComponent, SpinnerComponent]
})
export class LessonComponent implements OnChanges, OnInit {

  @Input() id = "";
  store = inject(StoreService);
  route = inject(ActivatedRoute);
  location = inject(Location);
  metaService = inject(Meta);
  titleService = inject(Title);


  itemDetails = this.store.lessons.details;
  showEdit = this.store.app.showEdit;
  fSize = this.store.app.fontSize;
  baseUrl = this.store.app.baseUrl;
  lessonLanguage = "en-CA";

  constructor() {
    
  }

  ngOnInit() {
        this.lessonLanguage = assignLanguageCode(this.itemDetails()?.language || "German");
        console.log("lesson lang", this.lessonLanguage);
        this.titleService.setTitle(this.itemDetails()?.title || 'Lesson Details');
        this.metaService.updateTag({ name: 'og:title', content: this.itemDetails()?.title || "The Purple People's Reader 1" });
        this.metaService.updateTag({ name: 'og:description', content: this.itemDetails()?.content?.slice(0, 50).replace(/[#_*\[\]\(\)]/g, "") || "1 Learn languages through listenings and reading." });
        this.metaService.updateTag({ name: 'og:image', content: this.getImageThumbnail() });

  }

  ngOnChanges(): void {
    console.log('on changes called in lessons component');
    // if(this.id) this.store.lessons.fetchDetails(this.id);
    this.showEdit.set(false);


  }

  toggleShowEdit() {
    this.showEdit.set(!this.showEdit());
  }

  goBack() {
    this.location.back();
  }

  getImage(): string {
    const coverImage = this.itemDetails()?.imageUrl;
    if (coverImage) return `${this.baseUrl}${coverImage}`;
    else
      return `${this.baseUrl}apps/assets/purple-people-eater.jpeg`;
  }

  getImageThumbnail() {
    if (this.itemDetails()?.imageUrl) {
      let imageUrl = this.itemDetails()?.imageUrl || 'app/assets/purple-people-eater.jpeg';
      const baseName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('.'));
      const thumbnailUrl = `apps/assets/thumbnails/${baseName}_thumbnail.png`;
      return this.baseUrl + thumbnailUrl;
    }
    return this.baseUrl + "apps/assets/thumbnails/purple-people-eater_thumbnail.png";
  }

}
