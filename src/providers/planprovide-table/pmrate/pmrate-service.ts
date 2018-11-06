import { PmrateM } from './pmrate-model';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { ResponseModel } from '../../model/response-model';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLiteHandle } from '../../utility/sqlite-handle';



export class PmrateService {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
        public insert(reqM: RequestModel) {
            //console.log("----------- PmrateService : insert ------------");
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
                                            "pmrate" : objMs
                                        }
                                    }
                                };
    
                                this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                    () => {
                                        let num: number = SQLiteHandle.recordBeWrite;
                                        SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                    },
                                    (err) => {
                                        console.log("******************* tb_pmrate " + JSON.stringify(err));
                                        reject(err);
                                    }
                                );
                              });

                             /**
                             * 
                            objM.forEach(itemM => { 
                                let sql = `INSERT INTO ` + TB_SQLITE.tb_pmrate +
                                `(
                                    plancode, typex, mode, insuredage, premium,
                                    reserve
                                ) VALUES(
                                    ?, ?, ?, ?, ?, 
                                    ?
                                )`;
                                //console.log(sql);
        
                                let paramSql = [
                                    itemM.plancode, itemM.typex, itemM.mode, itemM.insuredage, itemM.premium,
                                    itemM.reserve
                                ];
                                
                                this.db.create(ConectionDBName.connectionDB).then(
                                (connection: SQLiteObject) => {
                                    connection.executeSql(sql, paramSql).then(
                                        (result) => {
                                            //console.log('==== Insert table tb_pmrate successfully.');
                                        }
                                        , (error) => {
                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_pmrate error. ' + JSON.stringify(error));
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
    
        public delete(objMs: any) {
            //console.log("----------- PmrateService : delete ------------" + JSON.stringify(objMs));
    
            return new Promise((resolve, reject) => {
                this.createTable().then(
                    (res) => {
                        let pmrateMs: Array<PmrateM> = objMs; 
                        let paramSQL = [];

                        if (pmrateMs != null && pmrateMs.length > 0) {
                            paramSQL = [pmrateMs[0].plancode];
                        }
                        else {
                            reject("[pmrateMs[0].plancode] is null");
                        }
                        
                        let sql = `DELETE FROM ` + TB_SQLITE.tb_pmrate + ` WHERE plancode=?`;
                        //console.log(sql);
    
                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        //console.log("===== Delete tb_pmrate success.");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_pmrate error." + JSON.stringify(error));
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
            
            //console.log("----------- PmrateService : search ------------" + JSON.stringify(objMs));
    
            return new Promise((resolve, reject) => {
                this.createTable().then(
                    (res) => {
                        let pmrateMs: Array<PmrateM> = objMs; 
                        let responseM: ResponseModel = new ResponseModel();
    
                        let paramSQL = [pmrateMs[0].plancode, pmrateMs[0].typex, pmrateMs[0].mode, pmrateMs[0].insuredage];
                        
                        let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_pmrate + 
                        ` WHERE plancode=? AND typex=? AND mode=? AND insuredage=?`;
    
                        //console.log(sql);
                        //console.log(paramSQL);
    
                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        //console.log("===== Select tb_pmrate success size " + result.rows.length);
                                        responseM.size = result.rows.length;
                                        responseM.status = 0;
                                        if (result.rows.length > 0) {
    
                                            let pmrateMs: Array<PmrateM> = [];
                                            var len = result.rows.length;
                                            for (var index = 0; index < len; index++) {
                                                let pmrateM: PmrateM  = result.rows.item(index);
                                                pmrateMs.push(pmrateM);
                                            }
    
                                            responseM.data = pmrateMs;
                                            resolve(responseM);
                                        }
                                        else {
                                            responseM.size = 0;
                                            responseM.status = 0;
                                            resolve(responseM);
                                        }
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_pmrate error " + JSON.stringify(error));
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
                                let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_pmrate + 
                                `(
                                    plancode TEXT, typex TEXT, mode TEXT, insuredage INTEGER, premium TEXT, 
                                    reserve TEXT,
                                    PRIMARY KEY (plancode, typex, mode, insuredage)
                                 );`;
    
                                connection.executeSql(sql, []).then(
                                    (result) => {
                                        //console.log("Create table " + TB_SQLITE.tb_pmrate + " successfully.");
                                        resolve(result);
                                    }
                                    , (error) => {
                                        console.log("Create table tb_pmrate error." + JSON.stringify(error));
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