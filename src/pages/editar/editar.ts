import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  private data = this.navParams.get('data');
  constructor(public navCtrl: NavController, public navParams: NavParams, public functions: FunctionsProvider) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

}
