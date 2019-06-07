import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { NovoEquipamentoPage } from '../novo-equipamento/novo-equipamento';
import { DetalhePage } from '../detalhe/detalhe';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

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
  private equipamentos;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public api: ApiProvider, public functions: FunctionsProvider) {
  		this.getEquipamentos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipamentosPage');
  }

  private getEquipamentos() {
  	this.api.getAllEquipamentos().subscribe(res =>
      this.equipamentos = res,
    );
  }

  pesquisa(ev: any) { //Campo de pesquisa de equipamentos
  	let val = ev.target.value;
  	if (val && val.trim() != '') {
	  	this.api.getPesquisaEquipamento(val).subscribe((res: any) => { //!MODEL
	  		this.equipamentos = res;
	  	}, Error => {
        this.functions.showToast("Erro ao obter equipamentos, favor tentar novamente!");
      });
  	} else {
  		this.equipamentos = null;
  	}
	}

  pageNovoEquipamento() {
  	this.navCtrl.push(NovoEquipamentoPage);
  }

  pageDetalhe(equipamento) {
    this.navCtrl.push(DetalhePage, {'equipamentoSelecionado': equipamento});
  }
}
