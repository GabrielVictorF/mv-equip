import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ViewController, ModalController, Events } from 'ionic-angular';

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
  private usuario_orgao;
	private equipamentos_selecionados = []; //Selecionados para movimentação
  private usuario_selecionado;
  private statusNewMo;
  private statusLoadingEquip = false;
  private semResultadosEquip = false;
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

  solicitanteModal() {
    this.modal = this.modalCtrl.create(SolicitanteResponsavel);
    this.modal.onDidDismiss(res => {
      if(res != undefined) {
        this.usuario_selecionado = res;
        this.emprestimo.solicitante_id = res.solicitante_id;
      }
    });
    this.modal.present();
  }
}


@Component({
  templateUrl: 'usuario-responsavel-modal.html'
})
export class SolicitanteResponsavel {
  private solicitante = []; //Searchbar
  public pesquisa_usuario = 0; // 0=sem pesquisa; 1=pesquisando; 2=sem resultados
  public orgao;
  public setor;
  private optionsOrgao = {
    title: 'Órgãos de Fortaleza',
    subtitle: '',
    mode: 'ios'
  }
  private optionsSetor = {
    title: 'Setores da SEPOG',
    subtitle: '',
    mode: 'ios'
  }
  private solicitanteNew = {
    solicitante_nome: '',
    orgao_id: 0,
    setor_id: null
  }
  private solicitante_selecionado;

 constructor(public viewCtrl: ViewController, public functions: FunctionsProvider,
             public api: ApiProvider, public events: Events) {
      this.api.getOrgaosExternos().subscribe(res => {
        this.orgao = res;
        console.log(this.orgao)
      });
      this.api.getSetores().subscribe(res => {
        this.setor = res;
        console.log(res)
      }, Error => {
        this.functions.showToast('Erro ao obter a lista de setores!');
      });
 }

 dismissModal() {
   this.viewCtrl.dismiss(this.solicitante_selecionado);
 }

 pesquisaUsuario(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.pesquisa_usuario = 1;
      this.api.getPesquisaUsuario(val).subscribe((res: any) => { //!MODEL
        this.pesquisa_usuario = 0;
        this.solicitante = res;
        if (this.solicitante.length == 0){ // Sem resultados 
          this.pesquisa_usuario = 2;
        }
      }, Error => { //Erro na req
        this.pesquisa_usuario = 2;
        this.functions.showToast("Erro ao obter usuários, favor tentar novamente!");
      });
    } else {  // Caso o campo de pesquisa esteja zerado
      this.pesquisa_usuario = 0;
      this.solicitante = null;
    }
  }

  postSolicitante() {
    this.api.postSolicitante(this.solicitanteNew).subscribe(res => {
      this.solicitante_selecionado = res;
      this.functions.showToast("Solicitante cadastrado com sucesso!");
    });
  }

  adicionarSolicitante(solicitanteSelecionado) {
    this.solicitante_selecionado = solicitanteSelecionado;
  }
}