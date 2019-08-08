import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitantesPage } from './solicitantes';

@NgModule({
  declarations: [
    SolicitantesPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitantesPage),
  ],
})
export class UsuariosPageModule {}
