import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from "../../lesson/lesson.component";

@Component({
    selector: 'app-german',
    standalone: true,
    templateUrl: './german.component.html',
    styleUrl: './german.component.css',
    imports: [CommonModule, LessonComponent]
})
export class GermanComponent {

    @Input() id = "";

    
}
