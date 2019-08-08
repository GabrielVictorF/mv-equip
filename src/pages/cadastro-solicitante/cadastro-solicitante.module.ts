import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroSolicitantePage } from './cadastro-solicitante';

@NgModule({
  declarations: [
    CadastroSolicitantePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroSolicitantePage),
  ],
})
export class CadastroUsuarioPageModule {}
