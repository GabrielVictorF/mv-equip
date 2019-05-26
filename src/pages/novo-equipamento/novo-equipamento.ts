import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { Equipamento } from '../../models/equipamento';
/**
 * Generated class for the NovoEquipamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-equipamento',
  templateUrl: 'novo-equipamento.html',
})
export class NovoEquipamentoPage {

	private equipamento: Equipamento = new Equipamento;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public api: ApiProvider, private functionsPro: FunctionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoEquipamentoPage');
  }

  postEquipamento() {
  	this.api.postEquipamento(this.equipamento).subscribe((res: Equipamento) =>
      this.functionsPro.showToast('Equipamento cadastrado com sucesso!')
    );
  }
}
