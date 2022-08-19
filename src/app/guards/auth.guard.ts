import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  private verifyAccess() {
    if (this.authService.userIsAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('AuthGuard');
    return this.verifyAccess();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log(
      'canLoad: verificando se o usuário pode carregar o código do módulo'
    );

    return this.verifyAccess();
  }
}
