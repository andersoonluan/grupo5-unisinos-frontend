import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {

    public coursesList: any[] = [];
    
    subjectsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [Validators.required]),
    credits: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required]),
    totalHours: new FormControl('', [Validators.required]),
    semester: new FormControl('', [Validators.required]),
    defaultPrice: new FormControl('', [Validators.required]),
    courses: new FormControl('', [Validators.required]),
    type: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
    public coursesService: CoursesService,
    public subjectService: SubjectsService,
  ) {
    this.coursesService.GetCourses().then(result => {
      this.coursesList = result;
    })
  }

  ngOnInit(): void {
  }

  addSubject() {
    console.log(`Disciplinas`, this.subjectsForm.value);
    this.subjectService.CreateSubject(this.subjectsForm.value).then(subject => {
      this.snackbar.open(`${this.subjectsForm.value.name} criado com sucesso!`, 'Fechar');
      setTimeout(() => {
          location.href = '/dashboard';
      }, 2000)
    })
  }
}
