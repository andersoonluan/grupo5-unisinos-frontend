import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PrivateGuard } from './shared/guards/private.guard';
import { ProtectedGuard } from './shared/guards/protected.guard';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { CoursesDetailsComponent } from './components/courses/details/details.component';
import { AdminComponent } from './components/student/admin.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [ProtectedGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [ProtectedGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PrivateGuard],
  },
  {
    path: 'adicionar-curso',
    component: CoursesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'adicionar-usuario',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'adicionar-disciplina',
    component: SubjectsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'curso/:id',
    component: CoursesDetailsComponent,
    canActivate: [PrivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
