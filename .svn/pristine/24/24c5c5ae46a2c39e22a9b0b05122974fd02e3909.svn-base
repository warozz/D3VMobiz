import { ProvinceProvider } from './../../providers/address/province/province';
import { Component, Input } from '@angular/core';
import { LoadingDirective } from './../../directives/extends/loading/loading';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchHospitalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'รพ.เครือข่าย'
})
@Component({
  selector: 'page-search-hospital',
  templateUrl: 'search-hospital.html',
})
export class SearchHospitalPage {
  private hospitalData: Array<any>;
  private region: string ;
  private province: string;
  private data: string;
  private showdata: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private provinceService: ProvinceProvider, private loadingCtrl: LoadingDirective) {

  }

  /**
   * ค้นหา
   */
  
  public search(text) {
    this.loadingCtrl.present();
    //console.log(text + "  "+this.region+"  "+this.province );
    let data ={province: this.province, region: this.region, address: text };
    this.provinceService.getHospital(data)
    .then(res=>{
      //console.log(res);
//      res.body.datas.forEach(element => {
//        console.log(element);
//        let obj2 = {service : {ipd : true,opd :true}};
//        console.log(element);
//        Object.assign(element,obj2);
//      });

      //console.log(res.body.datas);
      this.hospitalData = res.body.datas;
      this.hospitalData.forEach((item, idx) => {
        this.hospitalData[idx].fax2 = item.fax.replace(/,/g, '<br />');
        this.hospitalData[idx].telephone2 = item.telephone.replace(/,/g, '<br />');
      });
      this.loadingCtrl.dismiss();
    });

  }

  show(showdata :string) {
    this.showdata = showdata;
  }
  
  
  

  
}
