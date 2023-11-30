import { Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'lesson/:id', component: LessonComponent },
    { path: '**', component: AppComponent},
];
