import { ProspectModel } from './../prospect/prospect-model';
import { QuotationRiderM } from './../quotationrider/quotationrider-model';
import { QuotationGuardianM } from './../quotationguardian/quotationguardian-model';
import { MCAapplicationsM } from '../service-table/mcaapplications-model';
export class QuotationModel {

    quotationno: string;
	customerid: string;
	agentid: string;
	devicerefno: string;
	plancode: string;
	citizenid: string;
	applicationid: string;
	
	planname: string;
	mode: string;
	occupationtype: string;
	insureage: string;
	lifesum: string;
	
	lifepremium: string;
	pname: string;
	fname: string;
	lname: string;
	branch: string;
	
	tax: string;
	publishstatus: string;
	packageno: string;
	referenceno: string;
	createdatetime: string;
	
	lastmodify: string;
	lastsync: string;
	birthdate: string;
	status: string;
	pdfpath: string; 

	occgroup: string;
	occ: string;
	healthcheckflag: string; 
	totalpremium: string;
	typeapp: string;

	ppayyear: string;
	pendowmentyear: string;
	paytype: string;
	endowmenttype: string;   
	havetp: string;  

	kbcoverageyear: string; 
	soldier: string; 
	pdflang: string;
	alfrescoid: string;
	gender: string;
	public disabled: boolean;
	public caseExpire: string;

	savingsum: string;
	savingpremium: string;
	topuppremium: string;
	topuptype: string;

	quotationGuardianMs: Array<QuotationGuardianM>;
	quotationRiderMs: Array<QuotationRiderM>;
	mcaapplicationMs: Array<MCAapplicationsM>;
	prospectM: ProspectModel;

}