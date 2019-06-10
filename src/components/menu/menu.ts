import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

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

  constructor(public app: App) {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
  }

  pageLogin() {
    this.app.getRootNavs()[0].setRoot(LoginPage)
  }
}
