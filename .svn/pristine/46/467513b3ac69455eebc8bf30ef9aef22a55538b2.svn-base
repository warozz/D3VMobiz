import { ResponseModel } from './../model/response-model';
import { ConectionDBName } from '../constants/connect-db-name';
import { RequestModel } from '../model/request-model';
import { Platform } from 'ionic-angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { VersionModel } from './version-model';

export class VersionService {

    TABLE_NAME: string = "VERSION";

    constructor(public platform: Platform, public db: SQLite) {}

    public insert(versionModel: VersionModel) {
        console.log("----------- VersionService : insert ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    if (versionModel != null) {
                        this.search(versionModel).then((res) => {
                            this.delete(versionModel).then((res) => {
                               let sql = "INSERT INTO " + this.TABLE_NAME;
                               sql += " (";
                               sql += "version, patch, datemodified";
                               sql += " )";
                               sql += " VALUES ";
                               sql += " ( ";
                               sql += " ?,?,? ";
                               sql += " ) ";
                               sql += ";";
                               console.log(sql);
   
                               let paramSql = [versionModel.version, versionModel.patch, versionModel.datemodified];
   
                               this.db.create(ConectionDBName.connectionDB).then(
                                   (connection: SQLiteObject) => {
                                       connection.executeSql(sql, paramSql).then(
                                           (result) => {
                                               console.log('==== INSERT VERSION SUCCESS ');
                                               resolve(result);
                                           }
                                           , (error) => {
                                               console.log('==== INSERT VERSION ERROR ' + error);
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
                            });
                       },(err) => {
                           console.log(err);
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

    public delete(versionModel: VersionModel) {
        console.log("----------- VersionService : delete ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let sql = "DELETE FROM " + this.TABLE_NAME;
                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== DELETE VERSION SUCCESS ");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("===== DELETE VERSION ERROR " + error.message);
                                    reject(error);
                                }
                            )
                        }
                        , (error) => {
                            console.log(error);
                            reject(error);
                        }
                    );

                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    public update(versionModel: VersionModel) {
        console.log("----------- VersionService : update ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + this.TABLE_NAME;
                        sql += " SET ";
                        sql += " patch=?, datemodified=?";
                        sql += " WHERE version=?";
                        console.log(sql);

                        let paramSql = [versionModel.patch, versionModel.datemodified, versionModel.version];

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        console.log("===== UPDATE SUCCESS ");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("===== UPDATE ERROR " + error.message);
                                        reject(error);
                                    }
                                )
                            }
                            , (error) => {
                                console.log(error);
                                reject(error);
                            }
                        );
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

    public search(versionModel: VersionModel) {
        console.log("----------- VersionService : search ------------ version = " + versionModel.version);
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let responseM = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT * FROM " + this.TABLE_NAME + ";";
                        if (versionModel.version != null && versionModel.version != "") {
                            sql = "SELECT * FROM " + this.TABLE_NAME + " WHERE version=?;";
                            paramSQL = [versionModel.version];
                        }
                        console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        console.log("===== SELECT SUCCESS size " + result.rows.length);
                                        responseM.size = result.rows.length;
                                        responseM.status = 0;
                                        if (result.rows.length > 0) {

                                            let versionModels: VersionModel[] = [];

                                            var len = result.rows.length;
                                            for (var index = 0; index < len; index++) {
                                                let obj: VersionModel = new VersionModel();
                                                obj.version = result.rows.item(index).version;
                                                obj.patch = result.rows.item(index).patch;
                                                obj.datemodified = result.rows.item(index).datemodified;

                                                versionModels.push(obj);
                                            }

                                            responseM.data = versionModels;
                                            resolve(responseM);
                                        }
                                        else {
                                            responseM.size = 0;
                                            responseM.status = 0;
                                            resolve(responseM);
                                        }
                                    }
                                    , (error) => {
                                        console.log("===== SELECT ERROR" + error);
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

    public createTable() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(
                () => {
                    try {
                        this.db.create(ConectionDBName.connectionDB)
                            .then(
                            (connection: SQLiteObject) => {

                                let sql: string = "CREATE TABLE IF NOT EXISTS " + this.TABLE_NAME;
                                sql += "(";
                                sql += "version TEXT PRIMARY KEY, patch TEXT, datemodified TEXT";
                                sql += ");";
                                console.log(sql);

                                connection.executeSql(sql, []).then(
                                    (result) => {
                                        resolve(result);
                                    }
                                    , (error) => {
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
                    catch (error) {
                        console.log(error);
                        reject(error);
                    }
                }
                , (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
}
