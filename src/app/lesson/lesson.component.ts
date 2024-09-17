import { Component, inject, OnChanges, PLATFORM_ID } from '@angular/core';
import { DbService } from '../services/db.service';
import { SpinnerComponent } from "../spinner/spinner.component";
import { isPlatformBrowser } from '@angular/common';
import { LessonFullTextComponent } from "../lesson-full-text/lesson-full-text.component";
import { AdComponent } from '../ad-component/ad-component.component';
import { LessonLblComponent } from "../lesson-lbl/lesson-lbl.component";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SpinnerComponent, LessonFullTextComponent, AdComponent, LessonLblComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnChanges {

  db = inject(DbService);
  
  platformId = inject(PLATFORM_ID);
  lesson = this.db.lesson;
  lessonTitle = this.lesson()?.title;
  
  baseImage = this.db.baseImage;
  languageReactorUrl = 'https://www.languagereactor.com/text';
  waiting = this.db.waiting;

  data = { lesson: {}, lang: "", path: "" }

  constructor() {}    

  
  ngOnChanges() {
    console.log('lesson on changes');
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }




}
