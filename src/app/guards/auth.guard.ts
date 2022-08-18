import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(
    private authService: AuthService,
    private router: Router
  ) { }

    private verificarAcesso(){
    if (this.authService.usuarioEstaAutenticado()){
      return true;
    } 

    this.router.navigate(['/home']);

    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log('AuthGuard');
      return this.verificarAcesso();
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
      console.log('canLoad: verificando se o usuário pode carregar o código do módulo');

      return this.verificarAcesso();
    }

}