import { RequestModel } from "../model/request-model";
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ConectionDBName } from "../constants/connect-db-name";
import { dateDataSortValue } from "ionic-angular/util/datetime-util";
import { Injectable } from "@angular/core";

@Injectable()
export class QuotationDraftService {

    constructor(public platform: Platform, public db: SQLite) {}

    deleteDraft(reqM: RequestModel) {
        return new Promise((resolve, reject) => {

            this.selectDraft(reqM.agentid).then(
                (res)=> {
                    
                    let objMs: any = res;
                    if (objMs != undefined && objMs.length > 0) {
                        
                        objMs.forEach(itemM => {

                            let sql: string = " SELECT COUNT(*) as total FROM quotation ";
                            sql += "WHERE agentid='"+ itemM.agentid +"' AND customerid='"+ itemM.customerid  +"'";
                            //console.log("A = " + sql);

                            this.db.create(ConectionDBName.connectionDB).then(
                                (connection: SQLiteObject) => {
                                    connection.executeSql(sql, []).then(
                                        (result) => {

                                            let sizeQuotation: Number = result.rows.item(0).total;

                                            let sqlQA: string = "DELETE FROM quotationguardian WHERE ";
                                            sqlQA += " customerid='"+ itemM.customerid +"' AND quotationno='"+ itemM.quotationno +"'";
                                            //console.log("B = " + sqlQA);

                                            connection.executeSql(sqlQA, []).then(
                                                (result) => { }
                                                , (error) => { console.log(JSON.stringify(error)); }
                                            )

                                            let sqlQB: string = "DELETE FROM quotationrider WHERE ";
                                            sqlQB += " customerid='"+ itemM.customerid +"' AND quotationno='"+ itemM.quotationno +"'";
                                           // console.log("B = " + sqlQB);

                                            connection.executeSql(sqlQB, []).then(
                                                (result) => { }
                                                , (error) => { console.log(JSON.stringify(error)); }
                                            )

                                            let sqlQC: string = "DELETE FROM quotation WHERE ";
                                            sqlQC += " customerid='"+ itemM.customerid +"' AND quotationno='"+ itemM.quotationno +"' AND agentid='"+ itemM.agentid +"'";
                                            //console.log("C = " + sqlQC);

                                            connection.executeSql(sqlQC, []).then(
                                                (result) => { }
                                                , (error) => { console.log(JSON.stringify(error)); }
                                            )

                                            if (sizeQuotation == 1) {
                                                let sqlProspect: string = "DELETE FROM prospect WHERE ";
                                                sqlProspect += " customerid='"+ itemM.customerid +"' AND agentid='"+ itemM.agentid +"' AND flagdraftyn='Y'";
                                                //console.log("sqlProspect = " + sqlProspect);
    
                                                connection.executeSql(sqlProspect, []).then(
                                                    (result) => { }
                                                    , (error) => { console.log(JSON.stringify(error)); }
                                                )
                                            }

                                            resolve();

                                        }
                                        , (error) => {
                                            console.log(JSON.stringify(error));
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
                },
                (err)=> {
                    reject(err);
                }
            )
        });
    }

    selectDraft(agentid: string) {
        return new Promise((resolve, reject) => {

            let sql = "SELECT * FROM quotation WHERE agentid='"+ agentid +"' AND publishstatus='D'";

            this.db.create(ConectionDBName.connectionDB).then(
                (connection: SQLiteObject) => {
                    connection.executeSql(sql, []).then(
                        (res) => {
                            //console.log("===== selectDraft tb_quatation success.");
                            let objMs: Array<any> = [];
                            var len = res.rows.length;
                            for (var index = 0; index < len; index++) {
                                objMs.push(res.rows.item(index));
                            }

                            resolve(objMs);
                        }
                        , (err) => {
                            console.log("===== QuotationDraftService : selectDraft tb_quatation error." + JSON.stringify(err)); 
                            reject(err);
                        }
                    )

                }
                , (err) => {
                    console.log(err);
                    reject(err);
                }
            )
        });
    }

}