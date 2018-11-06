import { ConectionDBName } from './../constants/connect-db-name';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { LoggerActionLogModel } from './logger-actionlog-model';
import { TB_SQLITE } from './../constants/table-config';
import { Device } from '@ionic-native/device';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ResponseModel } from '../model/response-model';
import { LoggerLoginLogModel } from './logger-loginlog-model';
import { Platform } from 'ionic-angular';

/*
  Generated class for the LoggerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggerProvider {

    constructor(
        public http: Http,
        private sqlite: SQLite,
        private device: Device,
        private platform: Platform,
        private sqlitePos: SQLitePorter
    ) {

    }

    createTableLoginLog() {
        return new Promise((resolve, reject) => {
            this.sqlite.create(ConectionDBName.connectionDB)
                .then((connection: SQLiteObject) => {

                    let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_loginlog +
                        `( agentid TEXT, logindate DATETIME, device TEXT, os TEXT, geolocation TEXT ,
          platform TEXT, loginfrom TEXT, PRIMARY KEY (agentid, logindate) );`;

                    connection.executeSql(sql, [])
                        .then(
                        (result) => {
                            //console.log("======== Create table tb_loginlog successfully.");
                            resolve(result);
                        }
                        , (error) => {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_loginlog error. " + JSON.stringify(error));
                            reject(error);
                        }
                        )
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })
        });
    }

    dropActionLog() {
        return new Promise((resolve, reject) => {
            this.createTableActionLog().then(
                (res) => {

                    let sql: string = `DROP TABLE ` + TB_SQLITE.tb_actionlog;

                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Drop tb_actionlog error " + JSON.stringify(error));
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

    dropLoginlog() {
        return new Promise((resolve, reject) => {
            this.createTableLoginLog().then(
                (res) => {

                    let sql: string = `DROP TABLE ` + TB_SQLITE.tb_loginlog;

                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Drop tb_loginlog error " + JSON.stringify(error));
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

    createTableActionLog() {
        return new Promise((resolve, reject) => {
            this.sqlite.create(ConectionDBName.connectionDB)
                .then((connection: SQLiteObject) => {

                    let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_actionlog +
                        `( seq  char(36) default (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))) , 
        agentid TEXT, deviceRefNo TEXT, page TEXT, object TEXT, type TEXT,
        logdate DATETIME, PRIMARY KEY (seq, agentid));`;

                    connection.executeSql(sql, [])
                        .then(
                        (result) => {
                            //console.log("======== Create table tb_actionlog successfully.");
                            resolve(result);
                        }
                        , (error) => {
                            console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_actionlog error. " + JSON.stringify(error));
                            reject(error);
                        }
                        )
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })
        });
    }

    insertLoginLog(agentid: string) {
        return new Promise((resolve, reject) => {
            this.createTableLoginLog().then(
                (res) => {
                    if (agentid != null) {
                        let sql = `INSERT INTO ` + TB_SQLITE.tb_loginlog +
                            `( agentid, device , logindate, geolocation, platform, loginfrom, os)
                     VALUES
                    (
                     ?,?,DateTime('now'),?,?,?,?
                    ) ;`;
                        let paramSql = [
                            agentid, this.device.model, "", this.device.platform, "tlprompt", this.device.manufacturer
                        ];

                        this.sqlite.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        //console.log('==== Insert into tb_loginlog successfully.');
                                        resolve();
                                    }
                                    , (error) => {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert into tb_loginlog error. ' + error.message);
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

    insertActionLog(actionLog: LoggerActionLogModel) {
        return new Promise((resolve, reject) => {

            if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
                this.createTableActionLog().then(
                    (res) => {
                        if (actionLog.agentid != null) {
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_actionlog +
                                `( agentid, object , type , logdate, seq , page , deviceRefNo)
                           VALUES
                          (
                           ?,?,?,DateTime('now'),?,?,?
                          ) ;`;
    
                            let paramSql = [
                                actionLog.agentid, actionLog.object, actionLog.type, actionLog.seq, actionLog.page, actionLog.deviceRefNo
                            ];
                            this.sqlite.create(ConectionDBName.connectionDB).then(
                                (connection: SQLiteObject) => {
                                    connection.executeSql(sql, paramSql).then(
                                        (result) => {
                                            //console.log('==== Insert into tb_actionlog successfully. ');
                                            resolve();
                                        }
                                        , (error) => {
                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!! ==> Insert into tb_actionlog error. ' + error);
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
                        else {
                            resolve();
                        }
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                );
            }
            else {
                resolve();
            }
        });
    }

    showColumnTB(tablename: string) {

        return new Promise((resolve, reject) => {
            this.sqlite.create(ConectionDBName.connectionDB)
                .then((connection: SQLiteObject) => {
                    let sql: string = `PRAGMA table_info(logtest)`;
                    let param: string[] = [tablename];
                    //let sql: string = `select name,sql FROM sqlite_master where type='table' order by name;`;
                    connection.executeSql(sql, [])
                        .then(
                        (result) => {
                            // alert(" check table structure > "+JSON.stringify(result));
                            resolve(result);
                        }
                        , (error) => {
                            //  alert(JSON.stringify(error));
                            console.log(error);
                            reject(error);
                        }
                        )
                })
            reject();
        })
    }

    public findAll() {
        return new Promise((resolve, reject) => {
            this.createTableLoginLog().then(
                (res) => {
                    let responseM = new ResponseModel();

                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_loginlog + ` ;`;
                    //console.log(sql);

                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let loginLogMs: LoggerLoginLogModel[] = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let obj: LoggerLoginLogModel = new LoggerLoginLogModel();
                                            obj.agentid = result.rows.item(index).agentid;
                                            obj.geolocation = result.rows.item(index).geolocation;
                                            obj.logindate = result.rows.item(index).logindate;
                                            obj.os = result.rows.item(index).os;
                                            obj.platform = result.rows.item(index).platform;
                                            obj.loginfrom = result.rows.item(index).loginfrom;
                                            obj.device = result.rows.item(index).device;

                                            loginLogMs.push(obj);
                                        }

                                        responseM.data = loginLogMs;
                                        ////alert("===== SELECT SUCCESS size " + JSON.stringify( responseM.data ));
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        //alert("===== SELECT FAIL size " + JSON.stringify( responseM.data ));
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== SELECT ERROR" + JSON.stringify(error));
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

    public execSQL() {
        return new Promise((resolve, reject) => {
            this.createTableActionLog()
                .then(
                (res) => {
                    let responseM = new ResponseModel();

                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_actionlog + ` ;`;
                    //console.log(sql);

                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let actionLogMs: LoggerActionLogModel[] = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            let obj: LoggerActionLogModel = new LoggerActionLogModel();
                                            obj.agentid = result.rows.item(index).agentid;
                                            obj.object = result.rows.item(index).object;
                                            obj.type = result.rows.item(index).type;
                                            obj.seq = result.rows.item(index).seq;
                                            obj.deviceRefNo = "";
                                            obj.logdate = result.rows.item(index).logdate;
                                            obj.page = result.rows.item(index).page;

                                            actionLogMs.push(obj);
                                        }

                                        responseM.data = actionLogMs;
                                        // alert("===== SELECT SUCCESS size " + JSON.stringify( responseM.data ));
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("===== SELECT ERROR" + JSON.stringify(error));
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
                })
        })
    }

    public deleteActionLog() {
        return new Promise((resolve, reject) => {
            this.createTableLoginLog()
                .then(
                (res) => {
                    let responseM = new ResponseModel();
                    let sql: string = `DELETE FROM ` + TB_SQLITE.tb_actionlog + ` ;`;
                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete tb_actionlog successfully.");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_actionlog error " + JSON.stringify(error));
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
                })

        })
    }

    public deleteLoginLog() {
        return new Promise((resolve, reject) => {
            this.createTableLoginLog()
                .then(
                (res) => {
                    let responseM = new ResponseModel();
                    let sql: string = `DELETE FROM ` + TB_SQLITE.tb_loginlog + ` ;`;
                    this.sqlite.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("===== Delete tb_loginlog successfully.");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete tb_loginlog error " + JSON.stringify(error));
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
                })

        })
    }

}
