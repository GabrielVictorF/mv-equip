import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ViewController, ModalController, Events } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { FunctionsProvider } from '../../providers/functions/functions';

@IonicPage()
@Component({
  selector: 'page-nova-movimentacao',
  templateUrl: 'nova-movimentacao.html',
})
export class NovaMovimentacaoPage {
	public emprestimo;
	private equipamentos = []; //Searchbar
  private usuario_orgao;
	private equipamentos_selecionados = []; //Selecionados para movimentação
  private usuario_selecionado;
  private statusNewMo;
  private statusLoadingEquip = false;
  private semResultadosEquip = false;
  private modal;
  private locais;
  private orgaos;
  private acao = this.navParams.get('acao');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api: ApiProvider, public functions: FunctionsProvider,
              public modalCtrl: ModalController, public events: Events) {
                if (this.acao) {
                  this.emprestimo = this.navParams.get('data'); 
                  console.log(this.emprestimo)
                  
                } else {
                  this.emprestimo = {
                    equipamento_id: [1],
                    data_emprestimo: new Date().toISOString(),
                    data_devolucao: new Date().toISOString(), 
                    observacao: '',
                    solicitante_id: 1,
                    tipo_emprestimo: 'I',
                    localizacao_id: null,
                    orgao_id: null
                }
                }
                this.api.getOrgaosExternos().subscribe(res => {
                  this.orgaos = res;
                }, Error => this.functions.showToastError('Não foi possível recuperar os orgãos externos!'));
                this.api.getLocalizacoes().subscribe(res => {
                  this.locais = res;
                  console.log(res)
                }, Error => console.log(Error));
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
        this.functions.showToastError("Erro ao obter equipamentos, favor tentar novamente!");
      });
  	} else { //Caso o campo esteja vazio
      this.statusLoadingEquip = false;
  		this.equipamentos = null;
  	}
	}

	adicionarEquipamento(equipamentoSelecionado) {
    let mapeamento;
    this.equipamentos_selecionados.map(res => {
      if (equipamentoSelecionado.equipamento_id == res.equipamento_id) {
        this.functions.showToastError("Não é possível selecionar o mesmo equipamento mais de uma vez!");
        mapeamento = true;
        return false;
      }
    });
      if (!mapeamento) { 
  		this.emprestimo.equipamento_id.push(equipamentoSelecionado.equipamento_id.toString());
  		this.equipamentos_selecionados.push(equipamentoSelecionado);
  		console.log("EQUIPAMENTO ADICIONADO");
  		console.log(this.equipamentos_selecionados);
   }
	}

	deletar(index) {
			this.equipamentos_selecionados.splice(index, 1);
      this.emprestimo.equipamento_id.splice(index, 1);
  		console.log(index);
  		console.log(this.equipamentos_selecionados);
	}

  postEmprestimo() { //POST and PUT
    this.statusNewMo = 'spinner-border spinner-border-sm';
    //this.emprestimo.equipamento_id[0].toString();
    console.log(this.emprestimo)

    if (this.acao) {
      this.api.putEmprestimo(this.emprestimo).subscribe(() => {
        this.statusNewMo = '';
        this.functions.showToastSuccess('Empréstimo atualizado!');
      }, Error => {
        this.statusNewMo = '';
      })
    } else {
      this.api.postEmprestimo(this.emprestimo).subscribe(res => {
        this.functions.showToastSuccess('Empréstimo criado com sucesso!')
        this.statusNewMo = '';
        console.log(res);
      }, Error => {
        this.functions.showToastError('Erro ao criar empréstimo!')
        this.statusNewMo = '';
      })
    }
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
        this.functions.showToastError('Erro ao obter a lista de setores!');
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
        this.functions.showToastError("Erro ao obter usuários, favor tentar novamente!");
      });
    } else {  // Caso o campo de pesquisa esteja zerado
      this.pesquisa_usuario = 0;
      this.solicitante = null;
    }
  }

  postSolicitante() { // Cadastro de novo solicitante
    this.api.postSolicitante(this.solicitanteNew).subscribe(res => {
      this.solicitante_selecionado = res;
      this.functions.showToastSuccess("Solicitante cadastrado com sucesso!");
    });
  }

  adicionarSolicitante(solicitanteSelecionado) {
    this.solicitante_selecionado = solicitanteSelecionado;
    this.dismissModal();
  }
}