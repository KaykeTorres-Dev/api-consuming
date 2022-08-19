import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterEvent,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../lista/usuario';
import { ListaService } from '../services/lista.service';

@Injectable({
  providedIn: 'root',
})
export class ListaResolverGuard implements Resolve<Usuario> {
  constructor(private service: ListaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Usuario | Observable<any> | Promise<Usuario> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      name: null,
      email: null,
      gender: null,
      status: null,
    });
  }
}
