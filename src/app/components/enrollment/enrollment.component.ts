import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public logged: any = null;
  public information: any = null;

  @ViewChild('htmlData') htmlData!: ElementRef;


  enrollmentForm = new FormGroup({
    courses: new FormControl('', [
      Validators.required,
    ]),
    subjects: new FormControl('', [
      Validators.required,
    ]),
    acceptContract: new FormControl('', [
        Validators.required,
      ])
  });

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
    public coursesService: CoursesService,
    public subjectService: SubjectsService,
    public dialog: MatDialog
  ) {
   
    this.auth.GetLoggedUser().then(user => {
        this.logged = user;
        this.auth.GetUserById(user.id).then(user => {
            this.information = user.user;
        })
    });
    this.coursesService.GetCourses().then(result => {
        this.coursesList = result.filter((item: any) => !this.logged?.courses?.includes(item));
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
   this.coursesService.CreateUserCourse({
    userId: this.logged.id,
    courseId: this.enrollmentForm.value.courses,
    active: true,
    acceptTerm: this.enrollmentForm.value.acceptContract
   })
   .then(() => {
    let count = 0;
    this.enrollmentForm.value.subjects.forEach((subject: any) => {
        this.subjectService.CreateUserSubject({
            userId: this.logged.id,
            subjectId: subject.id,
            semester: subject.semester,
            year: new Date().getFullYear(),
            active: true,
            price: subject.defaultPrice || 500
        }).then(() => {
            count++
            if(count === this.enrollmentForm.value.subjects.length){
                this.snackbar.open('Matrícula realizada com sucesso!', 'Fechar');
                setTimeout(() => {
                    location.href = `/dashboard`;
                }, 2000);
            }
        })
    });
   })
  }

  openDialog() {
    this.dialog.open(DialogContract, {
      data: {
        user: this.logged,
        course: this.selectedCourse,
        subjects: this.enrollmentForm.value.subjects,
        total: this.calcEvent(this.enrollmentForm.value.subjects)
      },
    });

  }

}

@Component({
    selector: 'contrato',
    templateUrl: 'contrato-dialog.html',
  })
  export class DialogContract {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }
  }