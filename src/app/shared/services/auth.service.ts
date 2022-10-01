import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserData, APIUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDataFromApi: any;
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    if (localStorage.getItem('user') !== null) {
      this.userDataFromApi = JSON.parse(localStorage.getItem('user')!);
    }
  }

  SignUpUser(userData: any) {
    console.log(`userData`, userData);
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      passwordConfirmation: userData.passwordConfirmation
    }
    console.log(`MERDAAAA`, data);

    return this.http.post(`${environment.api_key}/auth/signup/student`, { ...data });
  }

  async SignInUser(userData: any): Promise<any> {

    const data = {
      email: userData.email,
      password: userData.password,
    }

    return this.http.post<any>(`${environment.api_key}/auth/signin`, { ...data })
    .pipe(map(user => {
      console.log(`user`, user.data);
        if (user.data.token) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
        return user.data;
    })).toPromise().catch(() => {
        throw new Error('Usuário ou senha invalidos!');
    });    
  }

  async GetLoggedUser() : Promise<any> {
    const user: any = localStorage.getItem('currentUser');
    const { token } = JSON.parse(user);
    return this.http.get<any>(`${environment.api_key}/auth/me`, {
        headers: { Authorization: `bearer ${token}`}
    })
    .pipe(map(res => {
        return res;
    })).toPromise().catch(err => {
        localStorage.removeItem('currentUser');
        location.href = "sign-in";
    });
}

async GetUserById(userId: any = null) : Promise<any> {
  const user: any = localStorage.getItem('currentUser');
  const { token, id } = JSON.parse(user);
  return this.http.get<any>(`${environment.api_key}/users/${userId || id}`, {
      headers: { Authorization: `bearer ${token}`}
  })
  .pipe(map(res => {
      return res;
  })).toPromise().catch(err => {
      throw new Error("Error ao processar!");
  });
}

  SignOutUser() {
    localStorage.removeItem('currentUser');
    this.userDataFromApi = null;
    this.router.navigate(['sign-in']);
  }

  async CreateUser(userData: any): Promise<any> {
    let userType = null;
    if(userData?.type === 'STUDENT'){
      userType = 'student'; 
    }else if(userData?.type === 'TEACHER'){
      userType = 'teacher'; 
    }
    else {
      userType = '/admin'; 
    }
    delete userData.type;
    return this.http.post<any>(`${environment.api_key}/auth/signup/${userType}`, { ...userData })
    .pipe(map(user => {
      console.log(`user`, user.data);
         console.log(`user`, user);
        return user.data;
    })).toPromise().catch(() => {
        throw new Error('Erro ao cadastrar o usuário!');
    });    
  }

  async GetAllUsers() : Promise<any> {
    const user: any = localStorage.getItem('currentUser');
    const { token } = JSON.parse(user);
    return this.http.get<any>(`${environment.api_key}/users`, {
        headers: { Authorization: `bearer ${token}`},
        params: { limit: 100, page: 0 }
    })
    .pipe(map(res => {
        return res.found.users;
    })).toPromise().catch(err => {
        throw new Error("Error ao processar!");
    });
}
}
