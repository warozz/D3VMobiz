import { ResponseModel } from './../../providers/model/response-model';
import { AlertDirective } from './../../directives/extends/alert/alert';
import { ApiProvider } from './../../providers/api/api';
import { FunctionName } from './../../providers/constants/function-name';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { documents, forms } from "./../../providers/constants/sale-media";
import { Sort } from '@angular/material';
import { LoadingDirective } from "./../../directives/extends/loading/loading";
import { PdfViewdataPage } from '../../pages/pdf-viewdata/pdf-viewdata';
import { RequestModel } from "./../../providers/model/request-model";
import { ServiceName } from '../../providers/constants/service-name';
import { SaleMediaData, MediaM } from "../../providers/sale-media";

import _ from "lodash";


/**
 * Generated class for the SalesMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'สื่อและเอกสารงานขาย'
})
@Component({
  selector: 'page-sales-media',
  templateUrl: 'sales-media.html',
})
export class SalesMediaPage {
  //Decare
  private documents: object;
  private datasTable: Array<any> = [];
  private payType: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingDirective,
    private apiProvider: ApiProvider,
    private alertCtrl: AlertDirective,
    private saleMediaData: SaleMediaData) {
    console.log('constructor');
  }

  // Life cycle จังหวะไปเรียก API
  ionViewDidLoad()
  {
    this.documents = documents; // ได้มาจาก import ข้างบน
    this.payType = '1';
    this.detailBypayType(1);
    console.log('ionViewDidLoad')
  }
  
  // select drop down tab3
  detailBypayType(event)
  {
    const parentID = Number(event);
    this.datasTable = _.filter(forms, doc => (
      _.includes(doc.parents, parentID)
    ));
    //Assign no
    this.datasTable = _.forEach(this.datasTable, (a, b) =>{
      a.no = b + 1
    });
  }

  //Sort table
  sortData(sort: Sort)
  {
    const { active, direction } = sort
    this.datasTable = _.orderBy(this.datasTable, _.trimEnd(active, ['M', 'F']), direction);
  }

  // openPDF
  private async openPDF(form)
  {
    const { pdfPath } = form;
    const pdfData = await this.getMediaPdf(pdfPath);
    const PDF = {
      pdfDetail: {
        pageTotal: 1,
        pdfName: pdfData.documentname,//fundCode .pdf
        src: `data:application/pdf;base64, ${pdfData.binarypdf}`,
      }
    };
    // ส่งไปหน้า PDF
    this.navCtrl.push(PdfViewdataPage, PDF);
  }

  private async getMediaPdf(mediaName='')
  {
    let loading = this.loadingCtrl.scopePresent();
    let request = new RequestModel();
    request = {
      ...request,
      serviceName: ServiceName.SELECT,
      functionName: FunctionName.SELLDOCUMENT,
      sourcePage: mediaName
    };
    
    /**
     * เช็คข้อมูลใน Provider ก่อน ถ้าไม่มีให้ไปเอามาจาก Service
     */
    if (!this.saleMediaData.mediaExist(mediaName)) {
      const pdfData = await this.apiProvider.callData(request).then(
        res => {
          const obj :any = res;
          const resModel: ResponseModel = obj;
  
          if (resModel.size > 0 && resModel.data.length > 0) {
            const data: MediaM = _.first(resModel.data);
            this.saleMediaData.setMedia(data);
            return data;
          }
        },
        err => {
          this.loadingCtrl.scopeDismiss(loading);
          this.alertCtrl.error(err);
          return new MediaM;
        }
      );

      this.loadingCtrl.scopeDismiss(loading);
      return pdfData;

    } else {
      // มีอยู่แล้วใน provider
      this.loadingCtrl.scopeDismiss(loading);
      return this.saleMediaData.getMedia(mediaName);
    }
  }

}
