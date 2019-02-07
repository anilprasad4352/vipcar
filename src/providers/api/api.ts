import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
getProducts(url) {
	
	  
	//if(limit==0){
	/*return new Promise(resolve => {
      this.http.get('http://preferwork.com/apiproject/api/getProducts/'+table).map(data => {
		 
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });*/
	/*}else{
		return new Promise(resolve => {
      this.http.get('http://preferwork.com/apiproject/api/getProducts/'+table+'?limit='+limit).map(data => {
        resolve(data.json());
      }, err => {
        console.log(err);
      });
    });
	}*/
	
  }
}
