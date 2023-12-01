import { Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonLevelChooserComponent } from './lesson-level-chooser/lesson-level-chooser.component';

export const routes: Routes = [
    { path: 'lesson/:id', component: LessonComponent },
    { path: 'all', component: LessonListComponent},
    { path: 'difficulty', component: LessonLevelChooserComponent},
    { path: '**', component: LessonLevelChooserComponent},
];
