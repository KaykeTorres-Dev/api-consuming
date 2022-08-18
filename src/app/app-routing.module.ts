import { Usuario } from './lista/usuario';
import { ListaComponent } from './lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListaResolverGuard } from './guards/lista-resolver.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
    canLoad: [AuthGuard]
  },

  { path: 'cadastro', component: CadastroComponent,
    canLoad: [AuthGuard],
    resolve:{
      Usuario: ListaResolverGuard
    }
},

  { path: 'lista', component: ListaComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
},

{ path: 'cadastro/editar/:id', component: CadastroComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve:{
      Usuario: ListaResolverGuard
    }
},

  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: '**', component: PaginaNaoEncontradaComponent,
    canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
