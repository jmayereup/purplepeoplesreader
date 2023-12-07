import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TAG_VALUES } from '../shared/utils';

@Component({
  selector: 'app-tag-chooser',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tag-chooser.component.html',
  styleUrl: './tag-chooser.component.css'
})
export class TagChooserComponent {

  tags = TAG_VALUES;

}
