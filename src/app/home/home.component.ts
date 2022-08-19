import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Login } from './login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public usuario: Login = new Login();
  public formulario: FormGroup = new FormGroup({});

  constructor(
    private Router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.maxLength(8)]],
    });
  }

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }

  fazerCadastro() {
    this.Router.navigate(['cadastro']);
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid &&
      !!this.formulario.get(campo)?.touched
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }
}
