import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public api: ApiProvider, public events: Events, public functions: FunctionsProvider,
        public loading: LoadingController) {
          this.events.subscribe('emprestimoExcluido', () => this.getEmprestimos());
          this.getEmprestimos();          
  }

  getEmprestimos() {
    this.load = this.loading.create({
      content: 'Obtendo empréstimos...'
    }); this.load.present();
    this.api.getEmpMovimentacoesPage().subscribe(res => {this.emprestimos = res, this.load.dismiss()});
  }

  editarPage(itemSelecionado) {
    this.navCtrl.push(DetalhePage, {'data': itemSelecionado, 'detalhe': 'emprestimo'});
  }
}
