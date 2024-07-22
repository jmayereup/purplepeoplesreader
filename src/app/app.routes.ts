import { Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LessonComponent } from './lesson/lesson.component';

export const routes: Routes = [
    { path: '', 
       redirectTo: 'lesson/uh3a26d818fe08n', pathMatch: 'full'    },
    { path: 'list/:lang/:tag', 
        component: LessonListComponent
    },
    { path: 'list/:lang', component: LessonListComponent
    },
    { path: 'lesson/:id', 
        component: LessonComponent
    },
    { path: '**', component: NotFoundComponent}
];
