import { ActivatedRoute, Route } from '@angular/router';
import { catchError, empty, map, of, Subject, switchMap, tap } from 'rxjs';
import { Usuario } from './usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  
  deletarModalRef!: BsModalRef;
  @ViewChild('deletarModal', { static: true }) deletarModal: any;

  usuarioSelecionado!: Usuario;

  filtro = new FormControl();

  readonly Pesquisar = 'https://gorest.co.in/public/v2/users';

  resultados!: Observable<any>;
  
  total!: number;

  usuarios$!: Observable<Usuario[]>;

  erro$ = new Subject<Boolean>();


  constructor(
    private service: ListaService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.onRefresh();

  }

  onUsuario(){
    this.router.navigate(['cadastro']);
  }

  onRefresh(){
    this.usuarios$ = this.service.listar()
    .pipe(
      catchError(error => {
        console.error(error);
        this.erro$.next(true);
        return of ();

      })
    );

    }

  onEditar(id: Usuario){
    this.router.navigate(['cadastro/editar', id]);
  }

  onDeletar(usuario: Usuario){
    this.usuarioSelecionado = usuario;
    this.deletarModalRef = this.modalService.show(this.deletarModal, {class: 'modal-sm'});
  }

  onConfirmarDeletar(){
    this.service.remover(this.usuarioSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deletarModalRef.hide();
      },
      (error: any) => alert('Erro ao excluir usuário'),
      
    )

  }

  onRecusarDeletar(){
    this.deletarModalRef.hide();
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
