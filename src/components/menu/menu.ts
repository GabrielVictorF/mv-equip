import { Component } from '@angular/core';
import { NavController, App, Events } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;
  menuDesativado: boolean = true;

  constructor(public app: App, public events: Events) {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
    this.events.subscribe('disableMenu', () => {
      this.menuDesativado = !this.menuDesativado
      console.log(this.menuDesativado);
    })
  }

  pageLogin() {
    localStorage.removeItem('token')
    this.app.getRootNavs()[0].setRoot(LoginPage)
  }
}
