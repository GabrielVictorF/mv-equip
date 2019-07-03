import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'solicitante-responsavel-modal.html',
})

export class SolicitanteResponsavelModal {

 constructor(public viewCtrl: ViewController) {

 }

 dismissModal() {  
   this.viewCtrl.dismiss();
 }
}
