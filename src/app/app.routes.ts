import { Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonLevelChooserComponent } from './lesson-level-chooser/lesson-level-chooser.component';
import { ErrorFindingComponent } from './error-finding/error-finding.component';
import { FormLessonComponent } from './form-lesson/form-lesson.component';
import { GermanComponent } from './lang/german/german.component';

export const routes: Routes = [
    { path: 'German/:id', component: GermanComponent },  
    { path: 'English/:id', component: LessonComponent },
    { path: 'list', component: LessonListComponent },
    { path: 'list/:type', component: LessonListComponent },
    { path: 'difficulty', component: LessonLevelChooserComponent},
    { path: 'new', component: FormLessonComponent},
    { path: 'error', component: ErrorFindingComponent},
    { path: '**', component: LessonLevelChooserComponent},
];
