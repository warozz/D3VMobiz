import {SQLiteHandle} from '../utility/sqlite-handle';
import {ResponseModel} from '../model/response-model';
import {TB_SQLITE} from '../constants/table-config';
import {ConectionDBName} from '../constants/connect-db-name';
import { RequestModel } from '../model/request-model';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { PrenameM } from './prename-model';

export class PrenameMSerivce {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) {}
    
    public insert(reqM: RequestModel) { 
        
        //console.log("----------- PrenameMSerivce : insert ------------ XML = " + JSON.stringify(reqM));
        
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
                                        "prename": objMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);

                                    //console.log("******************* Success insert prename ");
                                },
                                (err) => {
                                    console.log("******************* Error prename " + JSON.stringify(err));
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
    
    public deleteAll() {
        //console.log("----------- PrenameMSerivce : deleteAll ------------");

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql = `DELETE FROM ` + TB_SQLITE.tb_prename;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_plandetail success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete all tb_prename error." + error + " : " + JSON.stringify(error));
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
        //console.log("----------- PlanDetailService : search ------------" + JSON.stringify(objMs));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    //let prenameMs: Array<PrenameM> = objMs; 
                    let responseM: ResponseModel = new ResponseModel();
                    let sql: string = "SELECT * FROM " + TB_SQLITE.tb_prename + " ORDER BY value ASC";

                   // console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                   // console.log("===== Select tb_plandetail success size " + result.rows.length);
                                    
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let prenameMs: Array<PrenameM> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            //console.log("===== Select tb_prename XML " + JSON.stringify(result.rows.item(index)));

                                            let prenameM: PrenameM  = result.rows.item(index);
                                            prenameMs.push(prenameM);
                                        }

                                        responseM.data = prenameMs;
                                        responseM.size = prenameMs.length;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_plandetail error " + JSON.stringify(error));
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_prename;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_prename error " + JSON.stringify(error));
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
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_prename + 
                            `(
                                gender TEXT, title TEXT, value TEXT, child TEXT,
                                PRIMARY KEY (value) 
                            );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_prename + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_prename error." + JSON.stringify(error));
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