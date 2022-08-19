import { Login } from '../login/login';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  logIn(login: Login) {
    if (login.email === 'usuario@email.com' && login.password === '123456') {
      this.userAuthenticated = true;

      this.showMenuEmitter.emit(true);

      this.router.navigate(['list']);
    } else {
      this.userAuthenticated = false;

      alert('Email ou senha incorretos!!!');

      this.showMenuEmitter.emit(false);
    }
  }

  userIsAuthenticated() {
    return this.userAuthenticated;
  }
}
