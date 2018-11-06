import { DateUtil } from './../utility/date-util';
import { RequestModel } from './../model/request-model';
import { ProspectModel } from './prospect-model';
import { Platform } from "ionic-angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { ConectionDBName } from "../constants/connect-db-name";
import { TB_SQLITE } from "../constants/table-config";
import { ResponseModel } from '../model/response-model';
import { SQLiteHandle } from '../utility/sqlite-handle';
import { UUID } from 'angular2-uuid';

export class ProspectService {  

    constructor(public platform: Platform, public db: SQLite) {}
    
    public insert(reqM: RequestModel) {
       
        //console.log("----------- ProspectService : insert ------------" + JSON.stringify(reqM));
       
        let dateSync = DateUtil.date2str(new Date()); 

        let prospectMs: Array<ProspectModel> = [];

        return new Promise((resolve, reject) => { 
            this.createTable().then(
                (res) => {
                    let objM: any[] = reqM.param;
                    if (objM != null && objM.length > 0) {
                        
                        let sql = `INSERT INTO ` + TB_SQLITE.tb_prospect +
                        `(
                            agentID, customerID, firstName, lastName, preName, 
                            preNameOther, gender, occupationType, age, birthDate, 
                            telephone, mobilephone, fax, passport, lineID, 
                            linkFacebook, geolocation, address, subdistrict, district, 
                            province, postcode, status, remark, createDatetime, 
                            lastModify, lastSync, citizenID, email, customerType, 
                            addressno, buildingname, moo, soi, road, flagdraftyn,
                            maritalstatus) VALUES(
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?, 
                                ?, ?, ?, ?, ?,
                                ?, ?, ?, ?, ?, ?, 
                                ?
                                )`;

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {

                                if ('1' == reqM.searchkey) {
                                    console.log(' ********************* Prospect insert first time by sync. ********************* ');
                                    objM.forEach(itemM => {
                                    let paramSql = [
                                        itemM.agentID, itemM.customerID, itemM.firstName, itemM.lastName, itemM.preName,
                                        itemM.preNameOther, itemM.gender, itemM.occupationType, Number(itemM.age), itemM.birthDate,
                                        itemM.telephone, itemM.mobilephone, itemM.fax, itemM.passport, itemM.lineID,
                                        itemM.linkFacebook, itemM.geolocation, itemM.address, itemM.subdistrict, itemM.district,
                                        itemM.province, itemM.postcode, itemM.status, itemM.remark, itemM.createDatetime,
                                        itemM.lastModify, itemM.lastSync, itemM.citizenID, itemM.email, itemM.customerType, 
                                        itemM.addressno, itemM.buildingname, itemM.moo, itemM.soi, itemM.road, itemM.flagdraftyn,
                                        itemM.maritalstatus
                                    ];

                                    connection.executeSql(sql, paramSql).then(
                                        (res) => {
                                            let num: number = SQLiteHandle.recordBeWrite;
                                            SQLiteHandle.recordBeWrite = Number(num + 1);
                                            //console.log('==== Insert table Prospect successfully. ' + itemM.agentID);
                                        }
                                        , (error) => {
                                            console.log('==== Insert table Prospect error. ' + itemM.agentID + error);
                                            reject(error);
                                        }
                                    )

                                    });

                                    resolve();
                                }
                                else {
                                    //console.log(' ********************* Prospect insert. ********************* ');
                                    objM.forEach(itemM => { 

                                        if (itemM.customerID == undefined || '' == itemM.customerID)
                                            itemM.customerID = UUID.UUID();
            
                                        prospectMs.push(itemM);
            
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
                                            if (0 != resM.size) {
                                                this.update(itemM, lastSync);
                                            }
                                            else {
                                                let paramSql = [
                                                    itemM.agentID, itemM.customerID, itemM.firstName, itemM.lastName, itemM.preName,
                                                    itemM.preNameOther, itemM.gender, itemM.occupationType, Number(itemM.age), itemM.birthDate,
                                                    itemM.telephone, itemM.mobilephone, itemM.fax, itemM.passport, itemM.lineID,
                                                    itemM.linkFacebook, itemM.geolocation, itemM.address, itemM.subdistrict, itemM.district,
                                                    itemM.province, itemM.postcode, itemM.status, itemM.remark, itemM.createDatetime,
                                                    itemM.lastModify, lastSync, itemM.citizenID, itemM.email, itemM.customerType, 
                                                    itemM.addressno, itemM.buildingname, itemM.moo, itemM.soi, itemM.road, itemM.flagdraftyn,
                                                    itemM.maritalstatus
                                                ];
    
                                                connection.executeSql(sql, paramSql).then(
                                                    (res) => {
                                                        let num: number = SQLiteHandle.recordBeWrite;
                                                        SQLiteHandle.recordBeWrite = Number(num + 1);
                                                        //console.log('==== Insert table Prospect successfully. ' + itemM.agentID);
                                                    }
                                                    , (error) => {
                                                        console.log('==== Insert table Prospect error. ' + itemM.agentID + error);
                                                    }
                                                )
                                            }
                                        });
                                    });


                                    let resM: ResponseModel = new ResponseModel();
                                    resM.status = 0;
                                    resM.size = prospectMs.length; 
                                    resM.data = prospectMs;
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

    public update(objM: ProspectModel, lastSync: string) {
        
       // console.log("----------- ProspectService : update ------------" + JSON.stringify(objM));
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = `UPDATE ` + TB_SQLITE.tb_prospect + 
                        ` SET   firstName=?, lastName=?, preName=?, preNameOther=?, gender=?,
                                occupationType=?, age=?, birthDate=?, telephone=?, mobilephone=?,
                                fax=?, passport=?, lineID=?, linkFacebook=?, geolocation=?,
                                address=?, subdistrict=?, district=?, province=?, postcode=?,
                                remark=?, lastModify=?, lastSync=?,
                                addressno=?, buildingname=?, moo=?, soi=?, road=?, flagdraftyn=?,
                                citizenID=?, email=?, customerType=?, maritalstatus=? 
                          WHERE agentID=? AND customerID=?;`;
                        //console.log(sql);

                        let paramSql = [
                            objM.firstName, objM.lastName, objM.preName, objM.preNameOther, objM.gender,
                            objM.occupationType, objM.age, objM.birthDate, objM.telephone, objM.mobilephone,
                            objM.fax, objM.passport, objM.lineID, objM.linkFacebook, objM.geolocation,
                            objM.address, objM.subdistrict, objM.district, objM.province, objM.postcode,
                            objM.remark, objM.lastModify, lastSync,
                            objM.addressno, objM.buildingname, objM.moo, objM.soi, objM.road, objM.flagdraftyn,
                            objM.citizenID, objM.email, objM.customerType, objM.maritalstatus,
                            objM.agentID, objM.customerID
                        ];

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        //console.log("===== UPDATE SUCCESS Prospect ");

                                        let num: number = SQLiteHandle.recordBeWrite; 
                                        SQLiteHandle.recordBeWrite = Number(num + 1);

                                        let resM: ResponseModel = new ResponseModel();
                                        resM.status = 0;
                                        resolve(resM);
                                    }
                                    , (error) => {
                                        console.log("===== UPDATE ERROR Prospect " + error);
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

    public updateDuplicate(objM: ProspectModel, lastSync: string) {
        
        console.log("----------- updateDuplicate : update ------------" + JSON.stringify(objM));
         
         return new Promise((resolve, reject) => {
             this.createTable().then(
                 (res) => {
                     try {
                         let sql = `UPDATE ` + TB_SQLITE.tb_prospect + 
                         ` SET occupationType=?, mobilephone=?, citizenID=?, lastModify=?
                           WHERE agentID=? AND customerID=?;`;
                         //console.log(sql);
 
                         let paramSql = [
                             objM.citizenID, objM.mobilephone, objM.citizenID, objM.lastModify,
                             objM.agentID, objM.customerID
                         ];
 
                         this.db.create(ConectionDBName.connectionDB).then(
                             (connection: SQLiteObject) => {
                                 connection.executeSql(sql, paramSql).then(
                                     (result) => {
 
                                         let resM: ResponseModel = new ResponseModel();
                                         resM.status = 0;
                                         resolve(resM);
                                     }
                                     , (error) => {
                                         console.log("===== updateDuplicate error : ", error);
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

    public delete(objM: ProspectModel) {
       // console.log("----------- ProspectService : delete ------------ XML " + JSON.stringify(objM));
        
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + TB_SQLITE.tb_prospect;
                        sql += " SET ";
                        sql += "customerType='D', lastModify='" + DateUtil.date2str(new Date()) + "'";
                        sql += " WHERE customerID=?;";

                        let paramSql = [
                            objM.customerID
                        ];

                        //console.log(sql + " : " + JSON.stringify(paramSql)); 

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {

                            /**
                             * 1. Delete prospect.
                             */
                                connection.executeSql(sql, paramSql).then(
                                    (res) => {
                                        //console.log("===== Delete SUCCESS Prospect ");
                                        return Promise.resolve(res);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Delete ERROR Prospect " + error);
                                        reject(error);
                                    }
                                ).then(
                                    (res) => {
                                        resolve();
                                    /**
                                     * 2. Date quotation.
                                     */
                                    paramSql = [
                                        objM.customerID, objM.agentID
                                    ];

                                     let sqlQC: string = "SELECT count(*) as total FROM quotation ";  
                                     sqlQC += " WHERE customerid=? AND agentid=?"; 
                                     
                                     //console.log(sqlQC + " < Count Quotation > " + JSON.stringify(paramSql));
                                     
                                     connection.executeSql(sqlQC, paramSql).then(
                                        (res) => {
                                            //console.log("===== Count quotation = " + res.rows.item(0).total);
                                            if (res.rows.item(0).total > 0) {

                                                sqlQC = "UPDATE quotation SET publishstatus='C', lastmodify=?";
                                                sqlQC += "WHERE customerid=? AND agentid=?";

                                                paramSql = [
                                                    DateUtil.date2str(new Date()), objM.customerID, objM.agentID 
                                                ];

                                                //console.log(sqlQC + " < Update Quotation> " + JSON.stringify(paramSql));
                                                connection.executeSql(sqlQC, paramSql).then(
                                                    (res) => {
                                                        //console.log("===== Update Quotation success. ");
                                                    }
                                                )
                                            }
                                        }
                                        , (error) => {
                                            console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Count quotation Error = " + error);
                                            reject(error);
                                        }
                                    )   


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

    public updateLastSync(objM: ProspectModel) {
        //console.log("----------- ProspectService : updateLastSync ------------");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let sql = "UPDATE " + TB_SQLITE.tb_prospect;
                        sql += " SET ";
                        sql += "lastSync=?";
                        sql += " WHERE agentID=?;";
                        //console.log(sql);

                        let paramSql = [
                            objM.lastSync, objM.agentID
                        ];

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSql).then(
                                    (result) => {
                                        //console.log("===== updateLastSync SUCCESS Prospect ");
                                        resolve(res);
                                    }
                                    , (error) => {
                                        console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> updateLastSync ERROR Prospect " + error);
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
        //console.log("----------- ProspectService : search ------------ XML " + JSON.stringify(reqM));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let prospectModels: ProspectModel[] = reqM.param;
                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let keyvalue: string = reqM.keyvalue;
                    let searchMode: string = reqM.searchmode;
                    let agentid: string = reqM.agentid;
                    let customerType: string = "";

                    let objM: ProspectModel = prospectModels[0];
                    customerType = objM.customerType;

                    let sql: string = "";
                    if (reqM.syncMode) {
                        sql = "SELECT * FROM " + TB_SQLITE.tb_prospect + " WHERE agentID='"+ agentid +"' ";
                    }
                    else { 
                        sql = `
                            SELECT distinct pro.*,
                            (SELECT count(*) FROM quotation WHERE quotation.customerid = pro.customerid AND quotation.agentid = pro.agentid AND quotation.publishstatus='') as quatationAmt,
                            (SELECT count(application.quotationno) FROM application WHERE application.customerid = pro.customerid  AND application.quotationno IN 
                                (SELECT quotation.quotationno FROM quotation WHERE quotation.quotationno = application.quotationno )) as applicationAmt,
                            (SELECT province.name FROM province WHERE province.id=pro.province) as provinceName,	
                            (SELECT district.name FROM district WHERE district.id=pro.district) as districtName,
                            (SELECT subdistrict.name FROM subdistrict WHERE subdistrict.id=pro.subdistrict) as subdistrictName	
                                
                            FROM prospect pro `;

                                if ("NORMAL" == searchMode) {

                                    sql += " WHERE pro.agentid='" + agentid + "' AND pro.flagdraftyn != 'Y' ";

                                    if (customerType != null && "" != customerType) {
                                        sql += " AND pro.customerType = '" + customerType + "'";
                                    }
                                    else {
                                        if (reqM.syncMode == null || reqM.syncMode == false) {
                                            sql += " AND pro.customerType != 'D'";
                                        }
                                    }

                                    sql += " AND pro.customerType != ''";
            
                                    if (/^\d+$/.test(keyvalue)) {
                                        sql += " AND pro.citizenID LIKE '%" + keyvalue + "%'";
                                    }
                                    else {
                                        if (/.*\s+.*/.test(keyvalue)) {
                                             var strs = keyvalue.split(" ");
                                             if (strs.length > 1) {
                                                sql += " AND upper(pro.firstName) LIKE upper('%"+ strs[0] +"%') AND upper(pro.lastName) LIKE upper('%"+ strs[1] +"%')";
                                             }
                                             else {
                                                sql += " AND ( upper(pro.firstName) LIKE upper('%"+ keyvalue +"%') OR upper(pro.lastName) LIKE upper('%"+ keyvalue +"%') )";
                                             }
                                        }
                                        else {
                                            sql += " AND ( upper(pro.firstName) LIKE upper('%"+ keyvalue +"%') OR upper(pro.lastName) LIKE upper('%"+ keyvalue +"%') )";
                                        }
                                    }
            
                                }
                                else if ("ADVANCE" == searchMode) {
            
                                    let sqlJoin: string = " ";
            
                                    let conditionMArray: Array<ConditionM> = [];
            
                                    let firstName: string = objM.firstName;
                                    let lastName: string = objM.lastName;
                                    let citizenID: string = objM.citizenID;
                                    let mobilephone: string = objM.mobilephone;
                                    let gender: string = objM.gender;
            
                                    let subdistrict: string = objM.subdistrict;
                                    let district: string = objM.district;
                                    let province: string = objM.province;
                                    let postcode: string = objM.postcode;
                                    let email: string = objM.email;
                                    let createDatetime: string = objM.createDatetime;
            
                                    let createDatetimeForm: string = objM.createDatetimeFrom;
                                    let createDatetimeTo: string = objM.createDatetimeTo;
                                    
                                    if (firstName != null && firstName != "") {
                                        conditionMArray.push(new ConditionM("firstName" , firstName));
                                    }
                                    if (lastName != null && lastName != "") {
                                        conditionMArray.push(new ConditionM("lastName" , lastName));
                                    }
                                    if (citizenID != null && citizenID != "") {
                                        conditionMArray.push(new ConditionM("citizenID" , citizenID));
                                    }
                                    if (mobilephone != null && mobilephone != "") {
                                        conditionMArray.push(new ConditionM("mobilephone" , mobilephone));
                                    }
                                    if (gender != undefined && gender != "") {
                                        conditionMArray.push(new ConditionM("gender" , gender));
                                    }
                                    if (subdistrict != null && subdistrict != "") {
                                        //conditionMArray.push(new ConditionM("subdistrict" , subdistrict));
                                        sqlJoin += " INNER JOIN subdistrict ON subdistrict.name LIKE '%"+ subdistrict +"%' AND subdistrict.id=pro.subdistrict ";
                                    }
                                    if (district != null && district != "") {
                                        //conditionMArray.push(new ConditionM("district" , district));
                                        sqlJoin += " INNER JOIN district ON district.name LIKE '%"+ district +"%' AND district.id=pro.district ";
                                    }
                                    if (province != null && province != "") {
                                       // conditionMArray.push(new ConditionM("province" , province));
                                        sqlJoin += " INNER JOIN province ON province.name LIKE '%"+ province +"%' AND province.id=pro.province ";
                                    }
                                    if (postcode != null && postcode != "") {
                                        conditionMArray.push(new ConditionM("postcode" , postcode));
                                    }
                                    if (email != null && email != "") {
                                        conditionMArray.push(new ConditionM("email" , email));
                                    }

                                    sql += sqlJoin;
                                    sql += " WHERE pro.agentID = '" + agentid + "' AND pro.flagdraftyn != 'Y' ";

                                    if (customerType != null && "" != customerType) {
                                        sql += " AND pro.customerType = '" + customerType + "'";
                                    }
                                    else {
                                        if (reqM.syncMode == null || reqM.syncMode == false) {
                                            sql += " AND pro.customerType != 'D'";
                                        }
                                    }

                                    sql += " AND pro.customerType != ''";
            
                                    if (conditionMArray != null && conditionMArray.length > 0) {
                                        sql += " AND ";
                                        var i = 0;
                                        conditionMArray.forEach(item => {
                                            if (i < conditionMArray.length - 1) {
                                                if ("firstName" == item.key || "lastName" == item.key) {
                                                    sql += "upper(pro." + item.key + ") LIKE upper('%" + item.value + "%') AND ";
                                                }
                                                else {
                                                    sql += "upper(pro." + item.key + ") LIKE upper('%" + item.value + "%') AND ";
                                                }
                                            }
                                            else {
                                                if ("firstName" == item.key || "lastName" == item.key) {
                                                    sql += "upper(pro." + item.key + ") LIKE upper('%" + item.value + "%') ";
                                                }
                                                else {
                                                    sql += "pro." + item.key + " LIKE '%" + item.value + "%'";
                                                }
                                            }
                                          i++;
                                        });
                                    }
            
                                    if (createDatetimeForm != "" && createDatetimeTo != null) {
                                        sql += " AND  date(pro.createDatetime) BETWEEN date('" + createDatetimeForm + "') AND date('"+ createDatetimeTo +"')";
                                    }
                                }
                                else if ("CHECKPROSPECT" == searchMode) {
                                    sql = "SELECT * FROM prospect pro";
                                    sql += " WHERE agentID ='" + agentid + "' AND upper(firstName)=upper('"+ objM.firstName +"')";
                                    sql += " AND upper(lastName)=upper('"+ objM.lastName +"')";
                                    sql += " AND gender='"+ objM.gender +"' AND birthDate='"+ objM.birthDate +" 00:00:00'";
                                    sql += " AND customertype!='D' AND customertype!=''";
                                }
                                else {
                                    sql += " WHERE pro.agentID='" + agentid + "' AND pro.flagdraftyn != 'Y' AND pro.customerType!='D' ";
                                    sql += " AND pro.customerType != ''";
                                }

                        sql += " ORDER BY pro.lastModify DESC";
                    }

                    //console.log(sql);
                    
                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    
                                    //console.log("===== SELECT SUCCESS ProspectService size " + result.rows.length);

                                    let prospectModels: Array<ProspectModel> = [];

                                    responseM.size = result.rows.length;
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            
                                            if (reqM.syncMode) {

                                                let prospectM: ProspectModel  = result.rows.item(index);

                                                let lastModify: string = result.rows.item(index).lastModify;
                                                //console.log(" >> lastModify = " + new Date(lastModify) + " : " + lastModify.replace(' ', 'T'));
                                                //console.log(" >> lastSync = " + new Date(reqM.lastsync) + " : " + reqM.lastsync.replace(' ', 'T'));

                                                if (reqM.lastsync != undefined && reqM.lastsync != '') {
                                                    if (new Date(lastModify.replace(' ', 'T')) > new Date(reqM.lastsync.replace(' ', 'T'))) {

                                                        //alert(" >> A customerID = " + prospectM.customerID);

                                                        prospectM.lastSync = DateUtil.date2str(new Date());
                                                        prospectModels.push(prospectM);
                                                    }
                                                }
                                                else {
                                                    //alert(" >> B customerID = " + prospectM.customerID);

                                                    prospectM.lastSync = DateUtil.date2str(new Date());
                                                    prospectModels.push(prospectM);
                                                }
                                            }
                                            else {
                                                //Search mode.
                                                let provinceCode: string = result.rows.item(index).province == null || undefined ? "" : result.rows.item(index).province;
                                                let districtCode: string = result.rows.item(index).district == null || undefined ? "" : result.rows.item(index).district;
                                                let subdistrictCode: string = result.rows.item(index).subdistrict == null || undefined ? "" : result.rows.item(index).subdistrict;
 
                                                let prospectM: ProspectModel  = result.rows.item(index);

                                                prospectM.province = result.rows.item(index).provinceName == null || undefined ? "" : result.rows.item(index).provinceName;
                                                prospectM.district= result.rows.item(index).districtName == null || undefined ? "" : result.rows.item(index).districtName;
                                                prospectM.subdistrict = result.rows.item(index).subdistrictName == null || undefined ? "" : result.rows.item(index).subdistrictName;
                                                prospectM.postcode = result.rows.item(index).postcode == null || undefined ? "" : result.rows.item(index).postcode;

                                                prospectM.provinceCode = provinceCode;
                                                prospectM.districtCode = districtCode;
                                                prospectM.subdistrictCode = subdistrictCode;
                                                
                                                prospectM.address = result.rows.item(index).address == null || undefined ? "" : result.rows.item(index).address;
                                                prospectM.remark = result.rows.item(index).remark == null || undefined ? "" : result.rows.item(index).remark;
                                                prospectM.email = result.rows.item(index).email == null || undefined ? "" : result.rows.item(index).email;
                                                prospectM.citizenID = result.rows.item(index).citizenID == null || undefined ? "" : result.rows.item(index).citizenID;

                                                prospectModels.push(prospectM);
                                            }
                                        }

                                        responseM.size = prospectModels.length;
                                        responseM.data = prospectModels;
                                        resolve(responseM);
                                    }
                                    else {
                                        responseM.data = prospectModels;
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

    public searchBy(obj: any) {
        //console.log("----------- ProspectService : searchBy XML = " + JSON.stringify(obj));
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    let reqM: RequestModel = obj;
                    let objMs: Array<ProspectModel> = reqM.param;

                    let responseM: ResponseModel = new ResponseModel();
                    let paramSQL = [];
                    let sql: string = `SELECT * FROM ` + TB_SQLITE.tb_prospect;
    
                    if (objMs != null && objMs.length > 0) {
                        if (objMs[0].customerID != undefined && objMs[0].customerID != "") {
                            sql += " WHERE customerid=?";
                            paramSQL = [objMs[0].customerID];
                        }
                    } 
    
                    //console.log(sql + " : " + JSON.stringify(paramSQL));
    
                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, paramSQL).then(
                                (result) => {
                                    
                                    responseM.status = 0;
                                    if (result.rows.length > 0) {

                                        let prospectMs: Array<ProspectModel> = [];
                                        var len = result.rows.length;
                                        for (var index = 0; index < len; index++) {
                                            
                                            let prospectM: ProspectModel  = result.rows.item(index);

                                            prospectM.citizenID = result.rows.item(index).citizenID == null || undefined ? "" : result.rows.item(index).citizenID;

                                            //console.log("prospectM Select XML = " + JSON.stringify(prospectM));
                                            prospectMs.push(prospectM);
                                        }

                                        responseM.size = prospectMs.length;
                                        responseM.data = prospectMs;
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
                                    console.log("===== rospectService : searchBy error " + JSON.stringify(error));
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

    public querySize(prospectModel: ProspectModel) {
        //console.log("----------- ProspectService : querySize ------------ ");
        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {
                    try {
                        let responseM: ResponseModel = new ResponseModel();
                        let paramSQL = [];
                        let sql: string = "SELECT * FROM " + TB_SQLITE.tb_prospect + ";";

                        if (prospectModel.agentID != "" && prospectModel.customerID != "") {
                            sql = "SELECT * FROM " + TB_SQLITE.tb_prospect + " WHERE agentID=? AND customerID=?;";
                            paramSQL = [prospectModel.agentID, prospectModel.customerID];
                        }
                        //console.log(sql);

                        this.db.create(ConectionDBName.connectionDB).then(
                            (connection: SQLiteObject) => {
                                connection.executeSql(sql, paramSQL).then(
                                    (result) => {
                                        //console.log("===== SELECT SUCCESS ProspectService querySize size " + result.rows.length);
                                        responseM.size = result.rows.length;
                                        responseM.status = 0;
                                        resolve(responseM);
                                    }
                                    , (error) => {
                                        console.log("===== SELECT ERROR ProspectService querySize " + error.message);
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

    public count(objMs: any, agentid: string) {

        //console.log("----------- ProspectService : count ------------ " + JSON.stringify(objMs) + agentid);

        return new Promise((resolve, reject) => {
            this.createTable().then(
                (res) => {

                    let responseM: ResponseModel = new ResponseModel();
                    let sql: string = "SELECT COUNT(*) as total FROM " + TB_SQLITE.tb_prospect;
                    sql += " WHERE upper(firstName)=upper('" + objMs[0].firstName + "') AND upper(lastName)=upper('" + objMs[0].lastName + "')";
                    sql += " AND gender='" + objMs[0].gender + "' AND birthDate='" + objMs[0].birthDate + " 00:00:00'";
                    sql += " AND customerType!='D' AND agentID='" + agentid + "'";

                    if (objMs[0].customerID != '' && objMs[0].customerID != undefined) {
                        sql += " AND customerID != '"+ objMs[0].customerID +"'";
                    }

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    responseM.size = result.rows.item(0).total;
                                    responseM.status = 0;
                                    resolve(responseM);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Select count tb_prospect error " + JSON.stringify(error));
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
                    let sql: string = "DROP TABLE " + TB_SQLITE.tb_prospect;
                    console.log(sql);

                    this.db.create(ConectionDBName.connectionDB).then(
                        (connection: SQLiteObject) => {
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    console.log("===== Drop table tb_prospect seccess. ");
                                    resolve();
                                }
                                , (error) => {
                                    console.log("===== Drop tb_prospect error " + JSON.stringify(error));
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

                            let sql: string = `CREATE TABLE IF NOT EXISTS ` + TB_SQLITE.tb_prospect + 
                            `(
                            agentID TEXT, customerID TEXT,
                            firstName TEXT, lastName TEXT, preName TEXT, preNameOther TEXT, gender TEXT,
                            occupationType TEXT, age INTEGER, birthDate TEXT, telephone TEXT, mobilephone TEXT,
                            fax TEXT, passport TEXT, lineID TEXT, linkFacebook TEXT, geolocation TEXT,
                            address TEXT, subdistrict TEXT, district TEXT, province TEXT, postcode TEXT,
                            status TEXT, remark TEXT, createDatetime TEXT, lastModify TEXT, lastSync TEXT,
                            citizenID TEXT, email TEXT, customerType TEXT, maritalstatus TEXT,
                            addressno TEXT, buildingname TEXT, moo TEXT, soi TEXT, road TEXT, flagdraftyn TEXT, 
                            PRIMARY KEY (agentID, customerID)
                             );`;
 
                            connection.executeSql(sql, []).then(
                                (result) => {
                                    //console.log("Create table " + TB_SQLITE.tb_prospect + " successfully.");
                                    resolve(result);
                                }
                                , (error) => {
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!! ==> Create table " + TB_SQLITE.tb_prospect + " error.");
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

class ConditionM {
    key: string;
    value: string;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

