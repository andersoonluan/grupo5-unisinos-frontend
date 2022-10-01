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
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  
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
    this.googleAuthSDK();
  }
  signinUser() {
    this.auth.SignInUser(this.signinForm.value).then(logged => {
      location.href = '/dashboard';
    }).catch(() => {
      this.snackbar.open('Usuário ou senha inválidos!', 'Fechar');
    })
  }

  loginWithGoogle() {
    
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: 'YOUR CLIENT ID',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}
