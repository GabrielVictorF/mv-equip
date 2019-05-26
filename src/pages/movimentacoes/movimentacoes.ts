import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MovimentacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movimentacoes',
  templateUrl: 'movimentacoes.html',
})
export class MovimentacoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovimentacoesPage');
  }
}
