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
	public solicitante = {
		orgao_id: 0,
		solicitante_nome: '',
		setor_id: null
	}
	private optionsOrgao = {
    title: 'Órgãos externos',
    subtitle: '',
    mode: 'ios'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
  				public functions: FunctionsProvider) {
  	this.api.getOrgaosExternos().subscribe(res => {
        this.orgao = res;
        console.log(this.orgao)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  adicionarUsuario() {
  	this.api.postUsuario(this.solicitante).subscribe(res => {
  		this.functions.showToast(this.solicitante.solicitante_nome + " foi cadastrado com sucesso!");
  	});
  }
}
