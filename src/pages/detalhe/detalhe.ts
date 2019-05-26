import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Equipamento } from '../../models/equipamento';
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
	private equipamento: Equipamento = this.navParams.get('equipamentoSelecionado');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log(this.equipamento);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhePage');
  }

}
