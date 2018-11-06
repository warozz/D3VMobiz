import { DateUtil } from './../utility/date-util';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { TB_SQLITE } from "../constants/table-config";
import { ConectionDBName } from "../constants/connect-db-name";
import { QuotationRiderM } from "./quotationrider-model";
import { SQLiteHandle } from "../utility/sqlite-handle";
import { ResponseModel } from "../model/response-model";

export class QuotationRiderService {

  constructor(public platform: Platform, public db: SQLite) {}

  public insert(reqM: RequestModel) {

    //console.log("----------- QuotationRiderService : insert ------------" + JSON.stringify(reqM));

    let dateSync = DateUtil.date2str(new Date()); 

    return new Promise((resolve, reject) => {
      this.createTable().then(
          (res) => {
              let objM: any[] = reqM.param;
              if (objM != null && objM.length > 0) {

                let sql = `INSERT INTO ` + TB_SQLITE.tb_quotationrider +
                `(
                  quotationno, customerid, ridertype, sum, premium, 
                  createdatetime, lastmodify, lastsync, agentid ) VALUES(
                  ?, ?, ?, ?, ?, 
                  ?, ?, ?, ?
                )`;

                this.db.create(ConectionDBName.connectionDB).then(
                    (connection: SQLiteObject) => {
                       
                        if ('1' == reqM.searchkey) {
                            
                           // console.log(' ********************* Quotationrider insert first time by sync. ********************* ');
                            
                            objM.forEach(itemM => { 

                                let paramSql = [
                                    itemM.quotationno, itemM.customerid, itemM.ridertype, itemM.sum, itemM.premium,
                                    itemM.createdatetime, itemM.lastmodify, itemM.lastsync, itemM.agentid
                                ];
  
                                this.db.create(ConectionDBName.connectionDB).then(
                                    (connection: SQLiteObject) => {
                                        connection.executeSql(sql, paramSql).then(
                                            (result) => {
                                              let num: number = SQLiteHandle.recordBeWrite; 
                                              SQLiteHandle.recordBeWrite = Number(num + 1);
                                            }
                                            , (error) => {
                                                console.log('==== Insert table Quotationrider error. ' + itemM.agentid + error);
                                            }
                                        )
                                    }
                                    , (error) => {
                                        reject(error);
                                    }
                                ).catch((error) => {
                                    reject(error);
                                });
                            });

                            resolve();
                        }
                        else {

                            //console.log(' ********************* Quotationrider insert. ********************* ');

                            objM.forEach(itemM => { 

                                let lastSync: string;
                                if (reqM.syncMode == true) {
                                    lastSync = dateSync;
                                }
                                else {
                                    lastSync = itemM.lastSync;
                                }
          
                                this.querySize(itemM).then((res) => {
                                    let obj: any = res;
                                    let resM: ResponseModel = obj;
                                    if (resM.size > 0) {
                                        this.update(itemM, lastSync);
                                    }
                                    else {
                                        let sql = `INSERT INTO ` + TB_SQLITE.tb_quotationrider +
                                            `(
                                              quotationno, customerid, ridertype, sum, premium, 
                                              createdatetime, lastmodify, lastsync, agentid ) VALUES(
                                              ?, ?, ?, ?, ?, 
                                              ?, ?, ?, ?
                                            )`;
          
                                        let paramSql = [
                                            itemM.quotationno, itemM.customerid, itemM.ridertype, String(Number(itemM.sum)), itemM.premium,
                                            itemM.createdatetime, itemM.lastmodify, itemM.lastsync, itemM.agentid
                                        ];
          
                                       // console.log("QuotationRiderService : paramSql = " + JSON.stringify(paramSql));
          
                                        this.db.create(ConectionDBName.connectionDB).then(
                                            (connection: SQLiteObject) => {
                                                connection.executeSql(sql, paramSql).then(
                                                    (result) => {
                                                      let num: number = SQLiteHandle.recordBeWrite; 
                                                      SQLiteHandle.recordBeWrite = Number(num + 1);
                                                    }
                                                    , (error) => {
                                                        console.log('==== Insert table Quotationrider error. ' + itemM.agentid + error);
                                                    }
                                                )
                                            }
                                            , (error) => {
                                                reject(error);
                                            }
                                        ).catch((error) => {
                                            reject(error);
                                        });
                                    }
                                });
                            });
          
                            let resM: ResponseModel = new ResponseModel();
                            resM.status = 0;
                            resolve(resM);
                        }

                    }
                    , (error) => {
                        reject(error);
                    }

                ).catch((error) => {
                    reject(error);
                });
                
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

  public update(objM: QuotationRiderM, lastSync: string) {
      return new Promise((resolve, reject) => {
          this.createTable().then(
              (res) => {
                  try {
                      let sql = 'UPDATE ' + TB_SQLITE.tb_quotationrider;
                      sql += ' SET quotationno=?, customerid=?, ridertype=?, sum=?, premium=?, ';
                      sql += ' createdatetime=?, lastmodify=?, lastsync=?, agentid=?';
                      sql += ' WHERE quotationno=? AND customerid=? AND ridertype=?';

                      let paramSql = [
                          objM.quotationno, objM.customerid, objM.ridertype, objM.sum, objM.premium,
                          objM.createdatetime, objM.lastmodify, objM.lastsync, objM.agentid,
                          objM.quotationno, objM.customerid, objM.ridertype
                      ];

                      this.db.create(ConectionDBName.connectionDB).then(
                          (connection: SQLiteObject) => {
                              connection.executeSql(sql, paramSql).then(
                                  (result) => {

                                    let num: number = SQLiteHandle.recordBeWrite; 
                                    SQLiteHandle.recordBeWrite = Number(num + 1);

                                    let resM: ResponseModel = new ResponseModel();
                                    resM.status = 0;
                                    resolve(resM);
                                  }
                                  , (error) => {
                                      console.log("===== UPDATE ERROR Quotationrider " + error);
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

  public delete(objM: QuotationRiderM) {
   // console.log("Quotationrider : delete = " + JSON.stringify(objM));
      return new Promise((resolve, reject) => {
          this.createTable().then(
              (res) => { 
                  try {
                      let sql = "DELETE FROM " + TB_SQLITE.tb_quotationrider;
                      sql += " WHERE quotationno=? AND customerid=? AND agentid=?;";

                      let paramSql = [
                          objM.quotationno,
                          objM.customerid,
                          objM.agentid
                      ];

                      this.db.create(ConectionDBName.connectionDB).then(
                          (connection: SQLiteObject) => {
                              connection.executeSql(sql, paramSql).then(
                                  (result) => {
                                    //console.log("===== Delete Quotationrider success.");
                                      resolve(res);
                                  }
                                  , (error) => {
                                      console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete ERROR Quotationrider " + error);
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

  public deleteByQuoNo(objMs: any) {
     
    //console.log("Quotationrider : deleteByQuoNo = " + JSON.stringify(objMs));

    return new Promise((resolve, reject) => {
        this.createTable().then(
            (res) => {

                let valArray: Array<string> = new Array<string>();
                
                objMs.forEach(itemM => { 
                    valArray.push("'" + itemM.quotationno + "'");
                });

                let sqlParameList: string = valArray.join(","); 
                
                let sql = "DELETE FROM " + TB_SQLITE.tb_quotationrider;
                sql += " WHERE quotationno IN (" + sqlParameList + ")";

                //console.log('SQL command = xxxxxxxxxxxxx ' + sql);

                this.db.create(ConectionDBName.connectionDB).then(
                    (connection: SQLiteObject) => {
                        connection.executeSql(sql, []).then(
                            (result) => {
                                //console.log("===== deleteByQuoNo Quotationrider success.");
                                resolve(res);
                            }
                            , (error) => {
                                console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> deleteByQuoNo ERROR Quotationrider " + error);
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

  public updateLastSync(objM: QuotationRiderM) {
      return new Promise((resolve, reject) => {
          this.createTable().then(
              (res) => {
                  try {
                      let sql = "UPDATE " + TB_SQLITE.tb_quotationrider;
                      sql += " SET ";
                      sql += " lastsync=?";
                      sql += " WHERE quotationno=? AND customerid=? AND ridertype=?;";

                      let paramSql = [
                        objM.lastsync, objM.quotationno, objM.customerid, objM.ridertype
                      ];

                      this.db.create(ConectionDBName.connectionDB).then(
                          (connection: SQLiteObject) => {
                              connection.executeSql(sql, paramSql).then(
                                  (result) => {
                                      resolve(res);
                                  }
                                  , (error) => {
                                      console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> updateLastSync ERROR Quotationrider " + error);
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

  public querySize(quotationRiderM: QuotationRiderM) {

   // console.log("----------- QuotationRiderService : querySize ------------" + JSON.stringify(quotationRiderM));

      return new Promise((resolve, reject) => {
          this.createTable().then(
              (res) => {
                  try {
                      let responseM: ResponseModel = new ResponseModel();
                      let paramSQL = [];
                      let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_quotationrider;

                      if (quotationRiderM.quotationno != "" && quotationRiderM.customerid != "") {
                            sql += " WHERE quotationno=? AND customerid=? AND ridertype=?;";
                          paramSQL = [quotationRiderM.quotationno, quotationRiderM.customerid, quotationRiderM.ridertype];
                      }

                      this.db.create(ConectionDBName.connectionDB).then(
                          (connection: SQLiteObject) => {
                              connection.executeSql(sql, paramSQL).then(
                                  (result) => {

                                     //console.log("----------- QuotationRiderService : querySize  = " + result.rows.item(0).total);

                                      responseM.size = result.rows.item(0).total;
                                      responseM.status = 0;
                                      resolve(responseM);
                                  }
                                  , (error) => {
                                      console.log("===== SELECT ERROR QuotationriderService querySize " + error.message);
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

    public search(reqM: RequestModel) {
        
       // console.log(" QuotationRiderService search = " + JSON.stringify(reqM));
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let quotationRiderMs: QuotationRiderM[] = reqM.param;
                    let responseM: ResponseModel = new ResponseModel();

                    let keyvalue: string = reqM.keyvalue;
                    let searchMode: string = reqM.searchmode;
                    let agentid: string = reqM.agentid;
                    let syncMode: boolean = reqM.syncMode;
                    let customerType: string = "";

                    let sql: string = "";
                    if (syncMode == true) {
                        sql = "SELECT * FROM " + TB_SQLITE.tb_quotationrider + " WHERE agentID='"+ agentid +"'  ";
                    }
                    else {
                        let objM: QuotationRiderM = quotationRiderMs[0];
                        sql = "SELECT * FROM " + TB_SQLITE.tb_quotationrider + " WHERE agentID='"+ agentid +"' ";
                        sql += " AND quotationno='"+ objM.quotationno +"' AND customerid='"+ objM.customerid +"'"; 
                    }

                   // console.log("QuotationRiderService search SQL = " + sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {

                                   // console.log("QuotationRiderService : result.rows.length = " + result.rows.length);

                                    let quotationModels: Array<QuotationRiderM> = [];

                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {

                                            if (reqM.syncMode != null && reqM.syncMode == true) {

                                                let objM: QuotationRiderM = result.rows.item(index);

                                                if (reqM.lastsync != null && reqM.lastsync != "") {
                                                    if (new Date(objM.lastmodify.replace(' ', 'T')) > new Date(reqM.lastsync.replace(' ', 'T'))) {
                                                    quotationModels.push(result.rows.item(index));
                                                    }
                                                }
                                                else {
                                                    quotationModels.push(result.rows.item(index));
                                                }
                                            }
                                            else {
                                                quotationModels.push(result.rows.item(index));
                                            }
                                        }

                                        responseM.size = quotationModels.length;
                                        responseM.data = quotationModels;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = quotationModels;
                                        responseM.size = 0;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> SELECT ERROR " + JSON.stringify(error));
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
                    let sql: string = "DROP TABLE " + TB_SQLITE.tb_quotationrider;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table tb_quotationrider seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop tb_quotationrider error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_quotationrider + 
                            `(
                                quotationno TEXT, customerid TEXT, ridertype TEXT, sum TEXT, premium TEXT,
                                createdatetime TEXT, lastmodify TEXT, lastsync TEXT, agentid TEXT, 
                                PRIMARY KEY (quotationno, customerid, ridertype)
                                );`;

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table " + TB_SQLITE.tb_quotationrider + " error.");
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
