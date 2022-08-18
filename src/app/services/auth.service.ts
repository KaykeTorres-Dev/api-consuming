import { FormGroup } from '@angular/forms';
import { Login } from '../home/login';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmiiter = new EventEmitter<boolean>();

  constructor(
    private router: Router) { }

  fazerLogin(login: Login){
    if (login.email === 'usuario@email.com' && login.senha === '123456') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmiiter.emit(true);

      this.router.navigate(['lista']);


    }else{
      
      this.usuarioAutenticado = false;

      alert('Email ou senha incorretos!!!');

      this.mostrarMenuEmiiter.emit(false);
    }
  }


  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}



