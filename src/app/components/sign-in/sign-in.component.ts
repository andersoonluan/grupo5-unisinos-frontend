import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  hide = true;
  
  signinForm = new FormGroup({
    email: new FormControl(' ', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }
  signinUser() {
    this.auth.SignInUser(this.signinForm.value).then(logged => {
      location.href = '/dashboard';
    }).catch(() => {
      this.snackbar.open('Usuário ou senha inválidos!', 'Fechar');
    })
  }

  async loginWithGoogle() {
    const user:any = await this.auth.GoogleAuth();
    this.auth.SignInWithGoogleUser({
      email: user.email,
      name: user.name || `${user.given_name} ${user.family_name}`,
      password: user.id
    }).then(data => {
      location.href = '/dashboard';
    }).catch(() => {
      this.snackbar.open('Usuário ou senha inválidos!', 'Fechar');
    }) 
  }
}
