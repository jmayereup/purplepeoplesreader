import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { NavPillsComponent } from "./nav-pills/nav-pills.component";
import { debounceTime, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LessonListComponent, NavPillsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ppr';

  db = inject(DbService);
  route = inject(ActivatedRoute);
  lang = this.db.language;
  tag = this.db.tag;

  constructor() {
  }
  
  ngOnInit() {
    const queryParamsSub = this.route.queryParamMap.pipe(
      shareReplay(1)
    )
    .subscribe(
      params => {
      let lang = params.get('lang') || this.lang();
      let tag = params.get('tag') || this.tag();
      this.lang.set(lang);
      this.tag.set(tag);
      }
    )
    
  }

}
