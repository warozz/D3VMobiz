import { RiderDetailM } from './riderdetail-model';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { ResponseModel } from '../model/response-model';
import { Injectable } from '@angular/core';

@Injectable()
export class RiderDetailService {

    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
        console.log("----------- RiderDetailService : insert ------------" + JSON.stringify(reqM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objM: any[] = reqM.param;
                    if (objM != null && objM.length > 0) {
                        
                        objM.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_riderdetail +
                            `(
                                plancode, ridercode, ridertype, ridername, fullname,
                                minage, maxage, minsum, maxsum, riderminsum,
                                ridermaxsum, riderstep, status, gender, issuedate
                            ) VALUES(
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?
                            )`;
                            console.log(sql);
    
                            let paramSql = [
                                itemM.plancode, itemM.ridercode, itemM.ridertype, itemM.ridername, itemM.fullname,
                                itemM.minage, itemM.maxage, itemM.minsum, itemM.maxsum, itemM.riderminsum,
                                itemM.ridermaxsum, itemM.riderstep, itemM.status, itemM.gender, itemM.issuedate
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        console.log('==== Insert table tb_riderdetail successfully.');
                                    }
                                    , (error) => {
                                        console.log('==== Insert table tb_riderdetail error. ' + error);
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

    public delete(objMs: any) {
        console.log("----------- RiderDetailService : delete ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let riderDetailM: Array<RiderDetailM> = objMs;
                    let paramSQL = [];
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_riderdetail + ` WHERE plancode=?`;

                    if (riderDetailM != null && riderDetailM.length > 0) {
                        paramSQL = [riderDetailM[0].plancode];
                    }
                    else {
                        reject("riderDetailM[0].plancode is null.");
                    }

                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Delete tb_riderdetail success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Delete tb_riderdetail error." + error + " : " + error.message);
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
        console.log("----------- RiderDetailService : search ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let riderDetailM: Array<RiderDetailM> = objMs;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_riderdetail + `
                    WHERE plancode=?`;

                    if (riderDetailM != null && riderDetailM.length > 0) {
                        paramSQL = [riderDetailM[0].plancode];
                    }

                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    console.log("===== Select tb_riderdetail success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let riderDetailMs: Array<RiderDetailM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let riderDetailM: RiderDetailM  = result.rows.item(index);
                                            riderDetailMs.push(riderDetailM);
                                        }

                                        responseM.data = riderDetailMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== Select tb_riderdetail error " + error.message);
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_riderdetail + 
                            `(
                                plancode TEXT, ridercode TEXT, ridertype TEXT, ridername TEXT, fullname TEXT,
                                minage TEXT, maxage TEXT, minsum TEXT, maxsum TEXT, riderminsum TEXT,
                                ridermaxsum TEXT, riderstep TEXT, status TEXT, gender TEXT, issuedate TEXT,
                                PRIMARY KEY (plancode, ridercode)
                             );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("Create table " + TB_SQLITE.tb_riderdetail + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("Create table " + TB_SQLITE.tb_riderdetail + " error.");
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