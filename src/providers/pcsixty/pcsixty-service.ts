import { Injectable } from "@angular/core";
import { ApiProvider } from '../api/api';
import { RequestModel } from '../model/request-model';
import { FunctionName } from '../constants/function-name';
import { ServiceName } from '../constants/service-name';
import { Storage } from '@ionic/storage';
import { PcSixtyM } from './pcsixty-model';

@Injectable()
export class PcsixtyService {


    constructor(
        private apiProvider: ApiProvider, 
        private storage: Storage
        // ,private pcsixty: PcSixtyM
    ) {

    }

   
    /**
     * บันทึกข้อมูลด้วย service 
     */
    public insertPcSixtyService(pcSixtyM :PcSixtyM): Promise<null> {
        
        return new Promise(async (resolve, reject) => {
            let applicationEAppDataMs: Array<PcSixtyM> = [];
            let applicationEAppDataM: PcSixtyM = new PcSixtyM();
            applicationEAppDataMs.push(pcSixtyM);
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PC60;
            reqM.serviceName = ServiceName.INSERT;
            reqM.param = applicationEAppDataMs;
            reqM.searchkey = "all";
            console.log(reqM);
            
            this.apiProvider.callData(reqM).then(
                (res) => {
                    resolve();
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );

        });
    }



      /**
     * แสดงข้อมูลด้วย service 
     */
    public selectPcSixtyService(pcSixtyM :PcSixtyM): Promise<PcSixtyM> {
        
        return new Promise(async (resolve, reject) => {
            let applicationEAppDataMs: Array<PcSixtyM> = [];
            applicationEAppDataMs.push(pcSixtyM);
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PC60;
            reqM.serviceName = ServiceName.SELECT;
            reqM.param = applicationEAppDataMs;
            //reqM.searchkey = "all";
            console.log(reqM);
            
            this.apiProvider.callData(reqM).then(
                (res) => {
                    resolve(res['data'][0]);
                },
                (err) => {
                    reject(err);
                }
            );

        });
    }

    /**
     * ลบข้อมูลด้วย service 
     */
    public deletePcSixtyService(pcSixtyM :PcSixtyM): Promise<null> {
        
        return new Promise(async (resolve, reject) => {
            let applicationEAppDataMs: Array<PcSixtyM> = [];
            applicationEAppDataMs.push(pcSixtyM);
            let reqM: RequestModel = new RequestModel();
            reqM.functionName = FunctionName.PC60;
            reqM.serviceName = ServiceName.DELETE;
            reqM.param = applicationEAppDataMs;
            //reqM.searchkey = "all";
            console.log(reqM);
            
            this.apiProvider.callData(reqM).then(
                (res) => {
                    resolve();
                },
                (err) => {
                    reject(err);
                }
            );

        });
    }

    
}
