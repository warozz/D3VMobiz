import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from "../../constants/connect-db-name";
import { TaxFormulaM } from "./tax-formula-model";
import { ResponseModel } from "../../model/response-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";

export class TaxFormulaService {
    
    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- TaxFormulaService : insert ------------");
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
                                        "taxformula": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                },
                                (err) => {
                                    console.log("******************* taxformula " + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });

                        /**
                        objMs.forEach(itemM => {

                            let sql = `INSERT INTO ` + TB_SQLITE.tb_taxformula +
                            `(
                                multiplysum, plancode, subtractpremium
                            ) VALUES(
                                ?, ?, ?
                            )`;
    
                            let paramSql = [
                                itemM.multiplysum, itemM.plancode, itemM.subtractpremium
                            ];
                            
                            this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        SQLiteHandle.recordBeWrite++;
                                        //console.log('==== Insert table tb_taxformula successfully.');
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_taxformula error. ' + error);
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
        //console.log("----------- TaxFormulaService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<TaxFormulaM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [objMs[0].plancode];
                    }
                    else {
                        reject("[objM[0].plancode] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_taxfixrate + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_taxfixrate success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_taxformula error." + error + " : " + error.message);
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
        //console.log("----------- TaxFormulaService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_taxformula;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_taxformula success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_taxformula error." + error + " : " + error.message);
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
        //console.log("----------- TaxFormulaService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<TaxFormulaM> = params; 
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "";

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [ objMs[0].plancode ];
                        sql = `SELECT * FROM ` + TB_SQLITE.tb_taxformula + 
                        ` WHERE plancode=? `;
                    }
                    else {
                        sql = `SELECT * FROM ` + TB_SQLITE.tb_taxformula;
                    } 

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_taxformula success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<TaxFormulaM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: TaxFormulaM  = result.rows.item(index);
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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_taxformula error " + error.message);
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_taxformula;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_taxformula error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_taxformula + 
                            `(
                                multiplysum TEXT, plancode TEXT, subtractpremium TEXT,
                                PRIMARY KEY (plancode)
                                );`;

                                connection.executeSql(sql, []).then(
                                    (res) => {
                                        //console.log("Create table " + TB_SQLITE.tb_taxformula + " successfully.");
                                        resolve(res);
                                    }
                                    , (err) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_taxformula error." + JSON.stringify(err));
                                        reject(err);
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