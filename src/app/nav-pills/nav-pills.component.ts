import { Component, inject, input } from '@angular/core';
import { LANG_VALUES, TAG_VALUES } from '../shared/utils';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { withHttpTransferCacheOptions } from '@angular/platform-browser';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-nav-pills',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './nav-pills.component.html',
  styleUrl: './nav-pills.component.css'
})
export class NavPillsComponent {
  tags = TAG_VALUES;
  langs = LANG_VALUES;

  db = inject(DbService);
  lang = this.db.language;
  tag = this.db.tag;

}
