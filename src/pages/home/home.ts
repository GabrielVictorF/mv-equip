import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';
import { MovimentacoesPage } from '../movimentacoes/movimentacoes';
import { EquipamentosPage } from '../equipamentos/equipamentos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pageNovaMovimentacao() {
  	this.navCtrl.push(NovaMovimentacaoPage);
  }

  pageMovimentacoes() {
  	this.navCtrl.push(MovimentacoesPage);
  }

  pageEquipamentos() {
  	this.navCtrl.push(EquipamentosPage);
  }
}
