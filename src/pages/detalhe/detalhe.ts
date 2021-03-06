import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController, AlertController } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';
import { EditarPage } from '../editar/editar';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

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
          if(this.detalhe == 'emprestimo')
            this.putEmprestimo();
          else
            this.putSolicitante();
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
                if (this.detalhe == 'emprestimo') {
                  this.api.deleteEmprestimo(this.data.emprestimo_id).subscribe(res => {
                    this.events.publish('emprestimoExcluido');
                    this.navCtrl.pop();
                    this.functions.showToastSuccess('Empréstimo excluído');
                  }, Error => {
                    this.functions.showToastError('Erro ao excluir empréstimo!');
                  });
                }
                else if (this.detalhe == 'solicitante') {
                  this.api.deleteSolicitante(this.data.solicitante_id).subscribe(res => {
                    this.events.publish('solicitanteExcluido');
                    this.navCtrl.pop();
                    this.functions.showToastSuccess('Solicitante excluído');
                  }, Error => {
                    this.functions.showToastError('Erro ao excluir solicitante!');
                  });
                }      
              }
              },
              {
                text: "Não",
              }]
          });
          alert.present();
        }
      },
    ]
    });
    if (this.detalhe == "emprestimo") { // Caso seja emprestimo, adiciona o objeto de finalização de empréstimo
      let finaliza = {
        text: 'Finalizar empréstimo',
        icon: 'checkbox-outline',
        handler: () => {
          let hoje = {
            data_devolucao: new Date().toISOString()
          };
          this.api.putFinalizaEmprestimo(this.data.emprestimo_id, hoje).subscribe(res => {
            //this.data.data_devolucao_format = hoje.data_devolucao.substring(0,10);
            this.data.data_devolucao_format = this.functions.formataData(hoje)
            console.log(this.data.data_devolucao_format)
            this.functions.showToastSuccess("Equipamento recebido hoje!");
            this.events.publish('emprestimoExcluido'); //Evento de modificação no empréstimo
          }, Error => {
            this.functions.showToastError("Erro ao atualizar empréstimo");
          });
        }
      };
      action.data.buttons.push(finaliza);
    }
    console.log(action)
    action.present();
  }

  putSolicitante() {
    this.navCtrl.push(EditarPage, {'data': this.data, 'tipo': 'solicitante'});
  }
}
