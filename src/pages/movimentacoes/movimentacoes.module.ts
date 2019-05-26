import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovimentacoesPage } from './movimentacoes';

@NgModule({
  declarations: [
    MovimentacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(MovimentacoesPage),
  ],
})
export class MovimentacoesPageModule {}
