import { ApplicationData } from './application-data';
import { MCAapplicationsM } from './../service-table/mcaapplications-model';
import { Injectable } from "@angular/core";
import { ApplicationImageM } from "../service-table/application-image-model";
import { AttachFileM } from "../service-table/attachfile-model";
import { PaymentM } from '../service-table/payment-model';
import { FormGroup } from '@angular/forms';
import { ApplicationEAppDataM } from '../service-table/application-eapp-data-model';
import { ApiProvider } from '../api/api';
import { ToastController } from 'ionic-angular';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { Storage } from '@ionic/storage';

@Injectable()
export class ApplicationEAppData {


    constructor(
        private apiProvider: ApiProvider, 
        private toastCtrl: ToastController, 
        private storage: Storage,
        private appData: ApplicationData) {

    }

    /**
     * @name applicationImageM
     * @type Array<ApplicationImageM>
     * @description เก็บข้อมูลรูปภาพการลงลายมือชื่อ
     */
    public applicationImageMs: Array<ApplicationImageM>;

    /**
     * @name attachFileMs
     * @type Array<AttachFileM>
     * @description เก็บข้อมูลเอกสารแนบ
     */
    public attachFileMs: Array<AttachFileM> = new Array<AttachFileM>(); 

    /**
     * @name mcaapplicationM
     * @type MCAapplicationsM
     * @description เก็บข้อมูลพยาน
     */
    public mcaapplicationM: MCAapplicationsM = new MCAapplicationsM();

    /**
     * @name paymentM
     * @type PaymentM
     * @description เก็บข้อมูลการชำระเงิน
     */
    public paymentM: PaymentM;


    /**
     * เลขที่ใบคำขอ
     */
    private applicationid: string = '';

    public signature: FormGroup; 

    public attachfileDone: Boolean = false;

    public signDone: Boolean = false;

    public tabindex: number = 3;

    public isPurchaseComplete: Boolean = false;

    public emailCustomer: string;

    /**
     * ข้อมูลผู้รับประโยชน์
     */
    public beneficiaryMs: any;

    /**
     * บันทึกข้อมูลด้วย service 
     */
    public insertApplicationEAppData(val?) {
        
        return new Promise(async (resolve, reject) => {
            
            let applicationEAppDataMs: Array<ApplicationEAppDataM> = [];
            
            let applicationEAppDataM: ApplicationEAppDataM = new ApplicationEAppDataM();
            
            this.mcaapplicationM.applicationid = this.appData.getApplicationId();
            this.mcaapplicationM.applicationno = this.appData.getApplicationno();

            applicationEAppDataM.mcaapplicationM = this.mcaapplicationM;///

            //if (!this.attachfileDone)
            applicationEAppDataM.attachFileMs = this.attachFileMs;

            //if (!this.signDone) 
            applicationEAppDataM.applicationImageMs = this.applicationImageMs;

            applicationEAppDataM.saledetailM = await this.storage.get('saleInformation');

            applicationEAppDataMs.push(applicationEAppDataM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.APPLICATION_EAPP;
            reqM.serviceName = ServiceName.INSERT;
            reqM.param = applicationEAppDataMs;
            reqM.searchkey = val;

            this.apiProvider.callData(reqM).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );

        });
    }

    /**
     * บันทึกข้อมูลด้วย service
     */
    public selectApplicationEAppData(): Promise<null> {
        
        return new Promise((resolve, reject) => {
            
            let applicationEAppDataMs: Array<ApplicationEAppDataM> = [];
            
            let applicationEAppDataM: ApplicationEAppDataM = new ApplicationEAppDataM();
            
            this.mcaapplicationM.applicationid = this.appData.getApplicationId();
            applicationEAppDataM.mcaapplicationM = this.mcaapplicationM;///

            applicationEAppDataMs.push(applicationEAppDataM);

            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.APPLICATION_EAPP;
            reqM.serviceName = ServiceName.SELECT;
            reqM.param = applicationEAppDataMs;

            this.apiProvider.callData(reqM).then(
                (res) => {
                    if (res['size'] > 0) {

                        if (res['data'][0]['attachFileMs'] != undefined) {
                            this.attachfileDone = true;
                        } 
                        else {
                            this.attachfileDone = false;
                        }

                        if (res['data'][0]['applicationImageMs'] != undefined) {
                            this.signDone = true;
                        } 
                        else {
                            this.signDone = false;
                        }

                        this.emailCustomer = res['data'][0]['emailCustomer'];

                        resolve(res['data'][0]);
                    }
                    else {
                        this.applicationid = '';
                        reject();
                    }
                },
                (err) => {
                    console.log(err);
                    reject();
                }
            );

        });
    }
}
