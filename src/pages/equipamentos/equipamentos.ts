import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import { NovoEquipamentoPage } from '../novo-equipamento/novo-equipamento';
import { DetalhePage } from '../detalhe/detalhe';

import { Equipamento } from '../../models/equipamento';
/**
 * Generated class for the EquipamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipamentos',
  templateUrl: 'equipamentos.html',
})
export class EquipamentosPage {
  private equipamentos: Equipamento;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public api: ApiProvider) {
  		this.getEquipamentos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipamentosPage');
  }

  private getEquipamentos() {
  	this.api.getAllEquipamentos().subscribe((res: Equipamento) => 
      this.equipamentos = res,
    );
  }

  pageNovoEquipamento() {
  	this.navCtrl.push(NovoEquipamentoPage);
  }

  pageDetalhe(equipamento: Equipamento) {
    this.navCtrl.push(DetalhePage, {'equipamentoSelecionado': equipamento});
  }
}