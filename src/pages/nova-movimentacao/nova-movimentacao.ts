import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';
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
  	data_emprestimo: this.functions.getTimezone(),
  	data_devolucao: this.functions.getTimezone(),
  	observacao: '',
  	usuario_id: null,
  	tipo_emprestimo: 'I'
  }
	private equipamentos = []; //Searchbar
  private usuarios = []; //Searchbar
  private usuario_orgao;
	private equipamentos_selecionados = []; //Selecionados para movimentação
  private statusNewMo;
  private statusLoadingEquip = false;
  private statusLoadingUsers = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api: ApiProvider, public functions: FunctionsProvider) {
  	console.log(this.emprestimo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaMovimentacaoPage');
  }

  pesquisa(ev: any) { //Campo de pesquisa de
    this.statusLoadingEquip = true; //TROCAR POR EVENTO POSTERIORMENTE

  	let val = ev.target.value;
  	if (val && val.trim() != '') { //Caso a request retorne SEM erro
	  	this.api.getPesquisaEquipamento(val).subscribe((res: any) => { //!MODEL
        this.statusLoadingEquip = false;
	  		this.equipamentos = res;
	  	}, Error => { //Caso o request retorne erro
        this.statusLoadingEquip = false;
        this.functions.showToast("Erro ao obter equipamentos, favor tentar novamente!");
      });
  	} else { //Caso o campo esteja vazio
      this.statusLoadingEquip = false;
  		this.equipamentos = null;
  	}
	}

  pesquisaUsuario(ev: any) {
    this.statusLoadingUsers = true;

    let val = ev.target.value;
  	if (val && val.trim() != '') {
	  	this.api.getPesquisaUsuario(val).subscribe((res: any) => { //!MODEL
        this.statusLoadingUsers = false;
	  		this.usuarios = res;
	  	}, Error => {
        this.statusLoadingUsers = false;
        this.functions.showToast("Erro ao obter usuários, favor tentar novamente!");
      });
  	} else {
      this.statusLoadingUsers = false;
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
    console.log(this.emprestimo)
    this.statusNewMo = 'spinner-border spinner-border-sm';
    this.api.postEmprestimo(this.emprestimo).subscribe(res => {
      this.statusNewMo = '';
      console.log(res);
    }, Error => {
      this.statusNewMo = '';
    })
  }
}
