import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, App } from 'ionic-angular';

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
  private statusLoadingEquip = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public api: ApiProvider, public functions: FunctionsProvider,
        public loadingCtrl: LoadingController, public events: Events,
        public app: App) {
      this.getEquipamentos();
      this.events.subscribe('deleteEquip', () => this.getEquipamentos());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipamentosPage');
  }

  private getEquipamentos() {
    let load = this.loadingCtrl.create({
      content: 'Obtendo equipamentos...'
    }); load.present();
  	this.api.getAllEquipamentos().subscribe(res => {
      this.equipamentos = res;
      load.dismiss();
    }, Error => {
      this.functions.showToastError('Erro ao obter equipamentos!');
      load.dismiss();
    });
  }

  pesquisa(ev: any) { //Campo de pesquisa de equipamentos
    this.statusLoadingEquip = 1;
  	let val = ev.target.value;
  	if (val && val.trim() != '') {
	  	this.api.getPesquisaEquipamento(val).subscribe((res: any) => { //!MODEL
        this.equipamentos = res;
        if (res.length > 0) {
          console.log("RES > 0")
          this.statusLoadingEquip = 0;
        } else { 
          console.log("RES < 0")
          this.statusLoadingEquip = 2;
        }
	  	}, Error => {
         this.statusLoadingEquip = 2;
        this.functions.showToastError("Erro ao obter equipamentos, favor tentar novamente!");
      });
  	} else {
      console.log("CAMPO ZERADO")
      this.statusLoadingEquip = 2;
  		this.equipamentos = null;
  	}
	}

  pageNovoEquipamento() {
  	this.navCtrl.push(NovoEquipamentoPage);
  }

  pageDetalhe(equipamento) {
    this.navCtrl.push(DetalhePage, {'data': equipamento,'detalhe': 'equipamento'});
  }
}
