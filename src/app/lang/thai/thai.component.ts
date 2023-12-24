import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from '../../lesson/lesson.component';

@Component({
    selector: 'app-german',
    standalone: true,
    templateUrl: './thai.component.html',
    styleUrl: './thai.component.css',
    imports: [CommonModule, LessonComponent]
})
export class ThaiComponent {

    @Input() id = "";

    
}
