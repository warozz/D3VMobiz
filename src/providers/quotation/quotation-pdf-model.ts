export class QuotationPdfModel {

	preName: string;  //ชื่อผู้เอาประกัน
	firstName: string; 
	lastName: string; 

    total:string;
    
    amount:string;

    editData: string;
   
    flag:string;
    quotationStatus: string;
    quotationno: string;
    customerid: string;
    planCode: string;
    planName: string;
    lang: string;
    
	branchName: string;
    
    special: string;
    refNo: string;
    age: string;
    sex: string;
    rpp: string;
    rsp: string;

    rppInsurancePremium:string;
    rspInsurancePremium:string;
    rppAmount:string;
    rspAmount:string;
    
    moneyRPP: string;
    moneyRSP: string;
    mode: string;
    em: string;
    agentName: string;
    consName: string;
    sysdate: string;
    riderList: any;

    tel: string;
    idCard: string;
    citizenID: string;
    topup: string;
    topuptype: string;

    /**
	 * type topup ทุกปี ทุกเดือน	1,Y,N
	 */
	tppay: string; 

}