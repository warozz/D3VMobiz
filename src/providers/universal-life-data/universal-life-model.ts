import { ProspectModel } from './../prospect/prospect-model';
import { QuotationRiderM } from './../quotationrider/quotationrider-model';
import { MCAapplicationsM } from '../service-table/mcaapplications-model';
export class UniversallifeModel {

    quotationno : string;
    customerid : string;
    agentid : string;
    devicerefno : string;

    plancode : string;
    planname : string;
    mode : string;
    occupationtype : string;
    insureage : string;

    lifesum : string;
    lifepremium : string;
    topupsum : string;
    topuppremium : string;
    tppay : string;
    totalpremium : string;

    pname : string;
    fname : string;
    lname : string;
    branch : string;

    publishstatus : string;
    referenceno : string;

    createdatetime : string;
    lastmodify : string;
    lastsync : string;

    birthdate : string;
    status : string;
    pdfpath : string;
    occgroup : string;
    occ : string;
    soldier : string;
    healthcheckflag : string;
    typeapp : string;
    paytype : string;
    endowmenttype : string;
    ppayyear : string;
    pendowmentyear : string;
    haverider : string;

    kbcoverageyear : string;
    pdflang : string;
    alfrescoid : string;
    gender : string;
    disabled: boolean;

    quotationRiderMs: Array<QuotationRiderM>;
    mcaapplicationMs: Array<MCAapplicationsM>;
    prospectM: ProspectModel;

}