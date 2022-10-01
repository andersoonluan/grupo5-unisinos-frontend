import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  hidePass = true;
  hideCpass = true;
  passwordMatch = true;

  public coursesList: any[] = [];
  public subjectsList: any[] = [];


  adminForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    type: new FormControl('', [
      Validators.required,
    ]),
    courses: new FormControl('', [
      Validators.required,
    ]),
    subjects: new FormControl('', [
      Validators.required,
    ]),
  });

  get password() {
    return this.adminForm.get('password');
  }
  get passwordConfirmation() {
    return this.adminForm.get('passwordConfirmation');
  }

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
    public coursesService: CoursesService,
    public subjectService: SubjectsService
  ) {
    this.coursesService.GetCourses().then(result => {
      this.coursesList = result;
    })
    this.subjectService.GetSubjects().then(result => {
      this.subjectsList = result;
    })
  }

  ngOnInit(): void {
    this.passwordsMatch();
  }

  addAdmin() {
    if (
      this.adminForm.get('password')?.value ===
      this.adminForm.get('passwordConfirmation')?.value
    ) {
      this.auth.CreateUser(this.adminForm.value).then(created => {
        this.snackbar.open(`${this.adminForm.value.name} criado com sucesso!`, 'Fechar');
      setTimeout(() => {
          location.href = '/dashboard';
      }, 2000)
      }) 
    } else {
      this.passwordMatch = false;
    }
  }

  passwordsMatch() {
    this.passwordConfirmation?.valueChanges.subscribe((val) => {
      if (val !== this.password?.value) {
        this.passwordMatch = false;
      } else {
        this.passwordMatch = true;
      }
    });
  }
}
