import { QuotationRiderM } from './../quotationrider/quotationrider-model';
import { DateUtil } from './../utility/date-util';
import { QuotationGuardianM } from './../quotationguardian/quotationguardian-model';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { RequestModel } from "../model/request-model";
import { ConectionDBName } from "../constants/connect-db-name";
import { TB_SQLITE } from "../constants/table-config";
import { ResponseModel } from '../model/response-model';
import { SQLiteHandle } from '../utility/sqlite-handle';
import { QuotationModel } from './quotation-model'; 
import { QuotationDraftService } from './quotation-draft-service';
import { Injectable } from '@angular/core';
import { CalculateAgeUtil } from '../utility/calculate-age-util';

@Injectable()
export class QuotationService {

    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
       
        //console.log("----------- QuatationService : insert ------------" + JSON.stringify(reqM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let objM: any[] = reqM.param;
                    if (objM != null && objM.length > 0) {

                        let sqlInsert = `INSERT INTO ` + TB_SQLITE.tb_quotation +
                        `(
                            quotationno, customerid, agentid, devicerefno, plancode,
                            planname, mode, occupationtype, insureage, lifesum,
                            lifepremium, pname, fname, lname, branch,
                            tax, publishstatus, packageno, referenceno, createdatetime,
                            lastmodify, lastsync, birthdate, status, pdfpath,
                            occgroup, occ,
                            healthcheckflag, totalpremium, typeapp, ppayyear, pendowmentyear,
                            paytype, endowmenttype, havetp, kbcoverageyear, soldier,
                            pdflang, alfrescoid, disabled, gender,
                            savingsum, savingpremium, topuppremium, topuptype
                        ) VALUES(
                                    ?, ?, ?, ?, ?, 
                                    ?, ?, ?, ?, ?, 
                                    ?, ?, ?, ?, ?, 
                                    ?, ?, ?, ?, ?, 
                                    ?, ?, ?, ?, ?,
                                    ?, ?,
                                    ?, ?, ?, ?, ?,
                                    ?, ?, ?, ?, ?,
                                    ?, ?, ?, ?,
                                    ?, ?, ?, ?
                                )`;

                        this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {

                            if ('1' == reqM.searchkey) {
                                
                                console.log(' ********************* Quotation insert first time by sync. ********************* ');
                                objM.forEach(itemM => {

                                    let paramSql = [
                                        itemM.quotationno, itemM.customerid, itemM.agentid, itemM.devicerefno, itemM.plancode,
                                        itemM.planname, itemM.mode, itemM.occupationtype, Number(itemM.insureage), itemM.lifesum,
                                        itemM.lifepremium, itemM.pname, itemM.fname, itemM.lname, itemM.branch,
                                        itemM.tax, itemM.publishstatus, itemM.packageno, itemM.referenceno, itemM.createdatetime,
                                        itemM.lastmodify, itemM.lastsync, itemM.birthdate, itemM.status, itemM.pdfpath,
                                        itemM.occgroup, itemM.occ,
                                        itemM.healthcheckflag, itemM.totalpremium, itemM.typeapp, itemM.ppayyear, itemM.pendowmentyear, 
                                        itemM.paytype, itemM.endowmenttype, itemM.havetp, itemM.kbcoverageyear, itemM.soldier, 
                                        itemM.pdflang, itemM.alfrescoid, itemM.disabled, itemM.gender,
                                        itemM.savingsum, itemM.savingpremium, itemM.topuppremium, itemM.topuptype
                                    ];

                                    connection.executeSql(sqlInsert, paramSql).then(
                                     (res) => {
                                         let num: number = SQLiteHandle.recordBeWrite;
                                         SQLiteHandle.recordBeWrite = Number(num + 1);
                                         //console.log('==== Insert table tb_quatation successfully.');
                                     }
                                     , (error) => {
                                         console.log('==== Insert table tb_quatation error. ' + JSON.stringify(error));
                                         reject(error);
                                     })
                                    
                                });

                                resolve(res);
                            }
                            else {
                                console.log(' ********************* Quotation insert. ********************* ');
                               
                                objM.forEach(itemM => { 
                                    this.querySize(itemM).then(async (res) => {
                                       let obj: any = res;
                                       let resM: ResponseModel = obj;
                                       if (resM.size > 0) {
                                           await this.update(itemM);
                                       }
                                       else {

                                        let occgroupN: string = '';
                                        if (itemM.occgroup === '' || itemM.occgroup === null) {
                                            occgroupN = '';
                                        }
                                        else {
                                            occgroupN = String(Number(itemM.occgroup));
                                        }
                                        
                                        let paramSql = [
                                            itemM.quotationno, itemM.customerid, itemM.agentid, itemM.devicerefno, itemM.plancode,
                                            itemM.planname, itemM.mode, itemM.occupationtype, Number(itemM.insureage), itemM.lifesum,
                                            itemM.lifepremium, itemM.pname, itemM.fname, itemM.lname, itemM.branch,
                                            itemM.tax, itemM.publishstatus, itemM.packageno, itemM.referenceno, itemM.createdatetime,
                                            itemM.lastmodify, itemM.lastsync, itemM.birthdate, itemM.status, itemM.pdfpath,
                                            occgroupN, itemM.occ,
                                            itemM.healthcheckflag, itemM.totalpremium, itemM.typeapp, itemM.ppayyear, itemM.pendowmentyear, 
                                            itemM.paytype, itemM.endowmenttype, itemM.havetp, itemM.kbcoverageyear, itemM.soldier, 
                                            itemM.pdflang, itemM.alfrescoid, itemM.disabled, itemM.gender,
                                            itemM.savingsum, itemM.savingpremium, itemM.topuppremium, itemM.topuptype
                                        ];
    
                                        connection.executeSql(sqlInsert, paramSql).then(
                                        (result) => {
                                            let num: number = SQLiteHandle.recordBeWrite;
                                            SQLiteHandle.recordBeWrite = Number(num + 1);
                                            //console.log('==== Insert table tb_quatation successfully.');
                                            
                                        }
                                        , (error) => {
                                            console.log('==== Insert table tb_quatation error. ' + JSON.stringify(error));
                                        })
                                       }
                                   });
                               });

                               resolve(res);
                            }
                        }
                        , (error) => {
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

    public update(objM: any) {
         
        //console.log("----------- QuatationService : update XML = " + JSON.stringify(objM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let occgroupN: string = '';
                    if (objM.occgroup === '' || objM.occgroup === null) {
                        occgroupN = '';
                    }
                    else {
                        occgroupN = String(Number(objM.occgroup));
                    }
                    
                    let sql = `UPDATE ` + TB_SQLITE.tb_quotation + 
                    ` SET 
                    plancode=?, planname=?, mode=?, occupationtype=?, insureage=?,
                    lifesum=?, lifepremium=?, pname=?, fname=?, lname=?,
                    branch=?, tax=?, publishstatus=?, packageno=?, referenceno=?,
                    createdatetime=?, lastmodify=?, lastsync=?, birthdate=?, status=?,
                    pdfpath=?, occgroup=?, occ=?, healthcheckflag=?, totalpremium=?,
                    typeapp=?, ppayyear=?, pendowmentyear=?, paytype=?, endowmenttype=?,
                    havetp=?, kbcoverageyear=?, soldier=?, pdflang=?, alfrescoid=?,
                    disabled=?, gender=?,
                    savingsum=?, savingpremium=?, topuppremium=?, topuptype=?
                        
                    WHERE quotationno=? AND customerid=?;`;
                    
                    let paramSql = [
                        objM.plancode, objM.planname, objM.mode, objM.occupationtype, Number(objM.insureage),
                        objM.lifesum, objM.lifepremium, objM.pname, objM.fname, objM.lname,
                        objM.branch, objM.tax, objM.publishstatus, objM.packageno, objM.referenceno,
                        objM.createdatetime, objM.lastmodify, objM.lastsync, objM.birthdate, objM.status,
                        objM.pdfpath, occgroupN, objM.occ, objM.healthcheckflag, objM.totalpremium,
                        objM.typeapp, objM.ppayyear, objM.pendowmentyear, objM.paytype, objM.endowmenttype,
                        objM.havetp, objM.kbcoverageyear, objM.soldier, objM.pdflang, objM.alfrescoid,
                        objM.disabled, objM.gender, 
                        objM.savingsum, objM.savingpremium, objM.topuppremium, objM.topuptype,

                        objM.quotationno, objM.customerid,
                    ];
                    
                    //console.log(JSON.stringify(paramSql));

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSql).then(
                                (result) => {
                                    
                                    let num: number = SQLiteHandle.recordBeWrite;
                                    SQLiteHandle.recordBeWrite = Number(num + 1);

                                    //console.log("===== Update tb_quatation success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Update tb_quatation error." + JSON.stringify(error));
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

   updateRefno(objM: any) {
         
        //console.log("----------- QuatationService : updateRefno XML = " + JSON.stringify(objM));

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    
                    let sql = `UPDATE ` + TB_SQLITE.tb_quotation + 
                    ` SET 
                    referenceno=?, pdflang=?, status=?, pdfpath=?
                    WHERE quotationno=? AND customerid=?;`;
                    
                    let paramSql = [
                        objM.referenceno, objM.pdflang, objM.status, objM.pdfpath,
                        objM.quotationno, objM.customerid
                    ];
                    
                    //console.log(JSON.stringify(paramSql));//objM.lastmodify 

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSql).then(
                                (result) => {

                                    //console.log("===== Update tb_quatation updateRefno success.");
                                    resolve(res);
                                }
                                , (error) => {
                                    console.log("===== Update tb_quatation  updateRefno error." + JSON.stringify(error));
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

    public delete(objM: any) {
        //console.log("----------- QuatationService : delete ------------" + JSON.stringify(objM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let reqM: RequestModel = objM;

                    let objMs: Array<QuotationModel> = reqM.param;

                    if ("DRAFT_DELETE" == reqM.searchkey) {

                        let qDraft: QuotationDraftService = new QuotationDraftService(this.platform, this.db);
                        qDraft.deleteDraft(reqM).then(
                            (res)=> {
                                let responseM: ResponseModel = new ResponseModel();
                                responseM.data = [];
                                responseM.size = 0;
                                responseM.status = 0;
                                resolve(responseM); 
                            },
                            (err)=> {
                                reject(err);
                            }
                        )
                    }
                    else {

                        let sql = `UPDATE ` + TB_SQLITE.tb_quotation + 
                        ` SET publishstatus=?, lastmodify=?
                            WHERE quotationno=? AND customerid=? AND agentid=?;`;
                        //console.log(sql); 
    
                        let paramSql = [
                            'C', objMs[0].lastmodify, 
                            objMs[0].quotationno, objMs[0].customerid, reqM.agentid
                        ];
    
                        //console.log(JSON.stringify(paramSql)); 
    
                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        console.log("===== Delete tb_quatation success.");

                                        let responseM: ResponseModel = new ResponseModel();
                                        responseM.data = [{'applicationAmt' : '0'}];
                                        responseM.size = 0;
                                        responseM.status = 0;

                                        resolve(responseM);
                                    }
                                    , (error) => {
                                        console.log("===== Delete tb_quatation error." + JSON.stringify(error)); 
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
                    
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    public searchBy(obj: any) {
        //console.log("----------- QuatationService : searchBy XML = " + JSON.stringify(obj));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let reqM: RequestModel = obj;
                    let objMs: Array<QuotationModel> = reqM.param;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_quotation;
    
                    if (objMs != null && objMs.length > 0) {
                        if (objMs[0].customerid != undefined && objMs[0].customerid != "") {
                            
                            sql += " WHERE customerid=? AND quotationno=?";

                            paramSQL = [objMs[0].customerid, objMs[0].quotationno];
                        }
                    } 
    
                    //console.log(sql + " : " + JSON.stringify(paramSQL));
    
                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let quatationMs: Array<QuotationModel> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            
                                            let quotationM: QuotationModel  = result.rows.item(index);

                                            //console.log("quotationM Select XML = " + JSON.stringify(quotationM));
                                            quatationMs.push(quotationM);
                                        }

                                        responseM.size = quatationMs.length;
                                        responseM.data = quatationMs;
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
                                    console.log("===== Select tb_quatation error " + JSON.stringify(error));
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

    async search(obj: any) {
        //console.log("----------- QuatationService : search ------------" + JSON.stringify(obj));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let reqM: RequestModel = obj;
                    let lastSyncSession: string = reqM.lastsync;
                    let syncMode: boolean = reqM.syncMode;
                    let objMs: Array<QuotationModel> = reqM.param;

                    if ("DRAFT" == reqM.searchkey) {

                        let responseM: ResponseModel = new ResponseModel();
                        let quatationMs: Array<QuotationModel> = [];

                        let sql: string = "SELECT * FROM quotation WHERE agentid='"+ reqM.agentid +"' AND publishstatus='"+ objMs[0].publishstatus +"'";
                        //console.log(" SQL Select DRAFT = " + sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, []).then(
                                    (res) => {
                                        
                                        var len = res.rows.length;
                                        if (res.rows.length == 0) {
                                            responseM.data = [];
                                            responseM.size = 0;
                                            responseM.status = 0;
                                            resolve(responseM);
                                        }
                                        
                                        for (var index = 0; index < len; index++) {
                                           
                                            let quotationM: QuotationModel = res.rows.item(index);

                                            let quotationGuardianMs: Array<QuotationGuardianM> = [];
                                            let sqlA: string = "SELECT * FROM quotationguardian WHERE ";
                                            sqlA += " customerid='"+ quotationM.customerid +"' AND quotationno='"+ quotationM.quotationno +"' AND agentid='"+ quotationM.agentid +"'";
                                            
                                            //console.log("sqlA = " + sqlA);

                                            connection.executeSql(sqlA, []).then(
                                                (resultA) => {

                                                    var len = resultA.rows.length;
                                                    for (var index = 0; index < len; index++) {
                                                        quotationGuardianMs.push(resultA.rows.item(index));
                                                    }
                                                    
                                                    quotationM.quotationGuardianMs = quotationGuardianMs;

                                                    /**
                                                     * Select prospect. 
                                                     */
                                                    let sqlProspect: string = "SELECT * FROM prospect WHERE ";
                                                    sqlProspect += " customerid='"+ quotationM.customerid +"' AND agentid='"+ quotationM.agentid +"'";
                                                   // console.log("sqlProspect = " + sqlProspect);

                                                    connection.executeSql(sqlProspect, []).then(
                                                        (resultA) => {

                                                            var len = resultA.rows.length;
                                                            for (var index = 0; index < len; index++) {
                                                                //console.log("XXX 2 " + JSON.stringify(resultA.rows.item(index)));
                                                                quotationM.prospectM = resultA.rows.item(index);
                                                            }

                                                            let quotationRiderMs: Array<QuotationRiderM> = [];
                                                            let sqlRider: string = "SELECT * FROM quotationrider WHERE ";
                                                            sqlRider += " customerid='"+ quotationM.customerid +"' AND quotationno='"+ quotationM.quotationno +"' AND agentid='"+ quotationM.agentid +"'";
                                                            connection.executeSql(sqlRider, []).then(
                                                                (resultRider) => { 

                                                                    var len = resultRider.rows.length;
                                                                    for (var index = 0; index < len; index++) {
                                                                        quotationRiderMs.push(resultRider.rows.item(index));
                                                                    }
                                                                    
                                                                    quotationM.quotationRiderMs = quotationRiderMs;
                                                                    quatationMs.push(quotationM);

                                                                    responseM.status = 0;
                                                                    responseM.size = quatationMs.length;
                                                                    responseM.data = quatationMs;
        
                                                                    resolve(responseM);
                                                                }
                                                            );
                                                            

                                                        } 
                                                        , (error) => { console.log(JSON.stringify(error)); }
                                                    )
                                                }
                                                , (error) => { console.log(JSON.stringify(error)); }
                                            )
                                        }
                                    }
                                    , (err) => {
                                        console.log("===== QuotationDraftService : selectDraft tb_quatation error." + JSON.stringify(err)); 
                                        reject(err);
                                    }
                                )
                            }
                            , (err) => {
                                console.log(err);
                                reject(err);
                            }
                        )
                    }
                    else {

                        let responseM: ResponseModel = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT * FROM " + TB_SQLITE.tb_quotation + " WHERE agentid='" + reqM.agentid + "'";
                        if (syncMode != undefined && syncMode) {
                            sql += " AND publishstatus != 'D'";
                        }
    
                        if (objMs != null && objMs.length > 0) {
                            if (objMs[0].customerid != null && objMs[0].customerid != "") {
                                
                                sql = "SELECT quo.*,";
                                sql += " (SELECT plancode FROM tlplan WHERE tlplan.plancode=quo.plancode) AS planc, ";
                                sql += " (SELECT birthdate FROM prospect WHERE prospect.customerid=quo.customerid) AS pBirthdate";
                                sql += " FROM quotation quo WHERE quo.agentid=? AND quo.customerid=? AND (publishstatus='' OR publishstatus=null )";
                                sql += " ORDER BY quo.lastmodify DESC ";

                                paramSQL = [reqM.agentid, objMs[0].customerid];

                                if (objMs[0].quotationno != undefined && objMs[0].quotationno != "") {
                                    sql = "SELECT quo.*,";
                                    sql += " (SELECT plancode FROM tlplan WHERE tlplan.plancode=quo.plancode) AS planc, ";
                                    sql += " (SELECT birthdate FROM prospect WHERE prospect.customerid=quo.customerid) AS pBirthdate";
                                    sql += " FROM quotation quo WHERE quo.agentid=? AND quo.customerid=? AND quo.quotationno=? AND (publishstatus='' OR publishstatus=null)";
                                    sql += " ORDER BY quo.lastmodify DESC ";

                                    paramSQL = [reqM.agentid, objMs[0].customerid, objMs[0].quotationno];
                                }
                            }
                        } 

                        //console.log(sql + " : " + JSON.stringify(paramSQL));
    
                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                       
                                        responseM.status = 0;
                                        if (result.rows.length > 0) {
    
                                            let quatationMs: Array<QuotationModel> = [];
                                            var len = result.rows.length;
                                            for (var index = 0; index < len; index++) {
    
                                                if (syncMode != undefined && syncMode) {

                                                    let quotationM: QuotationModel  = result.rows.item(index);
    
                                                    quotationM.lastsync = DateUtil.date2str(new Date());
                                                   
    
                                                    if (lastSyncSession != undefined 
                                                        && lastSyncSession != "") {
                                                        
                                                            if (quotationM.lastmodify != undefined && quotationM.lastmodify != "") {
                                                                if (new Date(quotationM.lastmodify.replace(' ', 'T')) > new Date(lastSyncSession.replace(' ', 'T'))) {
                                                                    quatationMs.push(quotationM);
                                                                }
                                                            }
                                                    }
                                                    else {
                                                        quatationMs.push(quotationM);
                                                    }
    
                                                    responseM.size = quatationMs.length;
                                                }
                                                else {
                                                    let quotationM: QuotationModel  = result.rows.item(index);

                                                    quotationM.occgroup = result.rows.item(index).occgroup == null || undefined ? '' : result.rows.item(index).occgroup;
	                                                quotationM.occ = result.rows.item(index).occ == null || undefined ? '' : result.rows.item(index).occ;

                                                    quotationM.disabled = false;

                                                    let planc: string = result.rows.item(index).planc;
                                                    let pBirthdate: string = result.rows.item(index).pBirthdate;

                                                    //console.log("quotationM Select XML = " + JSON.stringify(result.rows.item(index)));
                                                    //console.log("planc => " + planc);

                                                    if (planc == "null" || planc == undefined || planc == null) {
                                                        quotationM.disabled = true;
                                                        quotationM.caseExpire = "0";
                                                    }

                                                    //console.log("pBirthdate => " + pBirthdate);
                                                    //console.log("insureage => " + quotationM.insureage);
                                                    if (pBirthdate != "null" || pBirthdate != undefined || pBirthdate != null) {
                                                        //var ageProspect = moment().diff(moment(pBirthdate.replace(' ', 'T'), "YYYY-MM-DD"), 'year');
 
                                                        let birthDate: Date = new Date(pBirthdate.replace(' ', 'T'));
                                                        //console.log("birthDate => " + birthDate);
                                                        //console.log("CalculateAgeUtil.calculateAge(birthDate) => " + CalculateAgeUtil.calculateAge(birthDate));

                                                        if (Number(CalculateAgeUtil.calculateAge(birthDate)) != Number(quotationM.insureage)) {
                                                            quotationM.disabled = true;
                                                        }
                                                        
                                                    }
                                                    
                                                    //console.log("quotationM XML = " + JSON.stringify(quotationM));
                                                   
                                                    quatationMs.push(quotationM); 
                                                } 
                                            }
    
                                            responseM.size = quatationMs.length;
                                            responseM.data = quatationMs;
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
                                        console.log("===== Select tb_quatation error " + JSON.stringify(error));
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
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    async getProspect(connection, agentid, customerid) {
        return new Promise((resolve, reject) => {

            let responseM: ResponseModel = new ResponseModel();
            
            let sql: string = "SELECT * FROM prospect WHERE agentid=? AND customerid=?";
            let paramSQL = [agentid, customerid];

            connection.executeSql(sql, paramSQL).then(
                (result) => {

                    console.log("prospectM2 Select XML = " + JSON.stringify(result.rows.item(0)));
                    resolve(result.rows.item(0));
                }
                , (error) => {
                    console.log("===== Select error prospect : " + error.message);
                    reject(error);
                }
            )

        });
    }

    async querySize(quotationModel: QuotationModel) {
       // console.log("----------- quatationtService : querySize ------------ " + JSON.stringify(quatationModel));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let responseM: ResponseModel = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_quotation + ";";

                        if (quotationModel.quotationno != "" && quotationModel.quotationno != "") {
                            sql = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_quotation + " WHERE quotationno=? AND customerid=?;";
                            paramSQL = [quotationModel.quotationno, quotationModel.customerid];
                        }
                        //console.log("Quotation querySize = " + sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        responseM.size = result.rows.item(0).total;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                    , (error) => {
                                        console.log("===== Select error tb_quatation querySize " + error.message);
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

    public updateLastSync() {
        //console.log("----------- ProspectService : updateLastSync ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + TB_SQLITE.tb_quotation;
                        sql += " SET ";
                        sql += "lastsync='" + DateUtil.date2str(new Date()) + "'";
                        //console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, []).then(
                                    (result) => {
                                        //console.log("===== Update LastSync tb_quatation success.");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Update LastSync tb_quatation error. " + error);
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

    public drop() {
        console.log("----------- tb_quotation : drop ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "DROP table " + TB_SQLITE.tb_quotation;
                        //console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, []).then(
                                    (result) => {
                                        console.log("===== Drop table tb_quatation success.");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Drop table tb_quatation error. " + JSON.stringify(error));
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
                    this.db.create(ConectionDBName.connectionDB)
                        .then(
                        (connection: SQLiteObject) => {
                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_quotation + 
                            `(
                                quotationno TEXT, customerid TEXT, agentid TEXT, devicerefno TEXT, plancode TEXT,
                                planname TEXT, mode TEXT, occupationtype TEXT, insureage INTEGER, lifesum TEXT,
                                lifepremium TEXT, pname TEXT, fname TEXT, lname TEXT, branch TEXT,
                                tax TEXT, publishstatus TEXT, packageno TEXT, referenceno TEXT, createdatetime TEXT,
                                lastmodify TEXT, lastsync TEXT, birthdate TEXT, status TEXT, pdfpath TEXT,
                                occgroup TEXT, occ TEXT, healthcheckflag TEXT, totalpremium TEXT, typeapp TEXT,
                                ppayyear TEXT, pendowmentyear TEXT, paytype TEXT, endowmenttype TEXT, havetp TEXT,
                                kbcoverageyear TEXT, soldier TEXT, pdflang TEXT, alfrescoid TEXT, disabled TEXT,
                                gender TEXT, savingsum TEXT, savingpremium TEXT, topuppremium TEXT, topuptype TEXT,
                                PRIMARY KEY (quotationno, customerid, agentid)
                             );`;

                             //console.log(sql); 

                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_quatation + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table tb_quotation " + JSON.stringify(error));
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