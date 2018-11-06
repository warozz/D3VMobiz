import { Observable } from 'rxjs';
import { RegisterModel } from './register-model';
import { Injectable } from '@angular/core';
import { Http , Response , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URLConfig } from '../constants/url-config';
import { RequestModel } from '../model/request-model';
import { AuthorizationKey } from '../constants/authorization-key';
import { ResponseModel } from '../model/response-model';
import { CommonUtilProvider } from '../common-util/common-util';
/*
  create by : tongM@ster
  date : 03/10/2560
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: Http, public commonApi: CommonUtilProvider) {}

  registerMemberDa(request: RequestModel):Promise<ResponseModel>{
    return this.commonApi.postApi(request);
  }

  resetPasswordMemberDa(request: RequestModel):Promise<ResponseModel>{
    return this.commonApi.postApi(request);
  }

}
