import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './guards/auth.guard';
import { ListaService } from './services/lista.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    ListaComponent,
    CampoControlErroComponent,
    PaginaNaoEncontradaComponent,
    AlertModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    AuthGuard,
    ListaService,
    BsModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
