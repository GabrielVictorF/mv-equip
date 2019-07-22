import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

/**
 * Generated class for the CadastroEquipamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-equipamento',
  templateUrl: 'cadastro-equipamento.html',
})
export class CadastroEquipamentoPage {

  private equipamento = {
    equipamento_descricao: '',
    equipamento_tomb: '',
  }
  private statusNewEquip = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
            public functions: FunctionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroEquipamentoPage');
  }

  cadastrar() {
    this.statusNewEquip = 'spinner-border spinner-border-sm';
    this.api.postEquipamento(this.equipamento).subscribe(res => {
      this.statusNewEquip = '',
      this.functions.showToast('Equipamento cadastrado com sucesso!')
    }, Error => {
      this.statusNewEquip = '',
      this.functions.showToast('Não foi possível cadastrar o equipamento!')
    })  ;
  }

}
