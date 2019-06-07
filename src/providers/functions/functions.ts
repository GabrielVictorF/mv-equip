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

  public formataData() { //DD-MMMM-YYYY HH: MM
    var todayTime = new Date();
    var month = this.mesNomes[todayTime.getMonth() + 1];
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var hour = todayTime.getHours();
    var minute = todayTime.getMinutes();
    return day + "-" + month + "-" + year + ' ' + hour + ':' + minute;
  }

  public getTimezone() { //Transform date to Brazil GMT
    let data = new Date();
    data.setHours(data.getHours() - 3);
    return data.toISOString();
  }
}
