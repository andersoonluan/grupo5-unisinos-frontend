import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {

  public user: any = null;
  public information = null;
  
  constructor(
    public authService: AuthService,
    public courseService: CoursesService,
    public snackbar: MatSnackBar,
  ) {
    this.authService.GetLoggedUser().then(logged => {
      this.user = logged;
    })
    this.authService.GetUserById().then(data => {
      this.information = data.user;
    })
  }

  ngOnInit(): void {}

  courseForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      specialization: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      totalHours: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      semesters: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
  });


  addCourse() {
   this.courseService.CreateCourse(this.courseForm.value).then(created => {
    this.snackbar.open(`${this.courseForm.value.name} criado com sucesso!`, 'Fechar');
    setTimeout(() => {
        location.href = '/dashboard';
    }, 2000)
   })
  }


}