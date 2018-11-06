import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { FeeM } from "./fee-model";
import { ResponseModel } from "../../model/response-model";

export class FeeService {
    
    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- FeeService : insert ------------" + JSON.stringify(reqM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: any[] = reqM.param;
                    if (objMs != null && objMs.length > 0) {
                        objMs.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_fee +
                            `(
                                plan, addsum
                            ) VALUES(
                                ?, ?
                            )`;
    
                            let paramSql = [
                                itemM.plan, itemM.addsum
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        
                                        SQLiteHandle.recordBeWrite++;
                                       //console.log('==== Insert table tb_fee successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_fee error. ' + JSON.stringify(error));
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
    
    public delete(params: any) {
        //console.log("----------- FeeService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<FeeM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [objMs[0].plan];
                    }
                    else {
                        reject("[objM[0].plan] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_fee + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_fee success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_fee error." + JSON.stringify(error));
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
        //console.log("----------- FeeService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_fee;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_fee success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_fee error." + error + " : " + error.message);
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
        //console.log("----------- FeeService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<FeeM> = params; 
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "";

                    if (objMs != null && objMs.length > 0) {
                        
                        paramSQL = [ objMs[0].plan ];

                        sql = `SELECT * FROM ` + TB_SQLITE.tb_fee + 
                        ` WHERE plan=?`;
                    }
                    else {
                        sql = `SELECT * FROM ` + TB_SQLITE.tb_fee;
                    } 

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_fee success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<FeeM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: FeeM  = result.rows.item(index);
                                            objMs.push(objM);
                                        }

                                        responseM.data = objMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        let objMs: Array<FeeM> = [];
                                        responseM.data = objMs;
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_fee error " + JSON.stringify(error));
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_fee;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                   // console.log("===== Select count success size " + result.rows.length);
                                    responseM.size = result.rows.item(0).total;
                                    responseM.status = 0;
                                    resolve(responseM);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_fee error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_fee + 
                            `(
                                plan TEXT, addsum TEXT,
                                PRIMARY KEY (plan)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_fee + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_fee error." + JSON.stringify(error));
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