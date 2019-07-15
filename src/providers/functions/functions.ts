//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the FunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FunctionsProvider {
  public mesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
                      'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                      'Outubro', 'Novembro', 'Dezembro'];
  public mesShort = ['Jan, Fev, Mar, Maio, Jun, Jul, Ago, Set, Out, Nov, Dez'];
  constructor(public toastCtrl: ToastController) {
    console.log('Hello FunctionsProvider Provider');
  }

  public showToast(message: string) {
  	let toast = this.toastCtrl.create({
  		message: message,
  		duration: 2000
  	}); toast.present();
  }

  public formataData(data) { //YYYY-MM-DD
    var date = new Date(data);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }

  public getTimezone() { //Transform date to Brazil GMT
    let data = new Date();
    data.setHours(data.getHours() - 3);
    return data.toISOString();
  }
}
