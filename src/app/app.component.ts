import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { NavPillsComponent } from "./nav-pills/nav-pills.component";
import { AdComponent } from "./ad-component/ad-component.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavPillsComponent, AdComponent, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef;

  title = 'ppr';
  db = inject(DbService);
  lang = this.db.language;
  tag = this.db.tag;
  constructor() {
  }



}
