import { Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonLevelChooserComponent } from './lesson-level-chooser/lesson-level-chooser.component';
import { FormLessonComponent } from './form-lesson/form-lesson.component';
import { ErrorFindingComponent } from './error-finding/error-finding.component';

export const routes: Routes = [
    { path: 'lesson/:id', component: LessonComponent },
    { path: 'list', component: LessonListComponent },
    { path: 'difficulty', component: LessonLevelChooserComponent},
    { path: 'new', component: FormLessonComponent},
    { path: 'error', component: ErrorFindingComponent},
    { path: 'edit/:id', component: FormLessonComponent},
    { path: '**', component: LessonLevelChooserComponent},
];
