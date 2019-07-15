import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';

/**
 * Generated class for the DetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
})
export class DetalhePage {
  private detalhe = this.navParams.get('detalhe');
  public data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  putEmprestimo() {
    this.navCtrl.push(NovaMovimentacaoPage, {'data': this.data, 'acao': 'edit'})
  }
}
