import { PinLogModel } from '../pinlog/pinlog-model';
import { ResponseModel } from '../model/response-model';
import { RequestModel } from '../model/request-model';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { DateUtil } from '../utility/date-util';
import { ConectionDBName } from '../constants/connect-db-name';

export class PinLogService {

    TABLE_NAME: string = "pinlog";

    constructor(public platform: Platform, public db: SQLite) {
        
    }

    public insert(request: RequestModel) {
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let pinLogModel: PinLogModel = request.param;
                    if (pinLogModel != null) {
                            let sql: string = `INSERT INTO `+this.TABLE_NAME+
                             `(agentid, inputdate, result)
                             VALUES (?,?,?);`;
                            let paramSQL = [pinLogModel.agentid, pinLogModel.inputdate, pinLogModel.result];
                            
                            this.db.create(ConectionDBName.connectionDB)
                            .then((connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL)
                                .then(
                                    (result) => {
                                        //console.log("###insert success###");
                                        resolve(result);
                                    },
                                    (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> insert error###" + JSON.stringify(error));
                                        reject(error);
                                    }
                                )
                            },
                            (error) => {
                                reject(error);
                            })
                            .catch((error) => {
                                console.log("###connect error:"+ error.message);
                            });
                    }
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public search(pinLogModel: PinLogModel) {
        //console.log("----------- pinLogModel : SEARCH ------------ inputdate = " + DateUtil.dateYMD(new Date()));
        return new Promise((resolve, reject) => {
        
            this.createTable().then(
                (res) => {
                    let responseM: ResponseModel = new ResponseModel();
                    try {
                        let sql:string = "SELECT * FROM "+this.TABLE_NAME+" ORDER BY inputdate DESC LIMIT 10;";
                        //paramSQL = [DateUtil.dateYMD(new Date())];
                        this.db.create(ConectionDBName.connectionDB)
                        .then((connection: SQLiteObject) => {
                            connection.executeSql(sql, [])
                            .then((result) => {
                                responseM.size = result.rows.length;
                                responseM.status = 0;
                                if (result.rows.length>0) {
                                    var len = result.rows.length;
                                    let incorrectLeft: number = 10;
                                    for (var index = 0; index < len; index++) {
                                        
                                        if (result.rows.item(index).result == "F") {
                                            incorrectLeft--;
                                        }   
                                    }
                                    let obj: PinLogModel = new PinLogModel();
                                    obj.incorrectLeft = incorrectLeft;
                                    obj.agentid = result.rows.item(0).agentid;
                                    obj.inputdate = DateUtil.date2str(new Date());
                                    responseM.data = obj;
                                    resolve(responseM);

                                } else {
                                    responseM.size = 0;
                                    responseM.status = 0;
                                    resolve(responseM);
                                }
                            },
                            (error) => {
                                console.log("===== SELECT ERROR " + error.message);
                                reject(error);
                            })
                        },
                        (error) => {
                            reject(error);
                        })
                    }
                    catch (error) {
                        console.log(error);
                        reject(error); 
                    }
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public drop() {
        
        console.log("----------- pinlog : drop ------------");
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DROP TABLE " + this.TABLE_NAME;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table pinlog success. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop pinlog error " + JSON.stringify(error));
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

    public createTable() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(
                () => {
                    this.db.create(ConectionDBName.connectionDB)
                        .then(
                        (connection: SQLiteObject) => {
                            let sql: string = `CREATE TABLE IF NOT EXISTS `+this.TABLE_NAME+
                            `( no INTEGER PRIMARY KEY AUTOINCREMENT, agentid varchar(32), inputdate datetime, result char(1) );`;

                            connection.executeSql(sql, [])
                                .then(
                                    (result) => {
                                        resolve(result);
                                    },
                                    (error) => {
                                        console.log(error);
                                        reject(error);
                                    }
                                    
                                )
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        }
                        )
                        .catch((error) => {
                            console.log(error);
                            reject(error);
                        }
                        )
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
}