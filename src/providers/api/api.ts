import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private url = "http://172.30.88.13:8080";
  private token = localStorage.getItem('token');
	private httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    });

  constructor(public http: HttpClient) {
    console.log(this.token)
    console.log('Hello ApiProvider Provider');
  }

  public getAllEquipamentos() {
  	let url = this.url + '/mv_equip/public/equipamento?_select=*';
  	return this.http.get(url, this.httpOptions);
  }

  public postEquipamento(equipamento) {
  	let url = this.url + '/mv_equip/public/equipamento';
    console.log(equipamento);
  	return this.http.post(url, equipamento, this.httpOptions);
  }

  public postSolicitante(solicitante) {
    let url = this.url + '/mv_equip/public/solicitante';
    let body = solicitante;
    return this.http.post(url, body, this.httpOptions);
  }

  public getPesquisaEquipamento(tombamento: string) {
    let url = this.url + '/_QUERIES/get/where_equipamentos?tomb=' + tombamento;
		console.log(url)
    return this.http.get(url, this.httpOptions);
  }

	public getPesquisaUsuario(nome: string) {
		let url = this.url + '/_QUERIES/get/full-usuario?solicitante=' + nome;
		return this.http.get(url, this.httpOptions);  
	}

  public getSetores() {
    let url = this.url + '/mv_equip/public/setor?_order=setor_sigla';
    return this.http.get(url, this.httpOptions);
  }

  public getOrgaosExternos() {
    let url = this.url + '/mv_equip/public/orgao?orgao_id=$ne.2&_order=orgao_sigla'; //Retorna os orgaos externos em ordem alfalbética 
    return this.http.get(url, this.httpOptions);
  }

  public getAllUsuarios() {
    let url = this.url + '/_QUERIES/get/join-solicitante-orgao';
    return this.http.get(url, this.httpOptions);
  }

  /*public getOrgao(orgao_id: number) {
    let url = this.url + '/mv_equip/public/orgao?orgao_id=' + orgao_id;
    return this.http.get(url, this.httpOptions);
  } */

	public postEmprestimo(emprestimo) {
		let url = this.url + '/mv_equip/public/emprestimo';
    let body = emprestimo;
		return this.http.post(url, body, this.httpOptions);
	}

  public getPesquisaFullUsuario(setor?) { //Utilizada na USUARIOSPAGE
    let url = this.url + '_QUERIES/get/usuario-pesquisa-completa?setor=2';
    return this.http.get(url, this.httpOptions);
  }

  public getUsuariosExternos(orgaos) {
   let url = this.url + '/mv_equip/public/solicitante?orgao_id=$in.' + orgaos.toString();
   console.log(url)
   return this.http.get(url, this.httpOptions);   
  }

  public postUsuario(body) {
    let url = this.url + '/mv_equip/public/solicitante';
    return this.http.post(url, body, this.httpOptions);
  }

  public getLocalizacoes() {
    let url = this.url + '/mv_equip/public/localizacao';
    console.log(url);
    return this.http.get(url, this.httpOptions);
  }

  public getEmprestimos(emprestimo_id?) {
    let url = this.url + '/mv_equip/public/emprestimo';
    if (emprestimo_id)
      url += '?emprestimo_id=' + emprestimo_id;
    
    return this.http.get(url, this.httpOptions);
  }

  public getEmpMovimentacoesPage() {
    let url = this.url + '/_QUERIES/get/emprestimo-full-relacionamento?_order=orgao_id';
    //let url = this.url + '/mv_equip/public/solicitante?_join=right:emprestimo:solicitante.solicitante_id:$eq:emprestimo.emprestimo_id';
    return this.http.get(url, this.httpOptions);
  }

  public deleteEmprestimo(emprestimoId) {
    let url = this.url + '/mv_equip/public/emprestimo?emprestimo_id=' + emprestimoId;
    return this.http.delete(url);
  }

  public deleteEquipamento(equipamentoId) {
    let url = this.url + '/mv_equip/public/equipamento?equipamento_id=' + equipamentoId;
    return this.http.delete(url, this.httpOptions);
  }

  public putEmprestimo(emprestimo) {
    let body = {
      data_emprestimo: emprestimo.data_emprestimo,
      data_devolucao: emprestimo.data_devolucao,
      observacao: emprestimo.observacao,
      emprestimo_id: emprestimo.emprestimo_id,
      equipamento_id: emprestimo.equipamento_id,
      tipo_emprestimo: emprestimo.tipo_emprestimo,
      solicitante_id: emprestimo.solicitante_id,
      localizacao_id: emprestimo.localizacao_id
    }
    console.log(body)
    let url = this.url + '/mv_equip/public/emprestimo?emprestimo_id=' + emprestimo.emprestimo_id;
    return this.http.put(url, body, this.httpOptions);
  }

  public getCountTipoEmprestimo() {
    let url = this.url + '/_QUERIES/get/count-tipo-emprestimo';
    return this.http.get(url, this.httpOptions);
  }

  public getCountSolicitanteEmprestimo() {
    let url = this.url + '/_QUERIES/get/count-emprestimo-solicitante';
    return this.http.get(url, this.httpOptions);
  }

  public post
}
