import { Routes } from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonLevelChooserComponent } from './lesson-level-chooser/lesson-level-chooser.component';
import { ErrorFindingComponent } from './error-finding/error-finding.component';
import { FormLessonComponent } from './form-lesson/form-lesson.component';
import { GermanComponent } from './lang/german/german.component';
import { RegisterComponent } from './login/register/register.component';
import { ThaiComponent } from './lang/thai/thai.component';
import { RoutesComponent } from './routes/routes.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/English/uh3a26d818fe08n', pathMatch: 'full' }, // Redirect home to /English/uh3a26d818fe08n
    { path: 'German/:id', component: GermanComponent },  
    { path: 'Thai/:id', component: ThaiComponent },  
    { path: 'English/:id', component: LessonComponent },
    { path: 'list', component: LessonListComponent },
    { path: 'list/:type', component: LessonListComponent },
    { path: 'difficulty', component: LessonLevelChooserComponent},
    { path: 'new', component: FormLessonComponent},
    { path: 'routes', component: RoutesComponent},
    { path: 'playlist', component: PlaylistComponent},
    { path: 'register' , component: RegisterComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'error', component: ErrorFindingComponent},
    { path: '**', component: LessonLevelChooserComponent},
];
