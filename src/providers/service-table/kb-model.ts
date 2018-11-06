import {OtherinsuranceM} from './otherinsurance-model';
import {InsurancerejectionsM} from './insurancerejections-model';
import {AddressM} from './address-model';
import { OccupationsM } from './occupations-model';

export class KbM {

    /** 
    * Example for INSERT.
    * Attribute variable.
    * กรณีทำการบันทุก applicationid ไม่ต้องส่งไปในทุกๆ Class เพราะ applicationid หาให้อัตโนมัต
    * Date format "2200-12-31 00:00:00"
    */

    agentemail:string;

    agentid:string;

    applicationid:string;

    birthdate:string; //Date format "2200-12-31 00:00:00"

    businessdesc:string;

    contactaddresscd:string; // สถานที่ติดต่อได้สะดวก C=ที่อยู่ปัจจุบัน, W=สถานที่ทำงาน, P=ทะเบียนบ้าน

    custemail:string;

    deletedflag:string;

    exlastname:string;

    exname:string;

    extitle:string;

    extitledesc:string;

    gender:string;

    heigh: string;

    identifyexpiredate:string;

    identifyid:string;

    identifyissuecountry:string;

    identifyissuedistrict:string;

    identifyissueprovince:string;

    identifynoexpire:string;

    identifytype:string;

    insurerejectionflag:string; // Y OR N ประวัติการรับประกัน >> ท่านเคยถูกปฏิเสธ ห้ามว่าง คำถามที่2**

    ispreunderwritesuccess:string;

    kbid:string; //กรณี Insert ไม่ต้องส่งไป ให้ส่งไปแค่กรณี update

    lastname:string;

    marital:string;

    martial:string;

    mobileno:string;

    name:string;

    nationality:string;

    occupationcd:string;

    otherinsuranceyn:string; // Y OR N ประวัติการรับประกัน >> ท่านเคยทำประกันชีวิต ห้ามว่าง คำถามที่1*

    parentlastname:string;

    parentname:string;

    parentrelation:string;

    parenttitle:string;

    parenttitledesc:string;

    place:string;

    position:string;

    race:string;

    regdate:string;

    regid:string;

    rejectreason:string;

    religion:string;

    spouselastname:string;

    spousename:string;

    spouseoccupationcd:string;

    spouseoccupationdesc:string;

    spousetitle:string;

    spousetitledesc:string;

    submitdate:string;

    telno:string;

    title:string;

    titledesc:string;

    updatedate:string;

    updateid:string;

    weigh: string;

    witness1fname:string;

    witness1lname:string;

    witness1title:string;

    witness1titledesc:string;

    witness2fname:string;

    witness2lname:string;

    witness2title:string;

    witness2titledesc:string;

    workplace:string;

    addressMs: Array<AddressM>;

    insurancerejectionsMs : Array<InsurancerejectionsM>;

    occupationsMs : Array<OccupationsM>;

    otherinsuranceMs : Array<OtherinsuranceM>;


}