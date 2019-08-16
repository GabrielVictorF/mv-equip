import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import { NovaMovimentacaoPage } from '../nova-movimentacao/nova-movimentacao';
import { MovimentacoesPage } from '../movimentacoes/movimentacoes';
import { EquipamentosPage } from '../equipamentos/equipamentos';
import { UsuariosPage } from '../usuarios/usuarios';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { RelatoriosPage } from '../relatorios/relatorios';
import { CadastroEquipamentoPage } from '../cadastro-equipamento/cadastro-equipamento';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

declare var $: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private modal;
  private relatorio;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public api: ApiProvider, public functions: FunctionsProvider) {
    //this.iniciaModal();
   // this.functions.aasashasasaa();
    //this.functions.showToastError('ERRRRRROO')
}  

  pageNovaMovimentacao() {
  	this.navCtrl.push(NovaMovimentacaoPage);
  }

  iniciaModal() {
   this.modal = this.modalCtrl.create(Profile);
   this.modal.present();
 }

 teste() { // Teste do relatório de erro ao Sentry
   this.api.getSetores().subscribe(() => {

   }, Error => {
     this.functions.showToastError('ERRRRRROO')
   })
 }


  pageMovimentacoes() {
  	this.navCtrl.push(MovimentacoesPage);
  }

  pageEquipamentos() {
  	this.navCtrl.push(EquipamentosPage);
  }

  pageUsuarios() {
    this.navCtrl.push(UsuariosPage);
  }

  pageNovoUsuario() {
    this.navCtrl.push(CadastroUsuarioPage);
  }

  pageRelatorios() {
    this.navCtrl.push(RelatoriosPage);
  }

  pageNovoEquipamento() {
    this.navCtrl.push(CadastroEquipamentoPage);
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
