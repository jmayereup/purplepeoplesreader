import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
    selector: 'app-lesson-level-chooser',
    standalone: true,
    templateUrl: './lesson-level-chooser.component.html',
    styleUrl: './lesson-level-chooser.component.css',
    imports: [CommonModule, RouterLink, WelcomeComponent]
})
export class LessonLevelChooserComponent {

  @Input() type = "A1";

}
