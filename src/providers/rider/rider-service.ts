import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { RiderModel } from "./rider-model";
import { ResponseModel } from "../model/response-model";


export class RiderService {

    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
        console.log("----------- RiderService : insert ------------" + JSON.stringify(reqM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objM: any[] = reqM.param;
                    if (objM != null && objM.length > 0) {
                        
                        objM.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_rider +
                            `(
                                ridercodeen, ridercode, ridername, ridertype, effectivedate,
                                expiredate, maxage, maxsum, minage, minsum,
                                ridermaxsum, riderminsum, riderstep, status
                            ) VALUES(
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?
                            )`;
                            console.log(sql);
    
                            let paramSql = [
                                itemM.ridercodeen, itemM.ridercode, itemM.ridername, itemM.ridertype, itemM.effectivedate,
                                itemM.expiredate, itemM.maxage, itemM.maxsum, itemM.minage, itemM.minsum,
                                itemM.ridermaxsum, itemM.riderminsum, itemM.riderstep, itemM.status
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        console.log('==== Insert table tb_rider successfully.');
                                    }
                                    , (error) => {
                                        console.log('==== Insert table tb_rider error.'  + error);
                                    }
                                )
                            }
                            , (error) => {
                                reject(error);
                            }
                            ).catch((error) => {
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

    public deleteAll() {
        console.log("----------- RiderService : deleteAll ------------");

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_rider;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Delete tb_rider success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Delete tb_rider error." + error + " : " + error.message);
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
        console.log("----------- RiderService : search ------------" + JSON.stringify(objM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objs: Array<RiderModel> = objM;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [objs[0].ridercodeen];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_rider + `
                    WHERE ridercodeen=?`;

                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    console.log("===== Select tb_rider success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let riderMs: Array<RiderModel> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let riderM: RiderModel  = result.rows.item(index);
                                            riderMs.push(riderM);
                                        }

                                        responseM.data = riderMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== Select tb_rider error " + error.message);
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_rider + 
                            `(
                                ridercodeen TEXT, ridercode TEXT, ridername TEXT, ridertype TEXT, effectivedate TEXT,
                                expiredate TEXT, maxage TEXT, maxsum TEXT, minage TEXT, minsum TEXT,
                                ridermaxsum TEXT, riderminsum TEXT, riderstep TEXT, status TEXT,
                                PRIMARY KEY (ridercodeen)
                             );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("Create table " + TB_SQLITE.tb_rider + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("Create table " + TB_SQLITE.tb_rider + " error.");
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