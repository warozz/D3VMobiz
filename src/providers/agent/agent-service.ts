
import { ConectionDBName } from '../constants/connect-db-name';
import { RequestModel } from '../model/request-model';
import { Platform } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { ResponseModel } from '../model/response-model';
import { AgentModel } from './agent-model';
import { TB_SQLITE } from '../constants/table-config';

export class AgentService {

    constructor(public platform: Platform, public db: SQLite) {}

    public insert(request: RequestModel) {

        //console.log("AgentService ------------------ insert XML = " + JSON.stringify(request));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let agentModel: AgentModel = request.param;
                    if (agentModel != null) {
                        this.search(agentModel).then(
                            (res) => {
                                let responseM: any = res;
                                if (responseM.size == 0) {

                                    let sql = `INSERT INTO ` + TB_SQLITE.tb_agent + 
                                      `(    iss, exp, nbf, agentid, branch, 
                                            fName, lName, pName, tel, license, 
                                            fNameE, lNameE, idCardNo, email, perrmissionAgent,
                                            ulLicense, unLicense
                                        )
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

                                    //console.log(sql);

                                    let paramSql = [agentModel.iss, agentModel.exp, agentModel.nbf, agentModel.agentid,
                                    agentModel.branch, agentModel.fName, agentModel.lName, agentModel.pName, agentModel.tel,
                                    agentModel.license, agentModel.fNameE, agentModel.lNameE, agentModel.idCardNo,
                                    agentModel.email, agentModel.perrmissionAgent, agentModel.ulLicense, agentModel.unLicense];

                                    this.db.create(ConectionDBName.connectionDB).then(
                                        (connection: SQLiteObject) => {
                                            connection.executeSql(sql, paramSql).then(
                                                (result) => {
                                                    console.log('==== Insert into table agent successfully. ');
                                                    resolve(result);
                                                }
                                                , (error) => {
                                                    console.log('==== Insert into table agent error. ' + JSON.stringify(error));
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
                                    this.update(agentModel).then(
                                        (res) => {
                                            resolve(res);
                                        },
                                        (err) => {
                                            reject(err);
                                        });
                                }

                            },
                            (err) => {
                                reject(err);
                            }
                        );
                    }
                    else {
                        reject();
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public delete(request: RequestModel) {
        //console.log("----------- AgentService : delete ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public update(agentModel: AgentModel) {
        
        //console.log("----------- AgentService : update ------------");
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = `UPDATE ` + TB_SQLITE.tb_agent + ` SET 
                        iss=?, exp=?, nbf=?, branch=?, fName=?, 
                        lName=?, pName=?, tel=?, license=?, fNameE=?,
                        lNameE=?, idCardNo=?, email=?, perrmissionAgent=?,ulLicense=?, 
                        unLicense=?
                        WHERE agentid=?`;

                        let paramSql = [
                            agentModel.iss, agentModel.exp, agentModel.nbf, agentModel.branch, agentModel.fName, 
                            agentModel.lName, agentModel.pName, agentModel.tel, agentModel.license, agentModel.fNameE, 
                            agentModel.lNameE, agentModel.idCardNo, agentModel.email, agentModel.perrmissionAgent, agentModel.ulLicense, 
                            agentModel.unLicense, agentModel.agentid];

                        //console.log(sql + " : " + JSON.stringify(paramSql));

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        //console.log("===== UPDATE SUCCESS ");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("===== Update table tb_agent error " + JSON.stringify(error));
                                        reject(error);
                                    }
                                )
                            }
                            , (error) => {
                                console.log(error);
                                reject(error);
                            }
                        )
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

    public search(agentModel: AgentModel) {
        //console.log("----------- AgentService : search ------------ agentId = " + agentModel.agentid);
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let responseM: ResponseModel = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT * FROM " + TB_SQLITE.tb_agent + ";";

                        if (agentModel.agentid != null && agentModel.agentid != "") {
                            sql = "SELECT * FROM " + TB_SQLITE.tb_agent + " WHERE agentid=?;";
                            paramSQL = [agentModel.agentid];
                        }

                        //console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        //console.log("===== SELECT Agent SUCCESS size " + result.rows.length);
                                        responseM.size = result.rows.length;
                                        responseM.status = 0;

                                        //console.log("BBBB = " + JSON.stringify(result.rows.item()));

                                        if (result.rows.length > 0) {
                                            let agents: Array<AgentModel> = [];
                                            var len = result.rows.length;
                                            for (var index = 0; index < len; index++) {
                                                agents.push(result.rows.item(index));
                                            }

                                            responseM.data = agents;
                                            resolve(responseM);
                                        }
                                        else {
                                            responseM.size = 0;
                                            responseM.status = 0;
                                            resolve(responseM);
                                        }
                                    }
                                    , (error) => {
                                        console.log("===== SELECT Agent ERROR " + error.message);
                                        reject(error);
                                    }
                                )
                            }
                            , (error) => {
                                //console.log(error);
                                reject(error);
                            }
                        )
                    }
                    catch (error) {
                        //console.log(error);
                        reject(error);
                    }
                },
                (err) => {
                    //console.log(err);
                    reject(err);
                }
            );
        });
    }

    public drop() {
        
        //console.log("----------- tb_agent : drop ------------");
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DROP TABLE " + TB_SQLITE.tb_agent;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table tb_agent seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop tb_agent error " + JSON.stringify(error));
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
                    try {
                        this.db.create(ConectionDBName.connectionDB)
                            .then(
                            (connection: SQLiteObject) => {

                                let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_agent + 
                                `(  iss TEXT PRIMARY KEY, exp TEXT, nbf TEXT, agentid TEXT,
                                    branch TEXT, fName TEXT, lName TEXT, pName TEXT, tel TEXT, license TEXT, fNameE TEXT,
                                    lNameE TEXT, idCardNo TEXT, email TEXT, perrmissionAgent TEXT,ulLicense TEXT, unLicense TEXT);`;
                               // console.log(sql);

                                connection.executeSql(sql, []).then(
                                    (result) => {
                                       // console.log("== Create table agent successfully.");
                                        resolve(result);
                                    }
                                    , (error) => {
                                        console.log("== Create table agent error.");
                                       // console.log(error);
                                        reject(error);
                                    }
                                )
                            }
                            , (error) => {
                               // console.log(error);
                                reject(error);
                            }
                            ).catch((error) => {
                                //console.log(error);
                                reject(error);
                            })
                    }
                    catch (error) {
                       //console.log(error);
                        reject(error);
                    }
                }
                , (error) => {
                    //console.log(error);
                    reject(error);
                }
            );
        });
    }

}