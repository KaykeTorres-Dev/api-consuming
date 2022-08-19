import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signUp/signUp.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListResolverGuard } from './guards/list-resolver.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canLoad: [AuthGuard] },

  {
    path: 'signUp',
    component: SignUpComponent,
    canLoad: [AuthGuard],
    resolve: {
      User: ListResolverGuard,
    },
  },

  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'signUp/edit/:id',
    component: SignUpComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      User: ListResolverGuard,
    },
  },

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
