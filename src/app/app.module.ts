import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './shared/services/auth.service';
import { MaterialAngularModule } from './material-angular.module';
import { CoursesService } from './shared/services/courses.service';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesDetailsComponent } from './components/courses/details/details.component';
import { AdminComponent } from './components/student/admin.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectsService } from './shared/services/subjects.service';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    CoursesComponent,
    CoursesDetailsComponent,
    AdminComponent,
    SubjectsComponent,
    EnrollmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialAngularModule,
  ],
  providers: [AuthService, CoursesService, SubjectsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
