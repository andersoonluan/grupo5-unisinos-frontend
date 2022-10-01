import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hidePass = true;
  hideCpass = true;
  passwordMatch = true;

  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    acceptTerms: new FormControl(true, [Validators.required]),
  });

  get password() {
    return this.signupForm.get('password');
  }
  get passwordConfirmation() {
    return this.signupForm.get('passwordConfirmation');
  }

  constructor(
    public snackbar: MatSnackBar,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.passwordsMatch();
    this.showSnackbarOnError();
  }

  signupUser() {
    if (
      this.signupForm.get('password')?.value ===
      this.signupForm.get('passwordConfirmation')?.value
    ) {
      
    } else {
      this.passwordMatch = false;
    }
  }

  passwordsMatch() {
    this.passwordConfirmation?.valueChanges.subscribe((val) => {
      if (val !== this.password?.value) {
        this.passwordMatch = false;
      } else {
        this.passwordMatch = true;
      }
    });
  }

  showSnackbarOnError() {
 
  }
}
