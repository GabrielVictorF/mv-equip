import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

	private url = "http://192.168.0.5:8080";
	private httpOptions = ({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  public getAllEquipamentos() {
  	let url = this.url + '/mv_equip/public/equipamento?_select=*';
  	return this.http.get(url, this.httpOptions);
  }

  public postEquipamento(equipamento) {
  	let url = this.url + '/mv_equip/public/equipamento';
  	let body = equipamento;
    console.log(body);
  	return this.http.post(url, body, this.httpOptions);
  }

  public getPesquisaEquipamento(tombamento: string) {
    let url = this.url + '/_QUERIES/get/where_equipamentos?tomb=' + tombamento;
		console.log(url)
    return this.http.get(url, this.httpOptions);
  }

	public getPesquisaUsuario(nome: string) {
		let url = this.url + '/_QUERIES/get/full-usuario?usuario=' + nome;
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
}
