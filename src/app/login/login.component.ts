import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: Login = new Login();
  public form: FormGroup = new FormGroup({});

  constructor(
    private Router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(8)]],
    });
  }

  onLogin() {
    this.authService.logIn(this.user);
  }

  onSignUp() {
    this.Router.navigate(['signUp']);
  }

  verifyValidTouched(field: string) {
    return !this.form.get(field)?.valid && !!this.form.get(field)?.touched;
  }

  applyCssError(field: string) {
    return {
      'has-error': this.verifyValidTouched(field),
      'has-feedback': this.verifyValidTouched(field),
    };
  }
}
