import { Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LessonComponent } from './lesson/lesson.component';

export const routes: Routes = [
    { path: 'list', component: LessonListComponent},
    { path: 'lesson/:id', component: LessonComponent},
    { path: '**', component: NotFoundComponent}
];
