import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';
import { MovimentacoesPage } from '../movimentacoes/movimentacoes';
import { EquipamentosPage } from '../equipamentos/equipamentos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private modal;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.iniciaModal();
  }

  pageNovaMovimentacao() {
  	this.navCtrl.push(NovaMovimentacaoPage);
  }

  iniciaModal() {
   this.modal = this.modalCtrl.create(Profile);
   this.modal.present();
 }


  pageMovimentacoes() {
  	this.navCtrl.push(MovimentacoesPage);
  }

  pageEquipamentos() {
  	this.navCtrl.push(EquipamentosPage);
  }
}

@Component({
  templateUrl: 'modal.html'
})
export class Profile {

 constructor(public viewCtrl: ViewController) {

 }

 dismissModal() {
   this.viewCtrl.dismiss();
 }
}
