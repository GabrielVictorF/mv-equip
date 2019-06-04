import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the NovaMovimentacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nova-movimentacao',
  templateUrl: 'nova-movimentacao.html',
})
export class NovaMovimentacaoPage {
	public emprestimo = {
    emprestimo_id: null,
    equipamento_id: [],
  	data_emprestimo: '',
  	data_devolucao: '',
  	observacao: '',
  	usuario_id: null,
  	tipo_emprestimo: 'I'
  }
	private equipamentos = []; //Searchbar
  private usuarios = []; //Searchbar
	private equipamentos_selecionados = []; //Selecionados para movimentação

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  	console.log(this.emprestimo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaMovimentacaoPage');
  }

  pesquisa(ev: any) {
  	let val = ev.target.value;
  	if (val && val.trim() != '') {
	  	this.api.getPesquisaEquipamento(val).subscribe((res: any) => { //!MODEL
	  		this.equipamentos = res;
	  	});
  	} else {
  		this.equipamentos = null;
  	}
	}

  pesquisaUsuario(ev: any) {
    let val = ev.target.value;
  	if (val && val.trim() != '') {
	  	this.api.getPesquisaUsuario(val).subscribe((res: any) => { //!MODEL
        console.log(res);
	  		this.usuarios = res;
	  	});
  	} else {
  		this.usuarios = null;
  	}
  }

	adicionarEquipamento(equipamentoSelecionado) {
		this.emprestimo.equipamento_id.push(equipamentoSelecionado.equipamento_id);
		this.equipamentos_selecionados.push(equipamentoSelecionado);
		console.log("EQUIPAMENTO ADICIONADO");
		console.log(this.equipamentos_selecionados);
	}

	deletar(index) {
			this.equipamentos_selecionados.splice(index, 1);
      this.emprestimo.equipamento_id.splice(index, 1);
  		console.log(index);
  		console.log(this.equipamentos_selecionados);
	}

  postEmprestimo() {
    this.api.postEmprestimo(this.emprestimo).subscribe(res => {
      console.log(res);
    })
  }
}
