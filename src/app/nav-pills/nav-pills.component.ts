import { Component, inject } from '@angular/core';
import { LANG_VALUES, TAG_VALUES } from '../shared/utils';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-nav-pills',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, NgClass, RouterLinkActive, NgStyle],
  templateUrl: './nav-pills.component.html',
  styleUrl: './nav-pills.component.css'
})
export class NavPillsComponent {
  tags = TAG_VALUES;
  langs = LANG_VALUES;

  db = inject(DbService);
  lang = this.db.language;
  tag = this.db.tag;

  isAuthenticated = this.db.isAuthenticated;

}
