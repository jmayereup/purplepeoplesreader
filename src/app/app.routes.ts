import { Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonComponent } from './lesson/lesson.component';
import { lessonResolver } from './lesson.resolver';
import { lessonsResolver } from './lessons.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'lesson/uh3a26d818fe08n', pathMatch: 'full'
    },
    {
        path: 'list/:lang/:tag',
        component: LessonListComponent
    },
    {
        path: 'list/:lang', 
        redirectTo: 'list/:lang/A1' , pathMatch: 'full'
    },
    {
        path: 'lesson/:id',
        component: LessonComponent,
        resolve: {
            lesson: lessonResolver
        }
    },
    {
        path: 'create',
        loadComponent: () => import('./form-lesson/form-lesson.component').then(m => m.FormLessonComponent)
    },
    {
        path: '**',
        redirectTo: 'list/English/A1', pathMatch: 'full'
    }
];
