import { DateUtil } from './../utility/date-util';
import { QuotationModel } from './../quotation/quotation-model';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { RequestModel } from '../model/request-model';
import { ConectionDBName } from '../constants/connect-db-name';
import { TB_SQLITE } from '../constants/table-config';
import { ResponseModel } from '../model/response-model';
import { ChartM } from './chart-model';
import { BarChartDataM } from './bar-chart-datam';
import moment from 'moment';
import {QuotationService} from '../quotation/quotation-service';
import { CalculateAgeUtil } from '../utility/calculate-age-util';

export class ChartService { 

    constructor(public platform: Platform, public db: SQLite) {}

    public getDataGruop01(reqM: RequestModel) {

        //console.log("ChartService : getDataGruop01 ****************");

        return new Promise((resolve, reject) => {
            //reqM.agentid

            this.db.create(ConectionDBName.connectionDB).then(
                (connection: SQLiteObject) => { 

                    let sqlP: string = " SELECT count(distinct pros.customerid) as prospectAmt FROM prospect pros ";
                    sqlP += " WHERE pros.agentid='"+ reqM.agentid +"' AND pros.flagdraftyn!='Y' AND pros.customertype='P' ";

                    let sqlC: string = " SELECT count(distinct pros.customerid) as customerAmt FROM prospect pros ";
                    sqlC += " WHERE pros.agentid='"+ reqM.agentid +"' AND pros.flagdraftyn!='Y' AND pros.customertype='C' ";

                    //console.log(">>>>>>>> sqlP = " + sqlP);      

                    connection.executeSql(sqlP, []).then(
                        (result) => {

                            connection.executeSql(sqlC, []).then(
                                (res) => {

                                    let responseM: ResponseModel = new ResponseModel();
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
        
                                    let chartMs: Array<ChartM> = [];
        
                                    let chartM: ChartM = new ChartM();
                                    chartM.prospectAmt = result.rows.item(0).prospectAmt;
                                    chartM.customerAmt = res.rows.item(0).customerAmt;
                                    chartMs.push(chartM);
        
                                    //console.log("===== SELECT success ChartService chartMs xml " + JSON.stringify(chartMs));
        
                                    responseM.size = chartMs.length;
                                    responseM.data = chartMs;
                                    resolve(responseM);
                                }
                            )
                        }
                        , (error) => {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> SELECT ERROR " + JSON.stringify(error));
                            reject(error);
                        }
                    )
                }
                , (error) => {
                    console.log(error);
                    reject(error);
                }
            )

        });
    }

    monthPeriod(date, month) {
        var temp = date;
        temp = new Date(date.getFullYear()-1, date.getMonth(), 1);
        temp.setMonth(temp.getMonth() + (month + 1));
        temp.setDate(temp.getDate() - 1); 

        if (date.getDate() < temp.getDate()) 
            temp.setDate(date.getDate()); 

        return temp;    
    }

    public getDataGruop02(reqM: RequestModel) {
        
       // console.log("ChartService : getDataGruop02 ****************");

        return new Promise((resolve, reject) => {

            let monthArr: Array<string> = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.","ก.ค.","ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.",  "ธ.ค."];

            let responseM: ResponseModel = new ResponseModel();
            responseM.data = [];
            responseM.size = 0;
            responseM.status = 0;

            let chartMs: Array<ChartM> = [];
            let chartM: ChartM = new ChartM();
            let barChartLabels: Array<string> = [];
            let barChartDataMs: Array<BarChartDataM> = [];
            let monthPeriodArr: Array<string> = [];
            let countArray: Array<Number> = [];

            for(let i = 12; i > 0 ; i--) { 
          
                var yyyy = this.monthPeriod(new Date(), i).getFullYear().toString();                                    
                var mm = ("0" + (this.monthPeriod(new Date(), i).getMonth() + 1)).slice(-2); 

                monthPeriodArr.push(yyyy + "-" + mm)
                barChartLabels[i-1] = monthArr[Number(mm) - 1] + " " + (Number(yyyy) + 543);
            }

            //console.log("barChartLabels = " + JSON.stringify(barChartLabels));
            //console.log("monthPeriodArr = " + JSON.stringify(monthPeriodArr) + Date.now());

            let sql: string = "select  count(*) as total,";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[0] +"%') as m1, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[1] +"%') as m2, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[2] +"%') as m3, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[3] +"%') as m4, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[4] +"%') as m5, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[5] +"%') as m6, ";

            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[6] +"%') as m7, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[7] +"%') as m8, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[8] +"%') as m9, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[9] +"%') as m10, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='D' AND publishstatus!='C' AND createdatetime like '%"+ monthPeriodArr[10] +"%') as m11, ";
            sql += " (select count(*) from quotation where agentid='"+ reqM.agentid +"' AND publishstatus!='' AND createdatetime like '%"+ monthPeriodArr[11] +"%') as m12 ";
            sql += " from quotation ";

