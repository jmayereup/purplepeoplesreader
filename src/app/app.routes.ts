import { Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LessonComponent } from './lesson/lesson.component';
import { dataResolverResolver } from './services/data-resolver.resolver';
import { listResolverResolver } from './services/list-resolver.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'lesson/uh3a26d818fe08n', pathMatch: 'full'},
    { path: 'list/:lang/:tag', 
        component: LessonListComponent,
        resolve: {data: listResolverResolver}
    },
    { path: 'list/:lang', component: LessonListComponent,
        resolve: {data: listResolverResolver}
    },
    { path: 'lesson/:id', 
        component: LessonComponent,
        resolve: {data: dataResolverResolver}
    },
    { path: '**', component: NotFoundComponent}
];
