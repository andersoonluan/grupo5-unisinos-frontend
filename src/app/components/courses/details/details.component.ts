import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class CoursesDetailsComponent implements OnInit {

  public user: any = null;
  public information: any = null;
  public course: any;
  public isAssigned: boolean = false;
  
  constructor(
    public authService: AuthService,
    public courseService: CoursesService,
    public snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.authService.GetLoggedUser().then(logged => {
      this.user = logged;
    })
    this.authService.GetUserById().then(data => {
      this.information = data.user;
    });
    const courseId: any = this.route.snapshot.paramMap.get('id');
    this.courseService.GetCourseById(courseId).then(course => {
        this.course = course;
        this.isAssigned = this.course?.students?.some((student: any) => student.id === this.user?.id);
    });
  }

  ngOnInit(): void {}

}