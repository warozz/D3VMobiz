import { SQLiteHandle } from '../utility/sqlite-handle';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ConectionDBName } from '../constants/connect-db-name';
import { ResponseModel } from '../model/response-model';
import { RequestModel } from '../model/request-model';
import { TB_SQLITE } from '../constants/table-config';
import { TLPlanModel } from './tlplan-model';
import { Injectable } from '@angular/core';

@Injectable()
export class TLPlanService {

    constructor(public platform: Platform, public db: SQLite) { }

    public async insert(request: RequestModel) {

        //console.log("----------- TLPlanService : insert ------------ XML " + JSON.stringify(request));

        return await new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let tLPlanModels: any[] = request.param;
                    if (tLPlanModels != null && tLPlanModels.length > 0) {
                        tLPlanModels.forEach(itemM => {

                            //alert(itemM.planCode);
                            let sql = `INSERT INTO ` + TB_SQLITE.tb_tlplan + 
                            ` (
                                planCode, planName, planName2, pPayYear, pEndowmentYear,
                                payType, endowmentType, accident, disable, discount,
                                matureAmount, minAge, maxAge, minSum, maxSum,
                                lifePay, accPay, dividend, surrender, apl,
                                minPremium, maxPremium, interestRate, matureInterest, loanInterest,
                                deVoid, policyType, approvedBy, issueDate, endDate,
                                modeOK, taxDeductFlag, maxDeductTax, stepCode, isPackagePlan,
                                calType, sex, riderType, amtOfCoverage, pensionAge
                             )
                             VALUES(
                             ?, ?, ?, ?, ?, 
                             ?, ?, ?, ?, ?, 

                             ?, ?, ?, ?, ?, 
                             ?, ?, ?, ?, ?,

                             ?, ?, ?, ?, ?, 
                             ?, ?, ?, ?, ?, 
                             
                             ?, ?, ?, ?, ?, 
                             ?, ?, ?, ?, ? );`;
                            //console.log(sql);

                            let paramSql: Array<string> = [
                                itemM.planCode, itemM.planName, itemM.planName2, itemM.pPayYear, itemM.pEndowmentYear,
                                itemM.payType, itemM.endowmentType, itemM.accident, itemM.disable, itemM.discount,
                                itemM.matureAmount, itemM.minAge, itemM.maxAge, itemM.minSum, itemM.maxSum,
                                itemM.lifePay, itemM.accPay, itemM.dividend, itemM.surrender, itemM.apl,
                                itemM.minPremium, itemM.maxPremium, itemM.interestRate, itemM.matureInterest, itemM.loanInterest,
                                itemM.deVoid, itemM.policyType, itemM.approvedBy, itemM.issueDate, itemM.endDate,
                                itemM.modeOK, itemM.taxDeductFlag, itemM.maxDeductTax, itemM.stepCode, itemM.isPackagePlan,
                                itemM.calType, itemM.sex, itemM.riderType, itemM.amtofCoverage, itemM.pensionAge
                            ];

                            this.db.create(ConectionDBName.connectionDB).then(
                                (connection: SQLiteObject) => {
                                    connection.executeSql(sql, paramSql).then(
                                        (result) => {

                                            //console.log('==== Insert into table tlplan successfully. ');
                                            
                                            let num: number = SQLiteHandle.recordBeWrite;
                                            SQLiteHandle.recordBeWrite = Number(num + 1);

                                        }
                                        , (error) => {
                                            console.log('==== Insert into table tlplan error. ' + error + error.message);
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

    public update(tLPlanModel: TLPlanModel) {
        //console.log("----------- TLPlanService : update ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + TB_SQLITE.tb_tlplan;
                        sql += " SET ";
                        sql += " iss=?, exp=?, nbf=?, branch=?";
                        sql += ",fName=?, lName=?, pName=?, tel=?, license=?, fNameE=?";
                        sql += ",lNameE=?, idCardNo=?, email=?, perrmissionAgent=?,ulLicense=?, unLicense=?";
                        sql += " WHERE agentid=?";
                        //console.log(sql);

                        // let paramSql = [agentModel.iss, agentModel.exp, agentModel.nbf,
                        // agentModel.branch, agentModel.fName, agentModel.lName, agentModel.pName, agentModel.tel,
                        // agentModel.license, agentModel.fNameE, agentModel.lNameE, agentModel.idCardNo,
                        // agentModel.email, agentModel.perrmissionAgent, agentModel.ulLicense, agentModel.unLicense];

                        // this.db.create(ConectionDBName.connectionDB).then(
                        //     (connection: SQLiteObject) => {
                        //         connection.executeSql(sql, paramSql).then(
                        //             (result) => {
                        //                 console.log("===== UPDATE SUCCESS ");
                        //                 resolve(res);
                        //             }
                        //             , (error) => {
                        //                 console.log("===== UPDATE ERROR " + error.message);
                        //                 reject(error);
                        //             }
                        //         )
                        //     }
                        //     , (error) => {
                        //         console.log(error);
                        //         reject(error);
                        //     }
                        // )
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

    public delete(tLPlanModel: TLPlanModel) {
        //console.log("----------- TLPlanService : delete ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "DELETE FROM " + TB_SQLITE.tb_tlplan + ";";

                    if (tLPlanModel.planCode != null && tLPlanModel.planCode != "") {
                        sql = "DELETE FROM " + TB_SQLITE.tb_tlplan + " WHERE planCode=?;";
                        paramSQL = [tLPlanModel.planCode];
                    }
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                   //console.log("===== DELETE SUCCESS tlplan size " + result.rows.length);
                                }
                                , (error) => {
                                    console.log("===== DELETE ERROR tlplan " + error.message);
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

    public search(objs: any) {
        //console.log("----------- TLPlanService : search ------------ = " + JSON.stringify(objs));
        return new Promise((resolve, reject) => {
             this.createTable().then(
                (res) => {
                    let tLPlanMs: Array<TLPlanModel> = objs;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = "SELECT tlplan.* ,(SELECT favoriteplan.plancode  FROM favoriteplan WHERE favoriteplan.plancode = tlplan.plancode) as favorite FROM tlplan";
                    sql += "  ORDER BY tlplan.planname2 ASC, tlplan.plancode ASC";
                    //select tlplan.* ,(select favoriteplan.plancode  from favoriteplan where favoriteplan.plancode = tlplan.plancode) as favorite from tlplan

                    if (tLPlanMs != null && tLPlanMs.length > 0) {
                        if (tLPlanMs[0].planCode != null && tLPlanMs[0].planCode != "") {
                            sql = "SELECT * FROM " + TB_SQLITE.tb_tlplan + " WHERE planCode=?;";
                            paramSQL = [tLPlanMs[0].planCode];
                        }
                    }
                    
                    //console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    //console.log("===== Select tb_tlplan success size " + result.rows.length);
                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {
 
                                        let tLPlanModels: Array<TLPlanModel> = [];

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            let objM: TLPlanModel = result.rows.item(index);
                                            if (objM.planCode == objM.favorite) {
                                                objM.favorite = "T";
                                            }
                                            else {
                                                objM.favorite = "F";
                                            }

                                            tLPlanModels.push(objM);
                                        }

                                        responseM.data = tLPlanModels;
                                        resolve(responseM);
                                    }
                                    else {
                                        let tLPlanModels: Array<TLPlanModel> = [];
                                        responseM.data = tLPlanModels;
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select tb_tlplan error. " + JSON.stringify(error));
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

    public drop() {
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql: string = "DROP TABLE " + TB_SQLITE.tb_tlplan;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table tb_tlplan seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop tb_tlplan error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_tlplan + 
                            `(
                                planCode TEXT PRIMARY KEY, planName TEXT, planName2 TEXT, pPayYear TEXT, pEndowmentYear TEXT,
                                payType TEXT, endowmentType TEXT, accident TEXT, disable TEXT, discount TEXT,
                                matureAmount TEXT, minAge TEXT, maxAge TEXT, minSum TEXT, maxSum TEXT,
                                lifePay TEXT, accPay TEXT, dividend TEXT, surrender TEXT, apl TEXT,
                                minPremium TEXT, maxPremium TEXT, interestRate TEXT, matureInterest TEXT, loanInterest TEXT,
                                deVoid TEXT, policyType TEXT, approvedBy TEXT, issueDate TEXT, endDate TEXT,
                                modeOK TEXT, taxDeductFlag TEXT, maxDeductTax TEXT, stepCode TEXT, isPackagePlan TEXT,
                                calType TEXT, sex TEXT, riderType TEXT, amtOfCoverage TEXT, pensionAge TEXT
                            );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_tlplan error." + JSON.stringify(error));
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

    private planType: boolean = true;
    public setPlanType(type: boolean): void {
        this.planType = type;
    }

    public getPlanType(): boolean {
        return this.planType;
    }
}