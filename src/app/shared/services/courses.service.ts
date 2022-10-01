import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
  }

  async GetCourses() : Promise<any> {
    const user: any = localStorage.getItem('currentUser');
    const { token } = JSON.parse(user);
    return this.http.get<any>(`${environment.api_key}/courses`, {
        headers: { Authorization: `bearer ${token}`},
        params: { limit: 100, page: 0 }
    })
    .pipe(map(res => {
        return res.courses;
    })).toPromise().catch(err => {
        throw new Error("Error ao processar!");
    });
}

async CreateCourse(data: any) : Promise<any> {
  const user: any = localStorage.getItem('currentUser');
  const { token } = JSON.parse(user);

  return this.http.post<any>(`${environment.api_key}/courses`, 
  { ...data, subjects:[] }, 
  { headers: { Authorization: `bearer ${token}`} })
  .pipe(map(created => {
      if (created) {
         return created;
      }
  })).toPromise().catch(err => {
      throw new Error('Erro ao criar o curso');
  });
}

async GetCourseById(id: string) : Promise<any> {
  const user: any = localStorage.getItem('currentUser');
  const { token } = JSON.parse(user);
  return this.http.get<any>(`${environment.api_key}/courses/${id}`, {
      headers: { Authorization: `bearer ${token}`},
  })
  .pipe(map(res => {
      return res.course;
  })).toPromise().catch(err => {
      throw new Error("Error ao processar!");
  });
}
}
