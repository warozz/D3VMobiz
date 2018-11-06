import { ResponseModel } from './../model/response-model';
import { ConectionDBName } from '../constants/connect-db-name';
import { RequestModel } from '../model/request-model';
import { Platform } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { ApplicationSessionM } from './application-session-model';
import { DateUtil } from '../utility/date-util';

export class ApplicationSessionService {

    TABLE_NAME: string = "applicationsession";

    constructor(public platform: Platform, public db: SQLite) { }

    public insert(request: RequestModel) {
        //console.log("----------- ApplicationSessionService : INSERT Param ------------" + JSON.stringify(request));
        return new Promise((resolve, reject) => {
            this.createTable().then( 
                (res) => {
                    let appSessionModel: ApplicationSessionM = request.param;
                    if (appSessionModel != null) {
                        this.search(appSessionModel).then(
                            (res) => {
                                let responseM: any = res;
                                if (responseM.size == 0) {
                                    let sql = "INSERT INTO " + this.TABLE_NAME;
                                    sql += " (";
                                    sql += " agentid, deviceRefNo, pincode, pinstatus, activatecode, lastonlinemode, lastofflinemode, jwt, lastsync";
                                    sql += " )";
                                    sql += " VALUES";
                                    sql += " ( ";
                                    sql += " ?,?,?,?,?,?,?,?,? ";
                                    sql += " );";
                                   // console.log(sql);

                                    let paramSql = [
                                        appSessionModel.agentid, appSessionModel.deviceRefNo, appSessionModel.pincode, appSessionModel.pinstatus,
                                        appSessionModel.activatecode, appSessionModel.lastonlinemode, appSessionModel.lastofflinemode,
                                        appSessionModel.jwt, appSessionModel.lastsync
                                    ];

                                    this.db.create(ConectionDBName.connectionDB).then(
                                        (connection: SQLiteObject) => {
                                            connection.executeSql(sql, paramSql).then(
                                                (result) => {
                                                   // console.log('==== INSERT applicationsession SUCCESS ');
                                                    resolve(result);
                                                }
                                                , (error) => {
                                                    //console.log('==== INSERT applicationsession ERROR ' + error);
                                                    reject(error);
                                                }
                                            )
                                        }
                                        , (error) => {
                                            reject(error);
                                        }
                                    ).catch((error) => {
                                        reject(error);
                                    })
                                }
                                else {
                                    this.update(appSessionModel).then(
                                        (res) => {
                                            resolve(res);
                                        },
                                        (err) => {
                                            reject(err);
                                        }
                                    );
                                }
                            },
                            (err) => {
                                console.log(err);
                                reject(err);
                            }
                        );
                    }
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public update(appSessionM: ApplicationSessionM) {
        //console.log("----------- ApplicationSessionM : UPDATE ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let columeSet = [];
                    let paramSqls = [];

                    if (appSessionM.pincode != null && appSessionM.pincode != "") {
                        columeSet.push("pincode=?");
                        paramSqls.push(appSessionM.pincode);
                    }

                    if (appSessionM.deviceRefNo != null && appSessionM.deviceRefNo != "") {
                        columeSet.push("deviceRefNo=?");
                        paramSqls.push(appSessionM.deviceRefNo);
                    }

                    if (appSessionM.pinstatus != null && appSessionM.pinstatus != "") {
                        columeSet.push("pinstatus=?");
                        paramSqls.push(appSessionM.pinstatus);
                    }

                    if (appSessionM.activatecode != null && appSessionM.activatecode != "") {
                        columeSet.push("activatecode=?");
                        paramSqls.push(appSessionM.activatecode);
                    }

                    if (appSessionM.lastonlinemode != null && appSessionM.lastonlinemode != "") {
                        columeSet.push("lastonlinemode=?");
                        paramSqls.push(appSessionM.lastonlinemode);
                    }

                    if (appSessionM.lastofflinemode != null && appSessionM.lastofflinemode != "") {
                        columeSet.push("lastofflinemode=?");
                        paramSqls.push(appSessionM.lastofflinemode);
                    }

                    if (appSessionM.jwt != null && appSessionM.jwt != "") {
                        columeSet.push("jwt=?");
                        paramSqls.push(appSessionM.jwt);
                    }

                    if (appSessionM.lastsync != null && appSessionM.lastsync != "") {
                        columeSet.push("lastsync=?");
                        paramSqls.push(appSessionM.lastsync);
                    }

                    let sql = "UPDATE " + this.TABLE_NAME;
                    sql += " SET ";

                    for (var index = 0; index < columeSet.length; index++) {
                        if (index < columeSet.length - 1) {
                            sql += columeSet[index] + ",";
                        }
                        else {
                            sql += columeSet[index];
                        }
                    }

                    sql += " WHERE agentid=?";
                    paramSqls.push(appSessionM.agentid);
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSqls).then(
                                (result) => {
                                    //console.log("===== UPDATE SUCCESS ");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("===== UPDATE ERROR " + error.message);
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
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
        //console.log("----------- ApplicationSessionM : delete ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = " DELETE  FROM " + this.TABLE_NAME;
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== DELETE SUCCESS ");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("===== DELETE ERROR " + error.message);
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
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

    public drop() {
        
        //console.log("----------- ApplicationSessionM : drop ------------");
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DROP TABLE " + this.TABLE_NAME;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Drop table seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop error " + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
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

    public search(appSessionM: ApplicationSessionM) {
        
        //console.log("----------- ApplicationSessionM : SEARCH XML = " + JSON.stringify(appSessionM));
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT * FROM " + this.TABLE_NAME + ";";
                    if (appSessionM != undefined) {
                        if (appSessionM.agentid != undefined && appSessionM.agentid != "") {
                            sql = "SELECT * FROM " + this.TABLE_NAME + " WHERE agentid=?;";
                            paramSQL = [appSessionM.agentid];
                        }
                    }
                    
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => { 
                                    
                                    //console.log("===== SELECT SUCCESS ApplicationSessionM size " + result.rows.length);
                                    
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    let appSessionMs: Array<ApplicationSessionM> = [];
                                    
                                    if (result.rows.length > 0) {
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            let applicationSessionM: ApplicationSessionM  = result.rows.item(index);
                                            //applicationSessionM.lastsync = DateUtil.date2str(new Date());

                                            appSessionMs.push(applicationSessionM);
                                        }

                                        responseM.data = appSessionMs;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = appSessionMs;
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== SELECT ApplicationSessionM ERROR " + JSON.stringify(error));
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
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

                            let sql: string = "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME;
                            sql += "(";
                            sql += "agentid TEXT PRIMARY KEY, deviceRefNo TEXT, pincode TEXT, pinstatus TEXT, activatecode TEXT,";
                            sql += "lastonlinemode TEXT, lastofflinemode TEXT, jwt TEXT, lastsync TEXT default ''";
                            sql += ");";

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    resolve(result);
                                }
                                , (error) => {
                                    //console.log(error);
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