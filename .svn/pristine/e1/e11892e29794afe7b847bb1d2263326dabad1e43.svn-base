import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../../model/request-model";
import { TB_SQLITE } from "../../constants/table-config";
import { ConectionDBName } from '../../constants/connect-db-name';
import { DistrictModel } from "./district-model";
import { ResponseModel } from "../../model/response-model";
import { SQLiteHandle } from "../../utility/sqlite-handle";
import { SQLitePorter } from "@ionic-native/sqlite-porter";


export class DistrictService {

    constructor(public platform: Platform, public db: SQLite, public sqlitePorter: SQLitePorter) { }

    public insert(request: RequestModel) {
        //console.log("----------- DistrictService : insert ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let districtMs: any[] = request.param;
                    if (districtMs != null && districtMs.length > 0) {

                        this.db.create(ConectionDBName.connectionDB).then((db: any) => {
                            let dbInstance = db._objectInstance;
                            // we can pass db._objectInstance as the database option in all SQLitePorter methods
                            let sqlJsonBlock = {
                                "data":{
                                    "inserts":{
                                        "district": districtMs
                                    }
                                }
                            };

                            this.sqlitePorter.importJsonToDb(dbInstance, sqlJsonBlock).then(
                                () => {
                                    let num: number = SQLiteHandle.recordBeWrite;  
                                    SQLiteHandle.recordBeWrite = Number(num + districtMs.length);
                                },
                                (err) => {
                                    console.log("********************** districtMs" + JSON.stringify(err));
                                    reject(err);
                                }
                            );
                          });

                          /**
                        tLPlanModels.forEach(itemM => {

                            let sql = `INSERT INTO ` + TB_SQLITE.tb_district +
                                ` (
                                    id, name, province, type
                                 )
                                 VALUES(
                                 ?, ?, ?, ?
                                );`;
                            //console.log(sql);

                            let paramSql: Array<string> = [
                                itemM.id, itemM.name, itemM.province, itemM.type
                            ];

                            this.db.create(ConectionDBName.connectionDB).then(
                                (connection: SQLiteObject) => {
                                    connection.executeSql(sql, paramSql).then(
                                        (result) => {
                                            SQLiteHandle.recordBeWrite++;
                                            //console.log('==== Insert into tb_district successfully. ');
                                        }
                                        , (error) => {
                                            console.log('==== Insert into tb_district error. ' + JSON.stringify(error));
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
        //console.log("----------- DistrictService : deleteAll ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DELETE FROM " + TB_SQLITE.tb_district + ";";
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete all tb_district success. " + result.rows.length);
                                }
                                , (error) => {
                                    console.log("===== Delete all tb_district error. " + error.message);
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    )

                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public search(objM: DistrictModel) {
        //console.log("----------- DistrictService : search ------------ = " + JSON.stringify(objM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT * FROM " + TB_SQLITE.tb_district;

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

                                        let districtMs: Array<DistrictModel> = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            districtMs.push(result.rows.item(index));
                                        }

                                        responseM.data = districtMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== Select tb_district error " + error.message);
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
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_district;

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
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_district error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_district +
                                `(
                                    id TEXT, name TEXT, province TEXT, type TEXT,
                                    PRIMARY KEY (id)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("==> Create table " + TB_SQLITE.tb_district + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("==> Create table " + TB_SQLITE.tb_district + " error." + JSON.stringify(error));
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

