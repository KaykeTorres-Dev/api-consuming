import { catchError, of, Subject } from 'rxjs';
import { User } from './user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../services/list.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  selectedUser!: User;

  filter = new FormControl();

  readonly Search = 'https://gorest.co.in/public/v2/users';

  results!: Observable<any>;

  total!: number;

  users$!: Observable<User[]>;

  error$ = new Subject<Boolean>();

  constructor(
    private service: ListService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onNewUser() {
    this.router.navigate(['signUp']);
  }

  onRefresh() {
    this.users$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );
  }

  onEdit(id: User) {
    this.router.navigate(['signUp/edit', id]);
  }

  onDelete(user: User) {
    this.selectedUser = user;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.service.remove(this.selectedUser.id).subscribe(
      () => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      () => alert('Erro ao excluir usuário')
    );
  }

  onRefuseDelete() {
    this.deleteModalRef.hide();
  }

  // onSearch(){
  //   console.log(this.filtro.value);

  //   this.resultados = this.http.get(this.Pesquisar)
  //   .pipe(
  //     tap((res: any) => this.total = res.total),
  //     map((res: any) => res.resultados)
  //   );
  // }
}
