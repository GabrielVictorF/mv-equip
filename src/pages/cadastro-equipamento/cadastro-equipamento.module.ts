import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroEquipamentoPage } from './cadastro-equipamento';

@NgModule({
  declarations: [
    CadastroEquipamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroEquipamentoPage),
  ],
})
export class CadastroEquipamentoPageModule {}
