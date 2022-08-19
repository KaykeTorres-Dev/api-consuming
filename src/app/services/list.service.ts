import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../list/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(this.API);
  }

  loadByID(id: User) {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  signIn(user: User) {
    return this.http.post(this.API, user);
  }

  update(user: User) {
    return this.http.put(`${this.API}/${user.id}`, user);
  }

  save(user: User) {
    if (user.id) {
      return this.update(user);
    } else {
      return this.signIn(user);
    }
  }

  remove(id: User) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
