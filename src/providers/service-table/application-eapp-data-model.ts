import {ApplicationImageM} from './application-image-model';
import { AttachFileM } from './attachfile-model';
import { MCAapplicationsM } from './mcaapplications-model';
import { PaymentM } from './payment-model';

export class ApplicationEAppDataM {

    public applicationImageMs: Array<ApplicationImageM>;

    public attachFileMs: Array<AttachFileM>; 
    
    public mcaapplicationM: MCAapplicationsM;

    public paymentM: PaymentM;

    public saledetailM : any;

}