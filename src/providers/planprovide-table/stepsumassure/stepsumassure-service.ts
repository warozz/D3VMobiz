import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { StepSumAssureM } from "./stepsumassure-model";
import { ResponseModel } from "../../model/response-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";


export class StepSumAssureService {
    
    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- StepSumAssureService : insert ------------");
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
                                        "stepsumassure": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                },
                                (err) => {
                                    console.log("******************* stepsumassure " + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });

                        /**
                        objMs.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_stepsumassure +
                            `(
                                stepcode, minsum, maxsum, step
                            ) VALUES(
                                ?, ?, ?, ?
                            )`;
                            //console.log(sql);
    
                            let paramSql = [
                                itemM.stepcode, itemM.minsum, itemM.maxsum, itemM.step
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        SQLiteHandle.recordBeWrite++;
                                        //console.log('==== Insert table tb_stepsumassure successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_stepsumassure error. ' + JSON.stringify(error));
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
        //console.log("----------- StepSumAssureService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<StepSumAssureM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [objMs[0].stepcode];
                    }
                    else {
                        reject("[pmrateMs[0].stepcode] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_stepsumassure + ` WHERE stepcode=?`;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_stepsumassure success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_stepsumassure error." + error + " : " + error.message);
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
        //console.log("----------- StepSumAssureService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_stepsumassure;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_stepsumassure success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_stepsumassure error." + error + " : " + error.message);
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
        console.log("----------- StepSumAssureService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<StepSumAssureM> = params; 
                    let responseM: ResponseModel = new ResponseModel();

                    let paramSQL = [];
                    if (objMs != null && objMs != undefined) {
                        paramSQL = [objMs[0].stepcode, objMs[0].sum];
                    }
                    
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_stepsumassure + 
                    ` WHERE stepcode=? AND (? BETWEEN minsum AND maxsum)`;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_stepsumassure success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<StepSumAssureM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: StepSumAssureM  = result.rows.item(index);
                                            objMs.push(objM);
                                        }

                                        responseM.data = objMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_stepsumassure error " + error.message);
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
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let responseM: ResponseModel = new ResponseModel();
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_stepsumassure;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_stepsumassure error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_stepsumassure + 
                            `(
                                stepcode TEXT, minsum TEXT, maxsum TEXT, step TEXT, sum TEXT,
                                PRIMARY KEY (stepcode, minsum, maxsum)
                            );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_stepsumassure + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table " + TB_SQLITE.tb_stepsumassure + " error.");
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