            //console.log("SQL G2 = " + sql);

            this.db.create(ConectionDBName.connectionDB).then(
                (connection: SQLiteObject) => {
                    connection.executeSql(sql, []).then(
                        (result) => {
                            countArray.push(Number(result.rows.item(0).m12));
                            countArray.push(Number(result.rows.item(0).m11));
                            countArray.push(Number(result.rows.item(0).m10));
                            countArray.push(Number(result.rows.item(0).m9));
                            countArray.push(Number(result.rows.item(0).m8));
                            countArray.push(Number(result.rows.item(0).m7));

                            countArray.push(Number(result.rows.item(0).m6));
                            countArray.push(Number(result.rows.item(0).m5));
                            countArray.push(Number(result.rows.item(0).m4));
                            countArray.push(Number(result.rows.item(0).m3));
                            countArray.push(Number(result.rows.item(0).m2));
                            countArray.push(Number(result.rows.item(0).m1));
                            
                            //console.log("SQL result.rows.item(0).m1 = " + result.rows.item(0).m1);

                            let quoM: BarChartDataM = new BarChartDataM();
                            quoM.data = countArray;
                            quoM.label = "ใบเสนอขาย";

                            let appM: BarChartDataM = new BarChartDataM();
                            appM.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            appM.label = "ใบคำขอ";

                            barChartDataMs.push(quoM);
                            barChartDataMs.push(appM);
                            
                            chartM.barChartDatas = barChartDataMs;
                            chartM.barChartLabels = barChartLabels;
                            chartMs.push(chartM);

                            responseM.data = chartMs;
                            responseM.size = chartMs.length;

                            resolve(responseM); 
                        }
                        , (error) => {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select getDataGruop02 error " + JSON.stringify(error));
                            reject(error);
                        }
                    )
                }
                , (error) => {
                    console.log(error);
                    reject(error);
                }
            )
        });
    }
 
    public getDataGruop03(reqM: RequestModel) {
        return new Promise((resolve, reject) => {
            new QuotationService(this.platform, this.db).createTable().then(
                (res) => {
             
                    let responseM: ResponseModel = new ResponseModel();
                    responseM.status = 0;

                    let objMs: Array<QuotationModel> = []; 

                    let sql: string = `SELECT quo.*` +  
                    ` ,(SELECT plancode FROM tlplan WHERE tlplan.plancode=quo.plancode) AS planc `+
                    ` ,(SELECT birthdate FROM prospect WHERE prospect.customerid=quo.customerid) AS pBirthdate`+
                    ` FROM quotation quo WHERE quo.agentid='` + reqM.agentid + `' AND quo.publishstatus='' order by quo.lastmodify desc limit 3;`;

                    //let sql: string = `SELECT * FROM quotation  WHERE agentid='` + reqM.agentid + `' AND publishstatus='' order by createdatetime desc;`;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Select getDataGruop03 success size " + result.rows.length);
                                    
                                    if (result.rows.length > 0) {

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let quotationM: QuotationModel  = result.rows.item(index);

                                            //console.log("===== Select getDataGruop03 xml =  " + JSON.stringify(result.rows.item(index)));

                                            let planc: string = result.rows.item(index).planc;
                                            let pBirthdate: string = result.rows.item(index).pBirthdate;

                                            if (planc != undefined && planc != null && planc != '') {
                                                quotationM.disabled = false;
                                            }
                                            else {
                                                quotationM.disabled = true;
                                            } 

                                            //console.log("pBirthdate => " + pBirthdate);
                                            //console.log("insureage => " + quotationM.insureage);
                                            if (pBirthdate != undefined && pBirthdate != null && pBirthdate != '') {
                                               // var ageProspect = moment().diff(moment(pBirthdate.replace(' ', 'T'), "YYYY-MM-DD"), 'year');

                                               let birthDate: Date = new Date(pBirthdate.replace(' ', 'T'));
                                                //console.log("pBirthdate ageProspect => " + ageProspect);
                                                if (Number(CalculateAgeUtil.calculateAge(birthDate)) != Number(quotationM.insureage)) {
                                                    quotationM.disabled = true;
                                                }
                                            }

                                            objMs.push(quotationM);
                                        }

                                        //console.log("===== Select getDataGruop03 success xml =  " + JSON.stringify(objMs));

                                    let chartMs: Array<ChartM> = [];
                                    let chartM: ChartM = new ChartM();
                                    chartM.quotationMs = objMs;

                                    chartMs.push(chartM);

                                        responseM.size = chartMs.length;
                                        responseM.data = chartMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = [];
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select getDataGruop03 error " + error.message);
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )
                }
            );
        });
    }

    public getDataGruop04(reqM: RequestModel) {
        return new Promise((resolve, reject) => {
            let responseM: ResponseModel = new ResponseModel();
            responseM.data = [];
            responseM.size = 0;
            responseM.status = 0;
            resolve(responseM);
            
        });
    }
}