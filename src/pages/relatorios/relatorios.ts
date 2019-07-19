import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the RelatoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var JSC: any; 
@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  public relatorio;
  public dados;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    
}
  gerarRelatorio(tipo) {
    switch(tipo) {
      case 1:
        this.api.getCountTipoEmprestimo().subscribe(res => {
          this.dados = res;
          console.log(res)
          this.relatorio = new JSC.Chart("chartDiv", {
            series: [{ points: this.dados}],
            type: 'pie',
            title_label_text: 'Empréstimos por tipo (Externo / Interno)'
        });
      }); 
      break;
      case 2:
        this.api.getCountSolicitanteEmprestimo().subscribe(res => {
          this.dados = res;
          console.log(this.dados)
           this.relatorio = new JSC.Chart("chartDiv", {
            series: [{
              name: 'Empréstimo por usuário',
              points: this.dados
            }],
            type: 'pie',
            title_label_text: 'Empréstimos por Usuário'
          })
        });
    }
  }
}
