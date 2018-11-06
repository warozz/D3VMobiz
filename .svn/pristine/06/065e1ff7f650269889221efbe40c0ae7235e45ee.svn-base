import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Broadcaster } from './../../../providers/utility/broadcaster';
import { ProspectModel } from '../../../providers/prospect/prospect-model';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { CurrencyFormatProvider } from '../../../providers/currency-format/currency-format';
import { TLPlanModel } from '../../../providers/tlplan/tlplan-model';
import { HealthM } from '../../../providers/health/health-model';
import { RequestModel } from '../../../providers/model/request-model';
import { ApiProvider } from '../../../providers/api/api';
import { FunctionName } from '../../../providers/constants/function-name';
import { ServiceName } from '../../../providers/constants/service-name';
import { LoadingDirective } from '../../../directives/extends/loading/loading';
import { Subscription } from 'rxjs';
import { ConfigAPI } from '../../../providers/constants/config-api';
import { RiderConfig } from '../../../providers/rider/rider-config';
import { Observable } from 'rxjs/Observable';
import { QuotationData } from '../../../providers/quotation/quotation-data';

/**
 * Generated class for the QuatationHealthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quatation-health',
  templateUrl: 'quatation-health.html',
})
export class QuatationHealthPage implements OnDestroy {
  
   /**
   * ทุนประกัน
   */
  private sum             : number = 0;
  /**
   * สิทธิ์ตัวแทน
   * Normal
   * Q UP,
   * Top UP,
   * Top UP plus
   */
  private permission      : string;
  /**
   * ข้อมูลผู้มุ่งหวัง
   */
  private data            : ProspectModel = new ProspectModel();
  /**
   * แบบประกันที่เลือก
   */
  private choosePlan      : string = '';
  /**
   * แบบประกันที่เลือก
   */ 
  private rider = {};
  /**
   * Topup Plus test
   */
	private topupplus           : number | string = -1;
	/**
	 * ----------------
	 */
  // Sum
  private normalSum           : Array<any> = [];
  private topupSum            : Array<any> = [];
  private topupplusSumPhase1  : Array<any> = [];
  private topupplusSumDefault : Array<any> = [];
  // Age 
  private topupplusAgePhase1  : Array<any> = [];
  private defaultAge          : Array<any> = [];
  // DropDown | Number(this.chooseAge),Number(this.chooseSum)
  private sumDD               : Array<number> = [];
  private ageDD               : Array<number> = [];

  // constant
  private NORMAL              : string = 'Normal';
  private TOPUP                 : string = 'Top UP';
  private TOPUPPLUS           : string = 'Top UP plus';

  // selectedDropDown
  private chooseAge           : string = "0";
  private chooseSum           : string = "0";
  // specialPlanCode multiplyCheck
  private spcPCMultiplyCheck  : Array<any> = [];
  // multilifeReal
  private multiLife_real      : number = 0;
  // true ตรวจสุขภาพ : false ไม่ตรวจสุขภาพ
  private chkMed              : boolean = true; 
  // true แบบประกันประเภทออมทรัพย์ : false แบบประกันประเภทไม่ออมทรัพย์   
  private chkAs               : boolean = true;	   
  // tap health
  private healthTab           : number;
  // changeVal
  // private oldSum              : number = 0;
  // แบบประกันที่ถูกเลือก
  private planSelected        : TLPlanModel[];
	// รายละเอียดสุขภาพ
	private healthResDetail;

	// แบบประกันที่เลือก
	private planName: string;

	private subscription: Array<Subscription> = [];
	private changeDetail: boolean = false;

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    private broadcaster: Broadcaster,
    private storage: Storage,
		private http: Http,
		private quatationData: QuotationData,
    private currencyFormat: CurrencyFormatProvider,
		private apiProvider: ApiProvider,
		private loadingCtrl: LoadingDirective,
		private conf : RiderConfig
  ) {
		this.parallelRequests();
    // เฝ้าติดตามค่าทุนประกัน
    this.subscription.push(this.broadcaster.on('quatationSum').subscribe(res => {
			this.sum = res;
			// this.oldSum = res;
			this.ready();
    }));

    // เฝ้าติดตามค่าข้อมูลผู้มุ่งหวัง
    this.subscription.push(this.broadcaster.on('prospect').subscribe(res => {
			this.data = res;
      // if(this.healthTab === 7) {  //หน้าตรวจสุขภาพ
      //   this.calHealth();
			// }
			this.ready();
    }));
    // tlPlan
    this.subscription.push(this.broadcaster.on('planSelected').subscribe(res => {
			this.planSelected = res;
			this.planName = res[0].planName;
    }));

    this.subscription.push(this.broadcaster.on('quatationStep').subscribe(res => {
      this.healthTab = res;
			if(this.healthTab === 7) {  //หน้าตรวจสุขภาพ
				this.ready();
      } 
    }));

    // เฝ้าติดตามค่าข้อมูลแบบประกันที่เลือก
    this.subscription.push(this.broadcaster.on('quatationPlan').subscribe(res => {
			this.choosePlan = res;
			// this.ready();
    }));

    // [input] เฝ้าติดตามข้อมูลสัญญาเพิ่มเติม
    this.subscription.push(this.broadcaster.on('rider').subscribe(res => {
			this.rider = res;
    }));
    
	}
	
	public ngOnDestroy() {
    this.subscription.forEach(res => {
      res.unsubscribe();
    });
	} 
	
	parallelRequests() {
    const parallel$ = Observable.forkJoin(
        this.http.get('assets/json/health/quatation-health.json'),
				this.http.get('assets/json/health/quatation-health-multiplyCheck.json'),
				this.storage.get('loginProfile')
    );

    parallel$.subscribe(
        values => {

					this.getQuatationHealthJson(values[0].json());
					this.getMultiCheck(values[1].json());
					this.getPermission(values[2]);

					this.ready();
					
        }
    );
	}

	ready() {
		if(this.sum && this.choosePlan.length > 0 && this.rider && this.data) {
			this.changeDetail = false;
			this.calHealth();
			this.callDetailH();
		} 
	}
	
	getQuatationHealthJson(value) {
		//Sum
		this.normalSum = value[0].sum;
		this.topupSum = value[1].sum;
		this.topupplusSumPhase1 = value[2].sum[0].phase1;
		this.topupplusSumDefault = value[2].sum[1].default;
		//Age
		this.topupplusAgePhase1 = value[2].age[0].phase1;
		this.defaultAge = value[2].age[1].default;
	}

	getPermission(res) {
		this.permission = res.perrmissionAgent;

      //create Sum dropdown 
      if(this.TOPUPPLUS == this.permission) { //Top up Plus Agents
        if(this.topupplus.toString().indexOf('1') >= 0) { //top up plus phase 1
          this.sumDD = this.topupplusSumPhase1;
        } else { //default
          this.sumDD = this.topupplusSumDefault;
        }
      } else if(this.TOPUP == this.permission) { // Top up Agents
        this.sumDD = this.topupSum;
      } else { //Normal Agents & Q up Agents
        this.sumDD = this.normalSum;
      }

      //create Age dropdown 
      if(this.TOPUPPLUS == this.permission && this.topupplus.toString().indexOf('1') >= 0){ //top up plus phase 1
        this.ageDD = this.topupplusAgePhase1;
      }else{
        this.ageDD = this.defaultAge;
      }
	}

	getMultiCheck(value) {
		this.spcPCMultiplyCheck = value.planCodeSpecialMultiplyCheck;
	}
	
   // replace lastest val
	 private changeDetailAge(chooseAgeLastest : string): void {
		this.chooseAge = chooseAgeLastest;
		this.callDetailH();
		this.changeDetail = true;
	}

	// replace lastest val
  private changeDetailSum(chooseSumLastest : string): void {
		this.chooseSum = chooseSumLastest;
		this.callDetailH();
		this.changeDetail = true;
	}
	
	private callDetailH() : void {
			if(this.chooseAge == undefined  && this.chooseSum == undefined) {
				return;
			}
			if(this.TOPUPPLUS == this.permission) { //Top up Plus Agents
				this.detailTopUpPlus();
			} else if(this.TOPUP == this.permission) { // Top up Agents
				this.detailTopUp();
			} else { //Normal Agents & Q up Agents
				this.detailNormalQ();
			}
	}

  private detailNormalQ()   : void {
    let strInt : Array<string> = [];
    if(this.nonMed())
		{
			strInt = ['00001'];
		}
		else if (Number(this.chooseAge) == 0)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1 || Number(this.chooseSum) == 2)
			{
				strInt = ['00001'] ;
			}
			else if (Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 8)
			{
				strInt = ['00014'];
			}
		}
		else if (Number(this.chooseAge) == 1)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3)
			{
				strInt = ['00004'];
			}
			else if (Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 6)
			{
				strInt = ['00003', '00004', '00008'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00003', '00004', '00015', '00008'];
			}
			else if (Number(this.chooseSum) == 8)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 2)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7)
			{
				strInt = ['00003', '00004', '00015', '00008'];
			}
			else if (Number(this.chooseSum) == 8)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 3)
		{
			if (Number(this.chooseSum) == 0)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 1)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7)
			{
				strInt = ['00003', '00004', '00015', '00008'];
			}
			else if (Number(this.chooseSum) == 8)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		this.selectHealthExam(strInt);
  }

  private detailTopUp()     : void {
    let strInt : Array<string> = [];
    if(this.TOPUPPLUS == this.permission && this.topupplus.toString().indexOf('1') >= 0){ //top up plus phase 1
			this.detailTopUpPlus();
			return;
    }
		if(this.nonMed() || !this.chkAomsup())
		{
			strInt = ['00001'];
		}
		else if (Number(this.chooseAge) == 0)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3)
			{
				strInt = ['00001', '00002'];
			}
			else if (Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00014'];
			}
		}
		else if (Number(this.chooseAge) == 1)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3)
			{
				strInt = ['00004'];
			}
			else if (Number(this.chooseSum) == 4)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 5)
			{
				strInt = ['00003', '00004', '00008'];
			}
			else if (Number(this.chooseSum) == 6)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 2)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2)
			{
				strInt = ['00004'];
			}
			else if (Number(this.chooseSum) == 3)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 3)
		{
			if (Number(this.chooseSum) == 0)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 1)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 2 || Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		this.selectHealthExam(strInt);
  }

  private detailTopUpPlus() : void {
    let strInt : Array<string> = [];
    if(this.nonMed() || !this.chkAomsup())
		{
			strInt = ['00001'];
		}
		else if (Number(this.chooseAge) == 0)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1 || Number(this.chooseSum) == 2)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5)
			{
				strInt = ['00001','00002'];
			}
			else if (Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7 || Number(this.chooseSum) == 8)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 9)
			{
				strInt = ['00014'];
			}
		}
		else if (Number(this.chooseAge) == 1)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1 || Number(this.chooseSum) == 2)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5)
			{
				strInt = ['00004'];
			}
			else if (Number(this.chooseSum) == 6)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 7)
			{
				strInt = ['00003', '00004', '00008'];
			}
			else if (Number(this.chooseSum) == 8)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 9)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 2)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1 || Number(this.chooseSum) == 2)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 3)
			{
				strInt = ['00004'];
			}
			else if (Number(this.chooseSum) == 4)
			{
				strInt = ['00003', '00004'];
			}
			else if (Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7 || Number(this.chooseSum) == 8)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 9)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 3)
		{
			if (Number(this.chooseSum) == 0 || Number(this.chooseSum) == 1)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 2)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7 || Number(this.chooseSum) == 8)
			{
				strInt = ['00003', '00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 9)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		else if (Number(this.chooseAge) == 4)
		{
			if (Number(this.chooseSum) == 0)
			{
				strInt = ['00001'];
			}
			else if (Number(this.chooseSum) == 1 || Number(this.chooseSum) == 2)
			{
				strInt = ['00003'];
			}
			else if (Number(this.chooseSum) == 3 || Number(this.chooseSum) == 4 || Number(this.chooseSum) == 5 || Number(this.chooseSum) == 6 || Number(this.chooseSum) == 7 || Number(this.chooseSum) == 8)
			{
				strInt = ['00003','00004', '00008', '00015'];
			}
			else if (Number(this.chooseSum) == 9)
			{
				strInt = ['00014', '00004', '00006', '00010', '00007'];
			}
		}
		this.selectHealthExam(strInt);
	}
	
	// call Health service
  private selectHealthExam(strInt) : void {
		
    let objMs: Array<HealthM> = [];
    for(let i = 0; i < strInt.length; i++) {
			let objM: HealthM = new HealthM();
			objM.healthid = strInt[i];
      objMs.push(objM);
		}
		// console.log(objMs);
    let reqM: RequestModel = new RequestModel();
    reqM.functionName = FunctionName.HEALTH;
    reqM.serviceName = ServiceName.SELECT;
		reqM.param = objMs;
		// this.loadingCtrl.present();
    this.apiProvider.callData(reqM).then(
      (res) => {
				let objR = res;
				if(objR['size'] > 0) {
					this.healthResDetail = objR['data'];
					if(!this.changeDetail) {
						const healthCheck = this.healthResDetail.find(item => item.healthid === '00001');
						this.quatationData.setHealthCheck(!Boolean(healthCheck));
						console.log("healthCheck =>," ,!Boolean(healthCheck));
					}
				} else {
					this.healthResDetail = [{
						healthid : 0,
						healthname : '404',
						detailhealth : 'ไม่พบข้อมูล'
					}];
				}
				// this.loadingCtrl.dismiss();
        // console.log(JSON.stringify(res));
      },
      (err) => {
				// this.loadingCtrl.dismiss();
        console.log(err);
      }
		);
		// this.loadingCtrl.dismiss();
  }

  private calHealth(): void {
		// debugger;
    let multiLife : number = 1;
		// if(!this.rider[this.conf.rider('D03')].sum) this.rider[this.conf.rider('D03')].sum = 0;
		let d03: number = 0;
		let jp: number = 0;
		if(this.rider[this.conf.rider('D03')] && this.rider[this.conf.rider('D03')].sum) d03 = this.rider[this.conf.rider('D03')].sum;
		if(this.rider[this.conf.rider('JP')] && this.rider[this.conf.rider('JP')].sum) jp = this.rider[this.conf.rider('JP')].sum;
    for(let i = 0 ; i < this.spcPCMultiplyCheck.length ; i++) {
      if(this.choosePlan == this.spcPCMultiplyCheck[i].planCode) {
        multiLife = this.spcPCMultiplyCheck[i].multiplyCheck;
      }
    }
    this.multiLife_real = multiLife;
    // if(this.oldSum == this.sum) {
      if(d03 != 0)
      { 
        this.sum = this.sum + Number(d03); 
      }
      else
      {
        this.sum = (this.sum * multiLife) + d03;
      }
      if(jp != 0)
      { 
        this.sum = this.sum + jp; 
      }
		// }
		
    if(this.TOPUPPLUS == this.permission) { //Top up Plus Agents
      if(this.topupplus.toString().indexOf('1') >= 0) { //top up plus phase 1
        //selectedValueAuto
        for(let i = 0; i < this.topupplusSumPhase1.length ; i++) {
					if(this.sum >= Number(this.topupplusSumPhase1[i].minSum) && this.sum <= Number(this.topupplusSumPhase1[i].maxSum)) {
						this.chooseSum = String(this.topupplusSumPhase1[i].value);
					}
					if(this.sum >= this.topupplusSumPhase1[this.topupplusSumPhase1.length - 1].maxSum) {
						this.chooseSum = String(this.topupplusSumPhase1.length - 1);
					}
				}
      } else { //default
				//selectedValueAuto
				for(let i = 0; i < this.topupplusSumDefault.length ; i++) {
					if(this.sum >= Number(this.topupplusSumDefault[i].minSum) && this.sum <= Number(this.topupplusSumDefault[i].maxSum)) {
						this.chooseSum = String(this.topupplusSumDefault[i].value);
					}
					if(this.sum >= this.topupplusSumDefault[this.topupplusSumDefault.length - 1].maxSum) {
						this.chooseSum = String(this.topupplusSumDefault.length - 1);
					}
				}
      }
    } else if(this.TOPUP == this.permission) { // Top up Agents
			//selectedValueAuto
      for(let i = 0; i < this.topupSum.length ; i++) {
				if(this.sum >= Number(this.topupSum[i].minSum) && this.sum <= Number(this.topupSum[i].maxSum)) {
					this.chooseSum = String(this.topupSum[i].value);
				}
				if(this.sum >= this.topupSum[this.topupSum.length - 1].maxSum) {
					this.chooseSum = String(this.topupSum.length - 1);
				}
			}
    } else { //Normal Agents & Q up Agents
      //selectedValueAuto
			for(let i = 0; i < this.normalSum.length ; i++) {
				if(this.sum >= Number(this.normalSum[i].minSum) && this.sum <= Number(this.normalSum[i].maxSum)) {
					this.chooseSum = String(this.normalSum[i].value);
				}
				if(this.sum >= this.normalSum[this.normalSum.length - 1].maxSum) {
					this.chooseSum = String(this.normalSum.length - 1);
				}
			}
    }  

    if(this.TOPUPPLUS == this.permission && this.topupplus.toString().indexOf('1') >= 0){ //top up plus phase 1
      //selectedValueAuto
			for(let i = 0; i < this.topupplusAgePhase1.length ; i++) {
				if(Number(this.data.age) >= Number(this.topupplusAgePhase1[i].minAge) && Number(this.data.age) <= Number(this.topupplusAgePhase1[i].maxAge)) {
					this.chooseAge = String(this.topupplusAgePhase1[i].value);
				}
			}
    } else {
      //selectedValueAuto
			for(let i = 0; i < this.defaultAge.length ; i++) {
				if(Number(this.data.age) >= Number(this.defaultAge[i].minAge) && Number(this.data.age) <= Number(this.defaultAge[i].maxAge)) {
					this.chooseAge = String(this.defaultAge[i].value);
				}
			}
    }
  }

	private chkAomsup() : boolean
	{
    let arrNonAomsup : Array<string> = 
    [
      "WK","WL","WM","WN","EZ","AC","TP1","ZQ","WP","WQ","WR","NE","TS1",
      "TU1","AE","TW1","TN","TE01","TE02","TE03","TR05","TR06","TR07",
      "TR08","TR09","TR10","TR11","TR12","TR13","TR14","TR15","TR16","TR17",
      "TR18","TR19","TR20","TT05","TT07","TT10","TT15","TE17","TE13","TE12","WN2"
    ]; // fix plan code

		for(let i=0; i<arrNonAomsup.length; i++) 
		{
			if ( arrNonAomsup[i] == this.choosePlan )
			{	
				this.chkAs = false;
				this.chkMed = true;
			}
		}

		if(this.chkAs && ( Number(this.calPayYear()) ) <= 20 && Number(this.data.age) > 60)
		{
			if(Number(this.rider[this.conf.rider('RP')] || 0) == 0 && Number(this.rider['H'] || 0) == 0 && Number(this.rider['VP'] || 0) == 0 && Number(this.rider['VP5'] || 0) == 0 && ((this.sum * this.multiLife_real) + Number(this.rider['JP'] || 0)) <= 300000)
			{
				this.chkMed = false;
			}
		}
		return this.chkMed;
	}
	
	private nonMed() : boolean
	{
    let arrnonmed = 
      [
        "DZ","ZC","ZD","ZH","ZJ","ZK","ZM","ZN","ZP","ZQ","ZR","ZR2"
        ,"ZR3","YB","YC","YD","YE","YF","TR","NC","ND","NE","GYB","BZN"
        ,"MG","ZS","ZT","BNK","NL","NM","NQ","GNN","GNS","GNT","GNU","GNU2"
        ,"GNY","GI01","GI03","GI04","GI05","GI06","GI07","GI08","GI09","TE01"
        ,"TE02","TE03","GT01","CE1","CE2","GZT","GZS","TR1","TW","AG01","AH01"
        ,"AI01","AJ","TW1","TR2","AM01","GI02","GI06","EN02","EN03","EN04","EN05"
        ,"EN06","EN07","EN09","TP","TP1","UZA","EN13","EN15","EN16","AQ60","AP55"
				,"AR65","EN28","EN29","EN30","TE08","TE17","TE13","TE12","YH","AS85","AS90","AS99","AT85","AT90","AT99"
				,"EN39","EN40"
      ]; // fix plan code
		for(var i=0; i < arrnonmed.length; i++){
			if(this.choosePlan == arrnonmed[i]){				
				return true;
			}
		}
		return false;
  }
  
  private calPayYear() : string {
		let payYear = (this.planSelected[0].payType === "0" ? this.planSelected[0].pPayYear : String(Number(this.planSelected[0].pPayYear) - Number(this.data.age)));
    return payYear;
  }
}
