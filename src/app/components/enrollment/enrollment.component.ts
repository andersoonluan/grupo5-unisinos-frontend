import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css'],
})
export class EnrollmentComponent implements OnInit {

  public coursesList: any[] = [];
  public selectedCourse: any;
  public totalCalculed: number = 0;


  enrollmentForm = new FormGroup({
    courses: new FormControl('', [
      Validators.required,
    ]),
    subjects: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
    public coursesService: CoursesService,
    public subjectService: SubjectsService
  ) {
    this.coursesService.GetCourses().then(result => {
      this.coursesList = result;
    })
  }

  ngOnInit(): void {
    this.selectedCourse = null;
    this.totalCalculed = 0;
  }

  calcEvent(subjects: any){
    this.totalCalculed = 0;
    subjects.forEach((subject: any) => {
        this.totalCalculed += parseFloat(subject.defaultPrice);
    })
    return this.totalCalculed;
  }

  selectCourse(id: any){
    this.coursesService.GetCourseById(id).then(courseInfo => {
        this.selectedCourse = courseInfo;
    })
  }

  addEnrollment() {
   console.log(`this.form`, this.enrollmentForm.value);
  }
}
