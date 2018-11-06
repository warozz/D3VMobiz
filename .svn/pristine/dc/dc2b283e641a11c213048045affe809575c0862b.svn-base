import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import * as addressJson from '../../temporary/address.json';

const address:any[] = <any>addressJson;


/*
  Generated class for the AddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressProvider {

  constructor(public http: Http) {

  }

  getAddress() {
    return address;
  }




}
