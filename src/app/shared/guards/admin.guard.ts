import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('currentUser') === null) {
      this.router.navigate(['acessar']);
    }
    const user: any = localStorage.getItem('currentUser');
    const parsedUser: any = JSON.parse(user);

    return parsedUser.role === 'ADMIN' ? true : false;
  }
}
