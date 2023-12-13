import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LANG_VALUES } from '../shared/utils';

@Component({
  selector: 'app-lang-chooser',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lang-chooser.component.html',
  styleUrl: './lang-chooser.component.css'
})
export class LangChooserComponent {

  langs = LANG_VALUES;

}
