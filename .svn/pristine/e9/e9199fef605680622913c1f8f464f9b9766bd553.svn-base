import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Injectable } from "@angular/core";
import { PlanDetailM } from "./plandetail-model";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { ResponseModel } from "../../model/response-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";

@Injectable()
export class PlanDetailService {
    
    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) { 
        
        //console.log("----------- PlanDetailService : insert ------------ XML = " + JSON.stringify(reqM));
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => { 
                    let objMs: any[] = reqM.param;
                    if (objMs != null && objMs.length > 0) {
                        
                        this.db.create(ConectionDBName.connectionDB).then((db: any) => {
                            let dbInstance = db._objectInstance;
                            let sqlJsonBlock = {
                                "data":{
                                    "inserts":{
                                        "plandetail": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                },
                                (err) => {
                                    console.log("******************* plandetail " + JSON.stringify(err));
                                    reject(err);
                                }
                            );
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
    
    public delete(objMs: any) {
        //console.log("----------- PlanDetailService : delete ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let planDetailMs: Array<PlanDetailM> = objMs; 
                    let paramSQL = [];

                    if (planDetailMs != null && planDetailMs.length > 0) {
                        paramSQL = [planDetailMs[0].plancode];
                    }
                    else {
                        reject("planDetailMs[0].plancode is null.");
                    }

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_plandetail + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete tb_plandetail success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_plandetail error." + JSON.stringify(error));
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
        //console.log("----------- PlanDetailService : deleteAll ------------");

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_plandetail;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_plandetail success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_plandetail error." + error + " : " + JSON.stringify(error));
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
    
    public search(objMs: any) {
        //console.log("----------- PlanDetailService : search ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let planDetailMs: Array<PlanDetailM> = objMs; 
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "";

                    if (planDetailMs != undefined && planDetailMs.length > 0) {
                        paramSQL = [planDetailMs[0].plancode];
                        sql = `SELECT * FROM ` + TB_SQLITE.tb_plandetail + ` WHERE plancode=?`;
                    }
                    else {
                        sql = `SELECT * FROM ` + TB_SQLITE.tb_plandetail;
                    }
                    
                   // console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                   // console.log("===== Select tb_plandetail success size " + result.rows.length);
                                    
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let planDetailMs: Array<PlanDetailM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            //console.log("===== Select tb_plandetail XML " + JSON.stringify(result.rows.item(index)));

                                            let planDetailM: PlanDetailM  = result.rows.item(index);
                                            planDetailMs.push(planDetailM);
                                        }

                                        responseM.data = planDetailMs;
                                        responseM.size = planDetailMs.length;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_plandetail error " + JSON.stringify(error));
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

    public searchByGroup(objMs: any) {
        //console.log("----------- PlanDetailService : searchByGroup ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let planDetailMs: Array<PlanDetailM> = objMs; 
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "";
                    let plancodes: string = "";

                    if (planDetailMs != undefined && planDetailMs.length > 0) {

                        for (let i = 0; i < planDetailMs.length; i++) {
                            if (i < planDetailMs.length - 1) {
                                plancodes += "'"+ planDetailMs[i].plancode +"', ";
                            }
                            else {
                                plancodes += "'"+ planDetailMs[i].plancode +"'";
                            }
                        }
                    }

                    sql = `SELECT * FROM ` + TB_SQLITE.tb_plandetail + ` WHERE plancode IN (`+ plancodes +`)`;
                   //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                   // console.log("===== Select tb_plandetail success size " + result.rows.length);
                                    
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let planDetailMs: Array<PlanDetailM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            //console.log("===== Select tb_plandetail XML " + JSON.stringify(result.rows.item(index)));

                                            let planDetailM: PlanDetailM  = result.rows.item(index);
                                            planDetailMs.push(planDetailM);
                                        }

                                        responseM.data = planDetailMs;
                                        responseM.size = planDetailMs.length;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_plandetail error " + JSON.stringify(error));
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_plandetail;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_plandetail error " + JSON.stringify(error));
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
    
    public createTable() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(
                () => {
                    this.db.create(ConectionDBName.connectionDB)
                        .then(
                        (connection: SQLiteObject) => {
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_plandetail + 
                            `(
                                plancode TEXT, plandetail TEXT, name TEXT, fullname TEXT, type TEXT,
                                PRIMARY KEY (plancode) 
                            );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_plandetail + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_plandetail error." + JSON.stringify(error));
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