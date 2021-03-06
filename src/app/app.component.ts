import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pages: { url: string, direction: string, icon: string, text: string }[];
  user: firebase.User;

  constructor(
    private _authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      { url: '/tasks', direction: 'back', icon: 'checkmark', text: 'Tarefas' },
      { url: '/tasks/create', direction: 'forward', icon: 'add', text: 'Nova Tarefa' }
    ];

    this._authService.authState$.subscribe(user => (this.user = user))

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
