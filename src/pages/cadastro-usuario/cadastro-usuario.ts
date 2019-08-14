import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {
  private orgao;
  private setor;
	public solicitante = {
		orgao_id: 0,
		solicitante_nome: '',
		setor_id: 0
	}
	private optionsOrgao = {
    title: 'Órgãos',
    subtitle: 'Teste'
  }
  private optionsSetor = {
		title: 'Setores da SEPOG',
		subtitle: '',
		mode: 'ios'
	}
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  				public functions: FunctionsProvider) {
  	this.api.getOrgaosExternos().subscribe(res => {
        this.orgao = res;
        console.log(this.orgao)
      });
    this.api.getSetores().subscribe(res => {
        this.setor = res;
        console.log(res)
      }, Error => {
        this.functions.showToastError('Erro ao obter a lista de setores!');
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  adicionarUsuario() {
  	this.api.postUsuario(this.solicitante).subscribe(res => {
  		this.functions.showToastSuccess(this.solicitante.solicitante_nome + " foi cadastrado com sucesso!");
  	});
  }
}
