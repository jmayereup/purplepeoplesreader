import { Component } from '@angular/core';
import { LANG_VALUES, TAG_VALUES } from '../shared/utils';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav-pills',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './nav-pills.component.html',
  styleUrl: './nav-pills.component.css'
})
export class NavPillsComponent {
   tags = TAG_VALUES;
   langs = LANG_VALUES

}
