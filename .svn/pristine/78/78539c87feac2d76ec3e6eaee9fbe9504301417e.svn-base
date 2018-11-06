import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { SQLitePorter } from "@ionic-native/sqlite-porter";
import { RequestModel } from "../model/request-model";
import { ConectionDBName } from "../constants/connect-db-name";
import { SQLiteHandle } from "../utility/sqlite-handle";
import { TB_SQLITE } from "../constants/table-config";
import { ResponseModel } from "../model/response-model";
import { FavoritePlanM } from "./favoriteplan-model";
import { DateUtil } from "../utility/date-util";

export class FavoritePlanService {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) { }

    public insert(request: RequestModel) {
        //console.log("----------- FavoritePlanService : insert ------------" + JSON.stringify(request));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let agentid: string = request.agentid;
                    let objMs: Array<FavoritePlanM> = request.param;
                    if (objMs != null && objMs.length > 0) {

                        objMs.forEach(itemM => {

                            itemM.agentid = request.agentid;

                            if (itemM.createdate == null || "" == itemM.createdate)
                                itemM.createdate = DateUtil.date2str(new Date());

                            if (itemM.lastmodify == null || "" == itemM.lastmodify)
                                itemM.lastmodify = DateUtil.date2str(new Date());

                            if (itemM.status == null || "" == itemM.status)
                                itemM.status = "I";

                            this.count(itemM, agentid).then((res) => {
                                let obj: any = res;
                                let resM: ResponseModel = obj;
                                if (0 != resM.size) {
                                    let sql = `UPDATE ` + TB_SQLITE.tb_favoriteplan +
                                    `
                                    SET status=?, lastmodify=? WHERE agentid=? AND plancode=?
                                    `;
                                    
                                    console.log(sql); 

                                    let paramSql = [
                                        itemM.status, itemM.lastmodify, agentid, itemM.plancode
                                    ];

                                    this.db.create(ConectionDBName.connectionDB).then(
                                    (connection: SQLiteObject) => {
                                        connection.executeSql(sql, paramSql).then(
                                            (result) => {
                                                SQLiteHandle.recordBeWrite++;
                                                //console.log('==== Insert table tb_favoriteplan successfully.');
                                            }
                                            , (err) => {
                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Update table tb_favoriteplan error. ' + JSON.stringify(err));
                                            }
                                        )
                                    }
                                    , (error) => {
                                        reject(error);
                                    });
                                }
                                else {
                                    let sql = `INSERT INTO ` + TB_SQLITE.tb_favoriteplan +
                                    `(
                                        agentid, plancode, status, createdate, lastmodify
                                    ) VALUES(
                                        ?, ?, ?, ?, ?
                                    )`;
                                    //console.log(sql); 

                                    let paramSql = [
                                        itemM.agentid, itemM.plancode, itemM.status, itemM.createdate, itemM.lastmodify
                                    ];

                                    this.db.create(ConectionDBName.connectionDB).then(
                                    (connection: SQLiteObject) => {
                                        connection.executeSql(sql, paramSql).then(
                                            (result) => {
                                                SQLiteHandle.recordBeWrite++;
                                                //console.log('==== Insert table tb_favoriteplan successfully.');
                                            }
                                            , (err) => {
                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert table tb_favoriteplan error. ' + JSON.stringify(err));
                                            }
                                        )
                                    }
                                    , (error) => {
                                        reject(error);
                                    });
                                }
                            });

                            
                        });

                        /**
                         * 
                        console.log("FavoritePlanMs INSERT = " + JSON.stringify(objMs));

                        this.db.create(ConectionDBName.connectionDB).then((db: any) => {
                            let dbInstance = db._objectInstance;
                            let sqlJsonBlock = {
                                "data":{
                                    "inserts":{
                                        "favoriteplan": objMs
                                    }
                                }
                            }; 

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite
                                    SQLiteHandle.recordBeWrite = Number(num + objMs.length);

                                    //console.log("********************** favoriteplan success");
                                },
                                (err) => {
                                    console.log("********************** favoriteplan insert error" + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });
                           */
                       
                        resolve();
                    }
                    else {
                        resolve();
                    }
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public deleteAll() {
        console.log("----------- tb_favoriteplan : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DELETE FROM " + TB_SQLITE.tb_favoriteplan + ";";
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Delete all tb_favoriteplan success. " + result.rows.length);
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Delete all tb_favoriteplan error. " + JSON.stringify(error));
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
                    reject(err);
                }
            );
        });
    }

    public delete(reqM : RequestModel) {
        console.log("----------- tb_favoriteplan : delete ------------" + JSON.stringify(reqM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let agentid: string = reqM.agentid;
                    let objMs: Array<FavoritePlanM> = reqM.param;

                    let sql: string = "UPDATE " + TB_SQLITE.tb_favoriteplan;
                    sql += " SET status=?, lastmodify=?";
                    sql += " WHERE agentid=? AND plancode=? ";
                    let paramSQL = [ "D", objMs[0].lastmodify, agentid, objMs[0].plancode ];

                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Delete tb_favoriteplan success. " + result.rows.length);

                                    let responseM: ResponseModel = new ResponseModel();
                                    responseM.data = [];
                                    responseM.size = 0;
                                    responseM.status = 0;   

                                    resolve(responseM);
                                }
                                , (error) => {
                                    console.log("===== Delete tb_favoriteplan error. " + JSON.stringify(error));
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
                    reject(err);
                }
            );
        });
    }

    public search(reqM : RequestModel) {
        //console.log("----------- FavoritePlanM : search ------------ = " + JSON.stringify(reqM));
        return  new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let agentid: string = reqM.agentid;
                    let objMs: Array<FavoritePlanM> = reqM.param;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT * FROM " + TB_SQLITE.tb_favoriteplan;

                    if (objMs != null && objMs.length > 0) {
                        sql += " WHERE agentid=? AND plancode=?;";
                        paramSQL = [ agentid, objMs[0].plancode];
                    }
                    else {
                        sql += " WHERE agentid=?;";
                        paramSQL = [ agentid ];
                    }

                    //console.log(sql + " >> " + agentid);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {

                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let objMs: Array<any> = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            objMs.push(result.rows.item(index));
                                        }

                                        responseM.data = objMs;
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
                                    console.log("===== Select tb_favoriteplan error " + JSON.stringify(error));
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

    public count(objM: FavoritePlanM, agentid: string) {
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let responseM: ResponseModel = new ResponseModel();
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_favoriteplan;
                    sql += " WHERE agentid=? AND plancode=?";

                    let parameSQL = [agentid, objM.plancode];

                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, parameSQL).then(
                                (result) => {
                                   // console.log("===== Select count success size " + result.rows.length);
                                    responseM.size = result.rows.item(0).total;
                                    responseM.status = 0;
                                    resolve(responseM);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_favoriteplan error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_favoriteplan +
                                `(
                                    agentid TEXT, plancode TEXT, status TEXT, createdate TEXT, lastmodify TEXT,
                                    PRIMARY KEY (agentid, plancode)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("==> Create table " + TB_SQLITE.tb_favoriteplan + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("==> Create table " + TB_SQLITE.tb_favoriteplan + " error. " + JSON.stringify(error));
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