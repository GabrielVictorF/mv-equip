import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

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
  private detalhe = this.navParams.get('detalhe');
  public data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api: ApiProvider, public functions: FunctionsProvider, public events: Events) {
  }

  putEmprestimo() {
    this.navCtrl.push(NovaMovimentacaoPage, {'data': this.data, 'acao': 'edit'})
  }

  deletarEquip() {
    this.api.deleteEquipamento(this.data.equipamento_id).subscribe(res => {
      if (res.rows_affected == 0)
        this.functions.showToast('Erro ao deletar equipamento!')
      else {
        this.functions.showToast('Equipamento deletado!')
        this.navCtrl.pop();
        this.events.publish('deleteEquip')
      }
    },
      Error => {
        this.functions.showToast('Erro ao deletar equipamento!')
      })
  }
}
