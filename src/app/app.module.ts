import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FieldControlErrorComponent } from './shared/field-control-error/field-control-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ListService } from './services/list.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { SignUpComponent } from './signUp/signUp.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ListComponent,
    FieldControlErrorComponent,
    PageNotFoundComponent,
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
    ListService,
    BsModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
