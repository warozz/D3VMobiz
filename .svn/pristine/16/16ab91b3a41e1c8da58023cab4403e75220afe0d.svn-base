import { Storage } from '@ionic/storage';
import { RiderConfig } from '../rider/rider-config';

export class QuotationPdfUtil{

    constructor(
        private storage : Storage,
        private conf : RiderConfig,
    ) {
  
    }

    public createPdfQuotationFilename2(plancode : string, userID : string) : string{
        
        // console.log('userID : '+userID);
        //25610718-105654-EQ-00721990.pdf
        let currentDate = new Date();
        let currentDay = currentDate.getDate() < 10 ? '0'+currentDate.getDate().toString() : currentDate.getDate().toString()
        let currentMonth = currentDate.getMonth()+1 < 10 ? '0'+(currentDate.getMonth()+1).toString() : (currentDate.getMonth()+1).toString()
        let currentYear = (currentDate.getFullYear()+543).toString();
        let date = currentYear+currentMonth+currentDay;
        let hours = currentDate.getHours() < 10 ? '0'+currentDate.getHours().toString() : currentDate.getHours().toString();
        let minutes = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes().toString() : currentDate.getMinutes().toString();
        let seconds = currentDate.getSeconds() < 10 ? '0'+currentDate.getSeconds().toString() : currentDate.getSeconds().toString();
        let time = hours+minutes+seconds;
    
    
        let filename : string = date+'-'+time;
    
        if(plancode != undefined || plancode.trim() != ''){
            filename += '-'+plancode;
        }
        if(userID != undefined || userID.trim() != ''){
            filename += '-'+userID;
        }
        filename += '.pdf';
        // console.log('filename : '+filename);
        return filename;
    }
    public async createPdfQuotationFilename(plancode : string){
        let userID : string = "";
        await this.storage.get('loginProfile').then(profile => {
            if(profile.roleType == 'employee'){
                userID = profile.pid.replace("-", "");
                if(userID == ''){
                  userID = profile.agentid.replace("-", "");
                }
            }
            else{
            userID = profile.agentid;
            }
            // console.log('profile : '+userID);
        });
        // console.log('userID : '+userID);
        //25610718-105654-EQ-00721990.pdf
        let filename = this.createPdfQuotationFilename2(plancode, userID);
        return filename;
    }

    

    public setFormatRider(rider : object) : Array<any>{
        let listRiderObj = []
        for (const key in rider) {
            if (this.checkRider(key) && rider.hasOwnProperty(key) && key != 'occupation') {
            const element = rider[key];
            let riderObj: Object;
            if(key == 'KB2'){
                let ageSetter = (element.age === null?NaN:element.age.toString());
                riderObj = { 'raiderCode': key, 'raiderDetail': element.sex+ageSetter, 'raiderPremium': element.premium.toString() };
            } else {
                riderObj = { 'raiderCode': key, 'raiderDetail': element.sum.toString(), 'raiderPremium': element.premium.toString() };
            }
            listRiderObj.push(riderObj);
            }
        }
        return listRiderObj;
    }
    private checkRider(riderCode : string) : boolean {
        let allRider = ['AC01','TAC01','KG1','TKG1','AC02','TAC02','KG2','TKG2','AC03','SR2',
        'JP','RP','TRP','RPG','D01','D02','D03','H','J0','TH','G','VP','V','VP5','KB2'];
        for(let i = 0; i < allRider.length; i++){
            if(this.conf.rider(allRider[i]) == riderCode){
            return true;
            }
        }
        return false;
    }
}
