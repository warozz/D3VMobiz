import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { RequestModel } from '../../model/request-model';
import { TB_SQLITE } from '../../constants/table-config';
import { ConectionDBName } from '../../constants/connect-db-name';
import { PlanRiderModel } from './planrider-model';
import { ResponseModel } from '../../model/response-model';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLiteHandle } from '../../utility/sqlite-handle';

@Injectable()
export class PlanRiderService {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}

    public insert(reqM: RequestModel) {
        //console.log("----------- PlanRiderService : insert ------------" + JSON.stringify(reqM));

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
                                        "planrider": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                },
                                (err) => {
                                    console.log("******************* planrider " + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });

                        /**
                        objM.forEach(itemM => { 
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_planrider +
                            `(
                                plancode, ridercode, ridertype, ridername, fullname,
                                minage, maxage, minsum, maxsum, riderminsum,
                                ridermaxsum, riderstep, status, gender, sum,
                                age, issuedate, hiddenrider
                            ) VALUES(
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?,
                                ?, ?, ?
                            )`;
                            //console.log(sql);
    
                            let paramSql = [
                                itemM.plancode, itemM.ridercode, itemM.ridertype, itemM.ridername, itemM.fullname,
                                itemM.minage, itemM.maxage, itemM.minsum, itemM.maxsum, itemM.riderminsum,
                                itemM.ridermaxsum, itemM.riderstep, itemM.status, itemM.gender, itemM.sum,
                                itemM.age, itemM.issuedate, itemM.hiddenrider
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        console.log('==== Insert table tb_planrider successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_planrider error. ' + JSON.stringify(error));
                                    }
                                )
                            }
                            , (error) => {
                                reject(error);
                            });

                        });
                         **/
                      
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
        //console.log("----------- PlanRiderService : delete ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let planRiderMs: Array<PlanRiderModel> = objMs; 
                    let paramSQL = [];

                    if (planRiderMs[0].plancode != null && planRiderMs[0].plancode != "") {
                        paramSQL = [planRiderMs[0].plancode];
                    }
                    else {
                        reject("planRiderMs[0].plancode is null.");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_planrider + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_planrider success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_planrider error. " + JSON.stringify(error));
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
        //console.log("----------- PlanRiderService : search ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let planRiderMs: Array<PlanRiderModel> = objMs; 
                    let responseM: ResponseModel = new ResponseModel();

                    let paramSQL = [planRiderMs[0].plancode];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_planrider +  ` WHERE plancode=?`;
                   // let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_planrider;
                    //` WHERE plancode=? AND (? BETWEEN minage AND maxage) AND (? BETWEEN minsum AND maxsum)`;
 
                   // console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                   // console.log("===== Select tb_planrider success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let planRiderMs: Array<PlanRiderModel> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let planRiderM: PlanRiderModel  = result.rows.item(index);
                                            planRiderM.hiddenrider = result.rows.item(index).hiddenrider == 'true' ? true : false; 
                                            planRiderMs.push(planRiderM);
                                        }

                                        responseM.data = planRiderMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = [];
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== Select tb_planrider error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_planrider + 
                            `(
                                plancode TEXT, ridercode TEXT, ridertype TEXT, ridername TEXT, fullname TEXT,
                                minage TEXT, maxage TEXT, minsum TEXT, maxsum TEXT, riderminsum TEXT,
                                ridermaxsum TEXT, riderstep TEXT, status TEXT, gender TEXT, sum TEXT,
                                age TEXT, issuedate TEXT, hiddenrider TEXT,
                                PRIMARY KEY (plancode, ridercode)
                             );`;
 
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_planrider + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_planrider error." + JSON.stringify(error));
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