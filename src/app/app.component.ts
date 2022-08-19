import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'challenge';

  showMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.showMenuEmitter.subscribe(
      (show) => (this.showMenu = show)
    );
  }
}
