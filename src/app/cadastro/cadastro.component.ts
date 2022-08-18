import { Usuario } from './../lista/usuario';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ListaService } from '../services/lista.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  generos = [ '', 'Male', 'Female'];
  status = ['', 'Active', 'Inactive'];
  usuario: Usuario[] = [];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private service: ListaService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const usuario = this.route.snapshot.data['Usuario'];

    this.formulario = this.formBuilder.group({
      id: [usuario.id],
      name: [usuario.name, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: [usuario.email, [Validators.required, Validators.email]],
      gender: [usuario.gender, Validators.required],
      status: [usuario.status, Validators.required]
    });

}

onSubmit() {

  this.submitted = true;
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      console.log('submit')
    
  
    if (this.formulario.value.id) {
        
        this.service.atualizar(this.formulario.value).subscribe(
          success => {
            alert('Usuário atualizado com sucesso!');
            this.router.navigate(['lista']);
          },
          error => alert('Erro ao atualizar usuário, tente novamente!'),
        );

      } else {

        this.service.cadastrar(this.formulario.value).subscribe(
          success => {
            alert('Usuário cadastrado com sucesso!');
            this.router.navigate(['lista']);
          },
          error => alert('Erro ao cadastrar usuário, tente novamente!')
        );
      } 

    }

  }

  onCancel(){
    this.router.navigate(['lista']);
  }

    verificaValidTouched(campo: string){
    return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)

    }

  }

}