import { FunctionName } from './../../constants/function-name';
import { RequestModel } from './../../model/request-model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { CommonUtilProvider } from '../../common-util/common-util';

/*
  Generated class for the RegionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegionProvider {

  constructor(public http: Http, public api: CommonUtilProvider) {}
  

  
  async getRegion(){
    let request = new RequestModel();
    request.functionName = FunctionName.GETREGION;
    request.param ={ body : {
      action : "SELECT"
    }};
    return this.api.postApiData(request);
  }


 

}
