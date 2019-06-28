import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';


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
  	solicitante_id: null,
  	tipo_emprestimo: 'I'
  }
	private equipamentos = []; //Searchbar
  private solicitante = []; //Searchbar
  private usuario_orgao;
	private equipamentos_selecionados = []; //Selecionados para movimentação
  private usuario_selecionado;
  private statusNewMo;
  private statusLoadingEquip = false;
  private semResultadosEquip = false;
  private statusLoadingUsers = false;
  private semResultadosUsers = false;
  private modal;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api: ApiProvider, public functions: FunctionsProvider,
              public modalCtrl: ModalController) {
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
        if (this.equipamentos.length == 0)
          this.semResultadosEquip = true;
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
	  		this.solicitante = res;
        console.log(this.solicitante)
        if (this.solicitante.length == 0) // Sem resultados
          this.semResultadosUsers = true;
	  	}, Error => { //Erro na req
        this.statusLoadingUsers = false;
        this.functions.showToast("Erro ao obter usuários, favor tentar novamente!");
      });
  	} else {  // Caso o campo de pesquisa esteja zerado
      this.statusLoadingUsers = false;
  		this.solicitante = null;
  	}
  }

	adicionarEquipamento(equipamentoSelecionado) {
		this.emprestimo.equipamento_id.push(equipamentoSelecionado.equipamento_id);
		this.equipamentos_selecionados.push(equipamentoSelecionado);
		console.log("EQUIPAMENTO ADICIONADO");
		console.log(this.equipamentos_selecionados);
	}

  adicionarSolicitante(solicitanteSelecionado) {
    this.emprestimo.solicitante_id = solicitanteSelecionado.solicitante_id;
    this.usuario_selecionado = solicitanteSelecionado;
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

  solicitanteModal() {
    this.modal = this.modalCtrl.create(SolicitanteResponsavel);
    this.modal.present();
  }
}

export class SolicitanteResponsavel {

 constructor(public viewCtrl: ViewController) {

 }

 dismissModal() {
   this.viewCtrl.dismiss();
 }
}
}
