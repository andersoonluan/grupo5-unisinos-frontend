import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Grupo 5 - Unisinos';
  userLoggedIn = false;
  public logged: any = null;

  constructor(
    public authService: AuthService,
  ) {
    this.authService.GetLoggedUser().then(logged => {
      this.logged = logged;
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.href = "/acessar";
  }
}
