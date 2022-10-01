import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public user: any = null;
  public showFiller = false;
  public information: any = null;
  public courses: any = null;
  public users: any = null;
  
  constructor(
    public authService: AuthService,
    public courseService: CoursesService,
  ) {
    this.authService.GetLoggedUser().then(logged => {
      this.user = logged;
    })
    this.authService.GetUserById().then(data => {
      this.information = data.user;
    })
    
    this.courseService.GetCourses().then(data => {
      this.courses = data;
    })

    this.authService.GetAllUsers().then(users => {
      this.users = users;
    })
  }

  ngOnInit(): void {}

  getCourse(id: string): any {
    location.href = `/curso/${id}`
  }

}