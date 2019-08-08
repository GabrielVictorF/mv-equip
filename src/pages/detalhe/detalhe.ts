import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, AlertController } from 'ionic-angular';

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
              public api: ApiProvider, public functions: FunctionsProvider, public events: Events,
              public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
  }

  putEmprestimo() {
    this.navCtrl.push(NovaMovimentacaoPage, {'data': this.data, 'acao': 'edit'})
  }

  deletarEquip() {
    this.api.deleteEquipamento(this.data.equipamento_id).subscribe((res: any) => {
      if (res.rows_affected == 0)
        this.functions.showToastError('Erro ao deletar equipamento!')
      else {
        this.functions.showToastSuccess('Equipamento deletado!')
        this.navCtrl.pop();
        this.events.publish('deleteEquip')
      }
    },
      Error => {
        this.functions.showToastError('Erro ao deletar equipamento!')
      })
  }

  actionSheet() {
    const action = this.actionSheetCtrl.create({
      title: "Selecione a operação",
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.putEmprestimo();
        }
      },
      {
        text: 'Excluir',
        icon: 'trash',
        handler: () => {
          const alert = this.alertCtrl.create({
            title: "Um momento",
            message: "Tem certeza que deseja excluir este registro?",
            buttons:[{
              text: "Sim",
              handler: () => {
                  this.api.deleteEmprestimo(this.data.emprestimo_id).subscribe(res => {
                    this.events.publish('emprestimoExcluido');
                    this.navCtrl.pop();
                    this.functions.showToastSuccess('Empréstimo excluído');
                  }, Error => {
                    this.functions.showToastError('Erro ao excluir empréstimo!');
                  })
              }
              },
              {
                text: "Não",
              }]
          });
          alert.present();
        }
      }]
    });
    action.present();
  }
}
