import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaMovimentacaoPage } from './nova-movimentacao';

@NgModule({
  declarations: [
    NovaMovimentacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaMovimentacaoPage),
  ],
})
export class NovaMovimentacaoPageModule {}
