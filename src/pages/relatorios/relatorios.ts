import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

declare var JSC: any; 
@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  public relatorio;
  public dados;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
    public functions: FunctionsProvider, public loadingCtrl: LoadingController) {
    
}
  gerarRelatorio(tipo) {
    let load = this.loadingCtrl.create({
      content: 'Gerando relatório...'
    }); load.present();
    switch(tipo) {
      case 1: // Interno / Externo
        this.api.getCountTipoEmprestimo().subscribe(res => {
          load.dismiss();
          this.dados = res;
          console.log(res)
          this.relatorio = new JSC.Chart("chartDiv", {
            series: [{ points: this.dados}],
            type: 'pie',
            title_label_text: 'Empréstimos por tipo (Externo / Interno)'
        });
      }, Error => this.functions.showToast('Não foi possível gerar o relatório!')); 
      break;
      case 2: // Por usuário
        this.api.getCountSolicitanteEmprestimo().subscribe(res => {
          load.dismiss();
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
        }, Error => 
          this.functions.showToast('Não foi possível gerar o relatório!')
      );
    }
  }
}
