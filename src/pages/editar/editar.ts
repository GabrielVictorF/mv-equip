import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { FunctionsProvider } from '../../providers/functions/functions';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
  private data = this.navParams.get('data');
  constructor(public navCtrl: NavController, public navParams: NavParams, public functions: FunctionsProvider,
              public api: ApiProvider, public events: Events) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

  excluirEmprestimo() {
    this.api.deleteEmprestimo(this.data.emprestimo_id).subscribe(res => {
      this.events.publish('emprestimoExcluido');
      this.navCtrl.pop();
      this.functions.showToast('Empréstimo excluído');
    }, Error => {
      this.functions.showToast
    })
  }
}
