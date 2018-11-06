import { ApplicationModel } from './application-model';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { ResponseModel } from "../model/response-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { SQLiteHandle } from '../utility/sqlite-handle';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

    constructor(public platform: Platform, public db: SQLite) {

    }

    public insert(request: RequestModel) {
        //console.log("----------- ApplicationService : insert request.params ------------" + JSON.stringify(request));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objM: any[] = request.param;
                    if (objM != null && objM.length > 0) {
                        objM.forEach(itemM => {
                            this.querySize(itemM).then((res) => {
                                let obj: any = res;
                                let resM: ResponseModel = obj;
                                if (0 != resM.size) {
                                    this.update(itemM);
                                }
                                else {

                                    let sql = `INSERT INTO ` + TB_SQLITE.tb_application +
                                        `(  quotationno, customerid, applicationno, agentid, status,
                                            type, createdatetime, lastmodify, lastsync
                                        ) VALUES(
                                            ?, ?, ?, ?, ?, 
                                            ?, ?, ?, ?
                                        )`;
                                    //console.log(sql);

                                    let paramSql = [
                                        itemM.quotationno, itemM.customerid, itemM.applicationno, itemM.agentid, itemM.status,
                                        itemM.type, itemM.createdatetime, itemM.lastmodify, itemM.lastsync
                                    ];

                                    this.db.create(ConectionDBName.connectionDB).then(
                                        (connection: SQLiteObject) => {
                                            connection.executeSql(sql, paramSql).then(
                                                (result) => {
                                                    SQLiteHandle.recordBeWrite++;
                                                    //console.log('==== Insert tb_application successfully.');
                                                }
                                                , (error) => {
                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert tb_application error. ' + JSON.stringify(error));
                                                }
                                            )
                                        }
                                        , (error) => {
                                            reject(error);
                                        }
                                    ).catch((error) => {
                                        reject(error);
                                    });
                                }
                            });
                        });
                        //console.log("End forEach ------------ tb_application : insert ---------------");
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

    public update(objM: ApplicationModel) {
        //console.log("----------- ApplicationService : update ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + TB_SQLITE.tb_application;
                        sql += " SET ";
                        sql += " status=?, type=?, createdatetime=?,";
                        sql += " lastmodify=?, lastsync=? WHERE quotationno=? AND customerid=?;";
                        //console.log(sql);

                        let paramSql = [
                            
                        ];

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                       // console.log("===== Update tb_application successfully.");
                                       SQLiteHandle.recordBeWrite++;
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("===== Update tb_application error. " + error + " | " + error.message);
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
                    catch (error) {
                        console.log(error);
                        reject(error);
                    }
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public search(obj: any) {
       // console.log("----------- ApplicationService : search ------------ = " + JSON.stringify(obj));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let reqM: RequestModel = obj;
                    let lastSyncSession: string = reqM.lastsync;
                    let syncMode: boolean = reqM.syncMode;

                    let objMs: Array<ApplicationModel> = reqM.param;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT * FROM " + TB_SQLITE.tb_application + ";";

                    if (objMs[0].quotationno != "" && objMs[0].customerid != "") {
                        sql = "SELECT * FROM " + TB_SQLITE.tb_application + " WHERE quotationno=? AND customerid=?;";
                        paramSQL = [objMs[0].quotationno, objMs[0].customerid];
                    }
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_application success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let applicationMs: Array<ApplicationModel> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let applicationM: ApplicationModel  = result.rows.item(index);

                                            if (syncMode != null && syncMode == true) {
                                                //let lastmodify: string = applicationM.lastmodify;
                                                //console.log(">>>>>>>>>>>>>> ApplicationModel lastSyncSession = " + lastSyncSession);
                                                //console.log(">>>>>>>>>>>>>> ApplicationModel lastmodify = " + lastmodify);
                                                
                                                if (lastSyncSession != null && lastSyncSession != "") {
                                                    // if (new Date(lastmodify) > new Date(lastSyncSession)) {
                                                    //     applicationMs.push(result.rows.item(index));
                                                    // }

                                                    applicationMs.push(result.rows.item(index));
                                                }
                                                else {
                                                    applicationMs.push(result.rows.item(index));
                                                }

                                                responseM.size = applicationMs.length;
                                            }
                                            else {
                                                applicationMs.push(applicationM);
                                            }
                                        }

                                        responseM.size = applicationMs.length;
                                        responseM.data = applicationMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== SELECT ERROR " + error.message);
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

    public querySize(objM: ApplicationModel) {
        //console.log("----------- ApplicationService : querySize ------------ = " + JSON.stringify(objM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let responseM: ResponseModel = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT * FROM " + TB_SQLITE.tb_application + "";

                        if (objM.quotationno != "" && objM.customerid != "") {
                            sql += " WHERE quotationno=? AND customerid=?;";
                            paramSQL = [objM.quotationno, objM.customerid];
                        }
                        //console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        //console.log("===== Select tb_application querySize size " + result.rows.length);
                                        responseM.size = result.rows.length;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==>Select tb_application querySize error " + error.message);
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
                    catch (error) {
                        console.log(error);
                        reject(error);
                    }
                },
                (err) => {
                    console.log(err);
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

                            let sql: string = "CREATE TABLE IF NOT EXISTS " + TB_SQLITE.tb_application;
                            sql += "(";
                            sql += "quotationno TEXT, customerid TEXT, applicationno TEXT, agentid TEXT, status TEXT, ";
                            sql += "type TEXT, createdatetime TEXT, lastmodify TEXT, lastsync TEXT, ";
                            sql += " PRIMARY KEY (quotationno, applicationno)";
                            sql += ");";

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_application + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table error." + JSON.stringify(error));
                                    console.log(error);
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