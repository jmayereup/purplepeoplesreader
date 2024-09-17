import { Routes } from '@angular/router';
import { lessonResolver } from './lesson.resolver';
import { lessonsResolver } from './lessons.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'lesson/uh3a26d818fe08n', pathMatch: 'full'
    },
    {
        path: 'list/USER/A1',
        redirectTo: 'saved', pathMatch: 'full'
    },
    {
        path: 'saved',
        loadComponent: () => import('./form-user-lessons/form-user-lessons.component').then(m => m.FormUserLessonsComponent)
    },
    {
        path: 'list/:lang/:tag',
        loadComponent: () => import('./lesson-list/lesson-list.component').then(m => m.LessonListComponent),
        resolve: {
            lesson: lessonsResolver
        }
    },
    {
        path: 'list/:lang', 
        redirectTo: 'list/:lang/A1' , pathMatch: 'full'

    },
    {
        path: 'lesson/:id',
        loadComponent: () => import('./lesson/lesson.component').then(m => m.LessonComponent),
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
