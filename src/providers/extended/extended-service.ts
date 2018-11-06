import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { SQLiteHandle } from "../utility/sqlite-handle";
import { ExtendedM } from "./extended-model";
import { ResponseModel } from "../model/response-model";
import { SQLitePorter } from "@ionic-native/sqlite-porter";


export class ExtendedService { 

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) {
        //console.log("----------- ExtendedService : insert ------------" + JSON.stringify(reqM));
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
                                        "extended": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);
                                    
                                },
                                (err) => {
                                    console.log("******************* extended " + JSON.stringify(err));
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
    
    public delete(params: any) {
        //console.log("----------- PremiumPackageService : delete ------------" + JSON.stringify(params));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<ExtendedM> = params; 
                    let paramSQL = [];

                    if (objMs != null && objMs.length > 0) {
                        paramSQL = [objMs[0].plancode];
                    }
                    else {
                        reject("[pmrateMs[0].plancode] is null");
                    }
                    
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_extended + ` WHERE plancode=?`;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_extended success.");
                                    //resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_extended error." + JSON.stringify(error));
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
        //console.log("----------- PremiumPackageService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let sql = `DELETE FROM ` + TB_SQLITE.tb_extended;

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_premiumpackage success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_extended error." + JSON.stringify(error));
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
        //console.log("----------- ExtendedService : search ------------" + JSON.stringify(params));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objMs: Array<ExtendedM> = params; 
                    let responseM: ResponseModel = new ResponseModel();

                    let paramSQL = [];
                    
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_extended + 
                    ` WHERE plancode=? AND sex=? AND insuredage=? order by year asc`;

                    //console.log(sql);
                    paramSQL = [ objMs[0].plancode, objMs[0].sex, objMs[0].insuredage ];

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;

                                    let objMs: Array<ExtendedM> = [];

                                    if (result.rows.length > 0) {
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let objM: ExtendedM  = result.rows.item(index);
                                            objMs.push(objM);
                                        }

                                        //console.log("----------- ExtendedService : search objMs = " + JSON.stringify(objMs));
                                        //console.log("----------- ExtendedService : search objMs length = " + objMs.length);

                                        responseM.data = objMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = objMs;
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_extended error " + JSON.stringify(error));
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_extended;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_extended error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_extended + 
                            `(
                                plancode TEXT, sex TEXT, insuredage INTEGER, year INTEGER, cashvalue INTEGER, 
                                paidupcash INTEGER, paidupsum INTEGER, extendcash INTEGER, extendyear INTEGER, extendday INTEGER,
                                pureendowment INTEGER, reserve TEXT,

                                PRIMARY KEY (plancode, sex, insuredage, year)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_extended + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_extended error." + JSON.stringify(error));
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