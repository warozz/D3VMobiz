import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { SumrateoM } from "./sumrateo-model";
import { ResponseModel } from "../../model/response-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";


export class SumrateoService {
   
    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- SumrateoService : insert ------------");
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
                                        "sumrateo": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;  
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                },
                                (err) => {
                                    console.log("******************* sumrateo " + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });

                        /**
                        objMs.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_sumrateo +
                            `(
                                plancode, sex, premium, insuredage, sum, 
                                reserve
                            ) VALUES(
                                ?, ?, ?, ?, ?, 
                                ?
                            )`;
                            //console.log(sql);
    
                            let paramSql = [
                                itemM.plancode, itemM.sex, itemM.premium, itemM.insuredage, itemM.sum,
                                itemM.reserve
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        SQLiteHandle.recordBeWrite++;
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_sumrateo error. ' + error);
                                    }
                                )
                            }
                            , (error) => {
                                reject(error);
                            });

                        });
                         */
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
    
    public delete(params: any) {
        //console.log("----------- SumrateoService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<SumrateoM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [objMs[0].plancode];
                    }
                    else {
                        reject("[objMs[0].plancode] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_sumrateo + ` WHERE stepcode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                   // console.log("===== Delete tb_sumrateo success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_sumrateo error." + error + " : " + error.message);
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
        //console.log("----------- SumrateoService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_sumrateo;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_sumrateo success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_sumrateo error." + error + " : " + error.message);
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
    
    public search(params: any) {

        //console.log("----------- SumrateoService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<SumrateoM> = params; 
                    let responseM: ResponseModel = new ResponseModel();

                    
                    let paramSQL = [];
                    if (objMs != undefined) {
                        paramSQL = [objMs[0].plancode, objMs[0].sex, Number(objMs[0].premium), Number(objMs[0].insuredage)];
                    }

                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_sumrateo + 
                    ` WHERE plancode=? AND sex=? AND premium=? AND insuredage=?;`;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    
                                    //console.log("===== Select tb_sumrateo success size " + result.rows.length);
                                    
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<SumrateoM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: SumrateoM  = result.rows.item(index);
                                            objMs.push(objM);
                                        }

                                        //onsole.log("===== Select tb_sumrateo objMs " + JSON.stringify(objMs));

                                        responseM.data = objMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , 
                                (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_sumrateo error " + error.message);
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_sumrateo;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_sumrateo error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_sumrateo + 
                            `(
                                plancode TEXT, sex TEXT, premium INTEGER, insuredage INTEGER, sum INTEGER,
                                reserve TEXT,
                                PRIMARY KEY (plancode, sex, premium, insuredage)
                            );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_sumrateo + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table " + TB_SQLITE.tb_sumrateo + " error.");
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