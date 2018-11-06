import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { QuotationGuardianM } from "./quotationguardian-model";
import { SQLiteHandle } from "../utility/sqlite-handle";
import { ResponseModel } from "../model/response-model";


export class QuotationGuardianService {

    constructor(public platform: Platform, public db: SQLite) {}
     
    public insert(reqM: RequestModel) { 
        //console.log("----------- QuotationGuardianService : insert ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: any[] = reqM.param;
                    if (objMs != null && objMs.length > 0) {
                        objMs.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_quotationguardian +
                            `(
                                quotationno, customerid, prename, firstname, lastname,
                                sex, birthdate, age, createdatetime, lastmodify,
                                lastsync, agentid
                            ) VALUES(
                                ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?,
                                ?, ?
                            )`;
                            //console.log(sql);
    
                            let paramSql = [
                                itemM.quotationno, itemM.customerid, itemM.prename, itemM.firstname, itemM.lastname,
                                itemM.sex, itemM.birthdate, itemM.age, itemM.createdatetime, itemM.lastmodify,
                                itemM.lastsync, itemM.agentid
                            ]; 
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {

                                        let num: number = SQLiteHandle.recordBeWrite; 
                                        SQLiteHandle.recordBeWrite = Number(num + 1);

                                        //console.log('==== Insert table tb_quotationguardian successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_quotationguardian error. ' + JSON.stringify(error));
                                    }
                                )
                            }
                            , (error) => {
                                reject(error);
                            });

                        });
                        
                        resolve();
                    }
                    else {
                        resolve();
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    
    public delete(reqM: any) { 
        //console.log("----------- PremiumPackageService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objM: RequestModel = reqM;

                    let objMs: Array<QuotationGuardianM> = objM.param; 
                    let paramSQL = [objMs[0].quotationno];
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_quotationguardian + ` WHERE quotationno=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    console.log("===== Delete tb_quotationguardian success.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_quotationguardian error." + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public deleteAll() {
        //console.log("----------- PremiumPackageService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_quotationguardian;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_quotationguardian success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_quotationguardian error." + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }
    
    public search(objM: any) {
        //console.log("----------- PremiumPackageService : search ------------" + JSON.stringify(objM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                   
                    let reqM: RequestModel = objM;
                    let lastSyncSession: string = reqM.lastsync;
                    let syncMode: boolean = reqM.syncMode;

                    let objMs: Array<QuotationGuardianM> = reqM.param;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_quotationguardian;
                    
                    if (objMs != null && objMs.length > 0) {

                        sql += ` WHERE customerid=? AND quotationno=?`;

                        paramSQL = [ objMs[0].customerid, objMs[0].quotationno ];
                    }

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_coupon success size " + result.rows.length);
                                    let quotationGuardianMs: Array<QuotationGuardianM> = [];

                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            
                                            let quotationGuardianM: QuotationGuardianM  = result.rows.item(index);
                                            if (syncMode != null && syncMode == true) {
                                                let lastmodify: string = quotationGuardianM.lastmodify;
                                                
                                                //console.log(">>>>>>>>>>>>>> quotationGuardianM lastSyncSession = " + lastSyncSession);
                                                //console.log(">>>>>>>>>>>>>> quotationGuardianM lastmodify = " + lastmodify);
                                                
                                                if (lastSyncSession != null && lastSyncSession != "") {
                                                    if (new Date(lastmodify.replace(' ', 'T')) > new Date(lastSyncSession.replace(' ', 'T'))) {
                                                        quotationGuardianMs.push(result.rows.item(index));
                                                    }
                                                }
                                                else {
                                                    quotationGuardianMs.push(result.rows.item(index));
                                                }

                                                responseM.size = quotationGuardianMs.length;
                                            }
                                            else {
                                                quotationGuardianMs.push(quotationGuardianM);
                                            }
                                        }

                                        responseM.size = quotationGuardianMs.length;
                                        responseM.data = quotationGuardianMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = quotationGuardianMs;
                                        responseM.size = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_quotationguardian error " + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public count() {
        //console.log("----------- PlanDetailService : count ------------" );

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let responseM: ResponseModel = new ResponseModel();

                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_quotationguardian;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Select count success size " + result.rows.length);
                                    responseM.size = result.rows.item(0).total;
                                    responseM.status = 0;
                                    resolve(responseM);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_quotationguardian error " + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public drop() {
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DROP TABLE " + TB_SQLITE.tb_quotationguardian;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table tb_quotationguardian seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop tb_quotationguardian error " + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            reject(error);
                        }
                    )
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public createTable() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(
                () => {
                    this.db.create(ConectionDBName.connectionDB)
                        .then(
                        (connection: SQLiteObject) => {
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_quotationguardian + 
                            `(
                                quotationno TEXT, customerid TEXT, prename TEXT, firstname TEXT, lastname TEXT,
                                sex TEXT, birthdate TEXT, age TEXT, createdatetime TEXT, lastmodify TEXT,
                                lastsync TEXT, agentid TEXT,
                                PRIMARY KEY (quotationno, customerid)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_quotationguardian + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_quotationguardian error." + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                        ).catch((error) => {
                            console.log(error);
                            reject(error);
                        })
                }
                , (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    } 

}