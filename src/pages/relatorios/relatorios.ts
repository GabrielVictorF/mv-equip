import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
import { ExpressProvider } from '../../providers/express/express';


declare var JSC: any; // Diz ao IONIC que o JSC será utilizado 
@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  public relatorio;
  public dados;
  public load = this.loadingCtrl.create({
    content: 'Gerando relatório...'
  }); //loadingController

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,
    public functions: FunctionsProvider, public loadingCtrl: LoadingController, public express: ExpressProvider) {    
}
  gerarRelatorio(tipo) {
    //this.load.present();
    switch(tipo) {
      case 1: // Interno / Externo
        this.api.getCountTipoEmprestimo().subscribe(res => {
          this.load.dismiss();
          this.dados = res;
          console.log(res)
          this.relatorio = new JSC.Chart("chartDiv", {
            series: [{ 
              name: 'Empréstimos por tipo',
              points: this.dados
            }],
            type: 'pie',
            title_label_text: 'Empréstimos por tipo (Externo / Interno)'
        });
      }, Error => {
        this.load.dismiss();
        this.functions.showToastError('Não foi possível gerar o relatório!')
    }); 
      break;
      case 2: // Por usuário
        this.api.getCountSolicitanteEmprestimo().subscribe(res => {
          this.load.dismiss();
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
        }, Error => {
          this.load.dismiss();
          this.functions.showToastError('Não foi possível gerar o relatório!')
        });
        break;
      case 3:
        this.express.getReq().subscribe(res => {
          var chart = new JSC.Chart("targetDiv", {
            type: "calendar month",
            data: res
          });
        });
        break;
      case 4:
        this.gerarCsv();
        break;
    }
  }

  gerarCsv() {
    let itemsNotFormatted;
    this.api.getCountEmprestimos().subscribe(res => {
      itemsNotFormatted = res;
      download()
    });
    function convertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
  
      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','
  
              line += array[i][index];
          }
  
          str += line + '\r\n';
      }
  
      return str;
  }
  
  function exportCSVFile(headers, items, fileTitle) {
      // Convert Object to JSON
      var jsonObject = JSON.stringify(items);
  
      var csv = convertToCSV(jsonObject);
  
      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
  
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              console.log(url)
              link.setAttribute("href", url);
              link.setAttribute("download", exportedFilenmae);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }
  
  function download(){
    console.log('download')
    var headers = {
        data_emprestimo: ''.replace(/,/g, ''), // remove commas to avoid errors
        qtd: ""
    };
    
    var itemsFormatted = [];
  
    // format the data
    itemsNotFormatted.forEach((item) => {
        itemsFormatted.push({
            data_emprestimo: item.data_emprestimo.replace(/,/g, ''), // remove commas to avoid errors,
            qtd: item.qtd
        });
    });
  
    var fileTitle = 'Relatório'; // or 'my-unique-title'
  
    exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    //headers para adicionar título da coluna
  }
  }
}
