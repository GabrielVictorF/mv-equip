import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Equipamento } from '../../models/equipamento';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

	private url = "http://192.168.0.4:8080";
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

  public postEquipamento(equipamento: Equipamento) {
  	let url = this.url + '/mv_equip/public/equipamento';
  	let body = equipamento;
    console.log(body);
  	return this.http.post(url, body, this.httpOptions);
  }
}
