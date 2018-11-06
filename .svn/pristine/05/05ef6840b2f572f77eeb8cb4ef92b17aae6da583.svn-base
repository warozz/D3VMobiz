import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ConectionDBName } from "../constants/connect-db-name";
import { ResponseModel } from "../model/response-model";
import { HealthM } from "./health-model";
import { SQLiteHandle } from "../utility/sqlite-handle";


export class HealthService {

    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- HealthService : insert ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: any[] = reqM.param;
                    if (objMs != null && objMs.length > 0) {
                        objMs.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_health +
                            `(
                                healthid, healthname, detailhealth
                            ) VALUES(
                                ?, ?, ?
                            )`;
                            //console.log(sql);
    
                            let paramSql = [
                                itemM.healthid, itemM.healthname, itemM.detailhealth
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        SQLiteHandle.recordBeWrite++;
                                        //console.log('==== Insert table tb_health successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_health error. ' + error);
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
        //console.log("----------- HealthService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<HealthM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [];
                    }
                    else {
                        reject("[pmrateMs[0].plancode] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_health + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_health success.");
                                    //resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_health error." + JSON.stringify(error));
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
        //console.log("----------- HealthService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_health;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_health success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_health error." + JSON.stringify(error));
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
        //console.log("----------- HealthService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<HealthM> = params; 
                    let responseM: ResponseModel = new ResponseModel();

                    let paramSQL = [];

                    let valArray: Array<string> = new Array<string>();

                    if (objMs != undefined && objMs.length > 0) {
                        objMs.forEach(itemM => { 
                            valArray.push("'" + itemM.healthid + "'");
                        });
                    }
                   
                    let healthidList: string = valArray.join(",");
                    
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_health + 
                    ` WHERE healthid IN (` + healthidList + `)`;

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_premiumpackage success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<HealthM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: HealthM  = result.rows.item(index);
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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_health error " + JSON.stringify(error));
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
        //console.log("----------- HealthService : count ------------" );

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let responseM: ResponseModel = new ResponseModel();
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_health;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_health error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_health + 
                            `(
                                healthid TEXT, healthname TEXT, detailhealth TEXT,
                                PRIMARY KEY (healthid)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_premiumpackage + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_health error." + JSON.stringify(error));
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