import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from '../../constants/connect-db-name';
import { ResponseModel } from "../../model/response-model";
import { ProvinceModel } from "./province-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";


export class ProvinceService {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) { }

    public insert(request: RequestModel) {
        //console.log("----------- ProvinceService : insert ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let provinceMs: any[] = request.param;
                    if (provinceMs != null && provinceMs.length > 0) {

                        this.db.create(ConectionDBName.connectionDB).then((db: any) => {
                            let dbInstance = db._objectInstance;
                            let sqlJsonBlock = {
                                "data":{
                                    "inserts":{
                                        "province": provinceMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite
                                    SQLiteHandle.recordBeWrite = Number(num + provinceMs.length);
                                },
                                (err) => {
                                    console.log("********************** provinceMs error" + JSON.stringify(err));
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
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public deleteAll() {
        console.log("----------- ProvinceService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DELETE FROM " + TB_SQLITE.tb_province + ";";
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Delete all tb_province success. " + result.rows.length);
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Delete all tb_province error. " + error.message);
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

    public search(objM: ProvinceModel) {
        //console.log("----------- ProvinceService : search ------------ = " + JSON.stringify(objM));
        return  new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT * FROM " + TB_SQLITE.tb_province;

                    if (objM != undefined && objM.id != null) {
                        sql += " WHERE id=?;";
                        paramSQL = [objM.id];
                    }
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let subDistrictMs: Array<ProvinceModel> = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            subDistrictMs.push(result.rows.item(index));
                                        }

                                        responseM.data = subDistrictMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== Select tb_province error " + error.message);
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_province;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_province error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_province +
                                `(
                                    id TEXT, name TEXT, region TEXT,
                                    PRIMARY KEY (id)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("==> Create table " + TB_SQLITE.tb_province + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("==> Create table " + TB_SQLITE.tb_province + " error. " + JSON.stringify(error));
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

