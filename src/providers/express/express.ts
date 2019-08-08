import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ExpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpressProvider {
  private url = 'http://172.30.88.13:3000';
  private httpOptions = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*'
    })
  });
  constructor(public http: HttpClient) {
    console.log('Hello ExpressProvider Provider');
  }

  public getReq() {
    return this.http.get(this.url, this.httpOptions);
  }

}
