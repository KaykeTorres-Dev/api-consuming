

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from "../lista/usuario";
import { delay, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ListaService {

private readonly API = `${environment.API}`;

constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Usuario[]>(this.API);
    }

    loadByID(id: Usuario){
        return this.http.get<Usuario>(`${this.API}/${id}`);
    }

    cadastrar(user: Usuario){
        return this.http.post(this.API, user);
        
    }

    atualizar(usuario: Usuario){
        return this.http.put(`${this.API}/${usuario.id}`, usuario);
    }

    salvar(usuario: Usuario){
        if (usuario.id){
            return this.atualizar(usuario);
        }else{

            return this.cadastrar(usuario);
        }
        
    }

    remover(id: Usuario){
        return this.http.delete(`${this.API}/${id}`);
        
    }

}