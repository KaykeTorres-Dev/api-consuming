import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService){

  }

  ngOnInit(){
    this.authService.mostrarMenuEmiiter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
