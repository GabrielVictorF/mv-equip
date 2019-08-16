import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

import { EditarPage } from '../editar/editar';
import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';
import { DetalhePage } from '../detalhe/detalhe';

@IonicPage()
@Component({
  selector: 'page-movimentacoes',
  templateUrl: 'movimentacoes.html',
})
export class MovimentacoesPage {
  private emprestimos;
  public load;
  public totalEmprestimos;
  private cores = ["dark", "light"];

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public api: ApiProvider, public events: Events, public functions: FunctionsProvider,
        public loading: LoadingController, public alertCtrl: AlertController) {
          this.countTabela();
          this.events.subscribe('emprestimoExcluido', () => {
            this.getEmprestimos(),
            this.countTabela();
        }
      ); 
      this.getEmprestimos();      
  }

  countTabela() {
    this.api.countTabela('emprestimo', 'emprestimo_id').subscribe(res => {
      this.totalEmprestimos = res;
    });
  }

  getEmprestimos(refreshEvent?) {
    this.load = this.loading.create({
      content: 'Obtendo empréstimos...'
    }); this.load.present();
    if (refreshEvent)
    refreshEvent.complete();
    this.api.getEmpMovimentacoesPage().subscribe(res => {
      this.emprestimos = res, 
      console.log(res)
      this.load.dismiss()
    }, Error => {
      if (refreshEvent)
      refreshEvent.complete();
      this.load.dismiss();
      this.functions.showToastError('Erro ao obter os empréstimos...');
    });
  }

  editarPage(itemSelecionado) {
    this.navCtrl.push(DetalhePage, {'data': itemSelecionado, 'detalhe': 'emprestimo'});
  }
}
