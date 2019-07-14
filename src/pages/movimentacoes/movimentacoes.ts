import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import { EditarPage } from '../editar/editar';

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
  private emprestimos;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public api: ApiProvider) {
          this.api.getEmpMovimentacoesPage().subscribe(res => {this.emprestimos = res});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovimentacoesPage');
  }

  editarPage(itemSelecionado) {
    this.navCtrl.push(EditarPage, {'data': itemSelecionado});
  }
}
