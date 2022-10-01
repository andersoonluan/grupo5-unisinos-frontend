import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
  }

async CreateSubject(data: any) : Promise<any> {
  const user: any = localStorage.getItem('currentUser');
  const { token } = JSON.parse(user);

  return this.http.post<any>(`${environment.api_key}/subjects`, 
  { ...data, subjects:[] }, 
  { headers: { Authorization: `bearer ${token}`} })
  .pipe(map(created => {
      if (created) {
         return created;
      }
  })).toPromise().catch(err => {
      throw new Error('Erro ao criar disciplina');
  });
}

async CreateUserSubject(data: any) : Promise<any> {
  const user: any = localStorage.getItem('currentUser');
  const { token } = JSON.parse(user);

  return this.http.post<any>(`${environment.api_key}/subjects/users`, 
  { ...data }, 
  { headers: { Authorization: `bearer ${token}`} })
  .pipe(map(created => {
      if (created) {
         return created;
      }
  })).toPromise().catch(err => {
      throw new Error('Erro ao criar disciplina');
  });
}

async GetSubjects() : Promise<any> {
    const user: any = localStorage.getItem('currentUser');
    const { token } = JSON.parse(user);
    return this.http.get<any>(`${environment.api_key}/subjects`, {
        headers: { Authorization: `bearer ${token}`},
        params: { limit: 100, page: 0 }
    })
    .pipe(map(res => {
        return res.subjects;
    })).toPromise().catch(err => {
        throw new Error("Error ao processar!");
    });
}
}
