import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../list/user';
import { ListService } from '../services/list.service';

@Injectable({
  providedIn: 'root',
})
export class ListResolverGuard implements Resolve<User> {
  constructor(private service: ListService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<any> | Promise<User> {
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
