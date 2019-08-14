import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { DetalhePage } from '../detalhe/detalhe';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {
	private setor;
  private orgao;
	private pesquisa = {
		tipo: 'I',
		setor_id: 0,
    orgao_id: 0
	}
	private optionsSetor = {
		title: 'Setores da SEPOG',
		subtitle: '',
		mode: 'ios'
	}
  private optionsOrgao = {
    title: 'Órgãos externos',
    subtitle: '',
    mode: 'ios'
  }
	private resultado;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public api: ApiProvider, public functions: FunctionsProvider) {
    this.api.getAllUsuarios().subscribe(res => {
      this.resultado = res;
      console.log(this.resultado)
    });
    this.api.getOrgaosExternos().subscribe(res => {
        this.orgao = res;
    });
  	this.api.getSetores().subscribe(res => {
  		this.setor = res;
  		console.log(res)
  	}, Error => {
  		this.functions.showToastError('Erro ao obter a lista de setores!');
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariosPage');
  }

  getPesquisa() {
       this.api.getUsuariosExternos(this.pesquisa.orgao_id, this.pesquisa.setor_id).subscribe(res => {
         this.resultado = res;
         console.log(res)
       }, Error => {
       
       });
  	/*this.api.getPesquisaFullUsuario().subscribe(res => {
  		this.resultado = res;	
  		console.log(res)
  	}, Error => console.log(Error));*/
  }

  detalhePage(itemSelecionado) {
    this.navCtrl.push(DetalhePage, {'data': itemSelecionado, 'detalhe': 'solicitante'});
  }
}
