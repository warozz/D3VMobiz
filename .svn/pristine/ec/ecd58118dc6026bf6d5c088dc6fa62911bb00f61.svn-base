import { Broadcaster } from './../../../providers/utility/broadcaster';
import { Subscriber, Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavParams } from 'ionic-angular';
import { ProspectModel } from './../../../providers/prospect/prospect-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UnitlinkBenefit } from '../../../providers/ulink-benefit/unitlink-benefit';

/**
 * Generated class for the BtsummaryTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'btsummary-table',
  templateUrl: 'btsummary-table.html'
})
export class BtsummaryTableComponent {
 

  text: string;
  private showColumn: boolean = false;

  private group_ckbox :FormGroup; 

  private allChecked: boolean = true;

  private prospect : ProspectModel;

  private subscription: Array<Subscription> = [];

  @Input() planType:string;
  @Input() planCode:string;

  private _data: any
  @Input() set data(_data) {
    this._data = _data;
    this.getDataTable(this.planType, this.planCode,this._data);
  }
  get data() {
  return this._data;
  }



  private tableUA01: any[] = [
    {
    id:0,
    title: 'อายุ',
    colspan: '',
    rowspan: 3
    },
    {
    id:1,
    title: 'ปี กร.',
    colspan: '',
    rowspan: 3
    },
    {
    id:2,
    title:  'จำนวนเงินที่เอาประกันภัย',
    colspan: '',
    rowspan: 3
    },
    {
    id:3,
    title: 'เบี้ยประกันภัย',
    rowspan: '',
    colspan: 4
    }
    ,
    {
    id:4,
    title: 'ค่าใช้จ่าย',
    rowspan: '',
    colspan: 4
    }
    ,
    {
    id:5,
    title: 'ค่าใช้จ่ายโบนัสเบี้ยประกันภัยหลักเพื่อความคุ้มครอง',
    colspan: '',
    rowspan: 3
    }
    ,
    {
    id:6,
    title: 'ความคาดหวังผลตอบแทน',
    colspan: '',
    rowspan: 3
    }
    ,
    {
    id:7,
    title: 'จำนวนเงินที่ถอนออกจากบัญชีกรมธรรม์',
    rowspan: '',
    colspan: 2
    }
    ,
    {
    id:8,
    title: 'มูลค่ารับซื้อคืนหน่วยลงทุน',
    rowspan: '',
    colspan: 3
    }
    ,
    {
    id:9,
    title: 'ผลประโยชน์กรณีเสียชีวิต ณ สิ้นปีกรมธรรม์',
    colspan: '',
    rowspan: 3
    }
    ,
    {
    id:10,
    title: 'ค่าใช้จ่ายที่นำไปหักลดหย่อนภาษี',
    rowspan: '',
    colspan: 3
    }
  ];

  private tableUA01_2: any[] = [
    {
    id:0,
    title: 'เบี้ยประกันภัยหลักชำระครั้งเดียว'
    },
    {
    id:1,
    title: 'เบี้ยประกันภัยหลักเพิ่มพิเศษ'
    },
    {
    id:2,
    title:  'รวม'
    },
    {
    id:3,
    title: 'รวมสะสม'
    },
    {
    id:4,
    title: 'ค่าดำเนินการประกันภัย'
    }
    ,
    {
    id:5,
    title: 'ค่าธรรมเนียมการบริหารกรมธรรม์'
    }
    ,
    {
    id:6,
    title: 'ค่าการประกันภัย'
    }
    ,
    {
    id:7,
    title: 'รวม'
    }
    ,
    {
    id:8,
    title: 'จำนวนเงินที่ถอน'
    }
    ,
    {
    id:9,
    title: 'จำนวนเงินที่ถอนสะสม'
    }
    ,
    {
    id:10,
    title: 'เบี้ยประกันชำระครั้งเดียว'
    },
    {
    id:11,
    title: 'เบี้ยเพิ่มพิเศษ'
    },
    {
    id:12,
    title: 'รวม'
    },
    {
    id:13,
    title: 'นำไปหักลดหย่อนภาษีได้'
    },
    {
    id:14,
    title: 'ฐานภาษี'
    },
    {
    id:15,
    title: 'เงินคืนภาษีที่คาดว่าจะได้รับ'
    }
  ];



  private tableUA02: any[] = [
    {
    id:0,
    title: 'อายุ',
    colspan: '',
    rowspan: 3
    },
    {
    id:1,
    title: 'ปี กร.',
    colspan: '',
    rowspan: 3
    },
    {
    id:2,
    title:  'ทุนประกัน',
    colspan: 3,
    rowspan: ''
    },
    {
      id:3,
      title: 'เบี้ยประกันภัย',
      rowspan: '',
      colspan: 6
      }
      ,
    {
    id:4,
    title: 'ค่าใช้จ่าย',
    rowspan: '',
    colspan: 4
    }
    ,
    {
    id:5,
    title: 'โบนัสเบี้ยประกันภัยหลักเพื่อความคุ้มครอง',
    rowspan: 3,
    colspan: ''
    }
    ,
    {
    id:6,
    title: 'ความคาดหวังผลตอบแทน',
    colspan: '',
    rowspan: 3
    }
    ,
    {
    id:7,
    title: 'จำนวนเงินที่ถอนออกจากบัญชีกรมธรรม์',
    colspan: 4,
    rowspan: ''
    }
    ,
    {
    id:8,
    title: 'มูลค่ารับซื้อคืนหน่วยลงทุน',
    rowspan: '',
    colspan: 4
    }
    ,
    {
    id:9,
    title: 'ผลประโยชน์กรณีเสียชีวิต ณ สิ้นปีกรมธรรม์',
    rowspan: 3,
    colspan: ''
    }
    ,
    {
    id:10,
    title: 'ค่าใช้จ่ายที่นำไปหักลดหย่อนภาษี',
    colspan: 3,
    rowspan: ''
    }
  ];

  private tableUA02_2: any[] = [
    {
    id:0,
    title: 'เบี้ยประกันภัยหลักเพื่อความคุ้มครอง'
    },
    {
    id:1,
    title: 'เบี้ยประกันภัยหลักเพื่อการออม'
    },
    {
    id:2,
    title:  'รวม'
    },
    {
    id:3,
    title: 'เบี้ยประกันภัยหลักเพื่อความคุ้มครอง'
    },
    {
    id:4,
    title: 'เบี้ยประกันภัยหลักเพื่อการออม'
    }
    ,
    {
    id:5,
    title: 'เบี้ยเพิ่มพิเศษ'
    }
    ,
    {
    id:6,
    title: 'สัญญาเพิ่มเติม'
    }
    ,
    {
    id:7,
    title: 'รวม'
    }
    ,
    {
    id:8,
    title: 'รวมสะสม'
    }
    ,
    {
    id:9,
    title: 'ค่าดำเนินการประกันภัย'
    }
    ,
    {
    id:10,
    title: 'ค่าธรรมเนียมการบริหารกรมธรรม์'
    },
    {
    id:11,
    title: 'ค่าการประกันภัย'
    },
    {
    id:12,
    title: 'รวม'
    },
    {
    id:13,
    title: 'จำนวนเงินที่ถอน'
    },
    {
    id:14,
    title: 'ค่าธรรมเนียมการถอน'
    },
    {
    id:15,
    title: 'จำนวนเงินที่รับจริง'
    },
    {
    id:16,
    title: 'จำนวนเงินที่ถอนสะสม'
    },
    {
    id:17,
    title: 'เบี้ยเพื่อความคุ้มครอง'
    },
    {
    id:18,
    title: 'เบี้ยเพิ่มการออม'
    },
    {
    id:19,
    title: 'เบี้ยเพิ่มพิเศษ'
    },
    {
    id:20,
    title: 'รวม'
    },
    {
    id:21,
    title: 'นำไปหักลดหย่อนภาษีได้'
    },
    {
    id:22,
    title: 'ฐานภาษี'
    },
    {
    id:23,
    title: 'เงินคืนภาษีที่คาดว่าจะได้รับ'
    }
  ];



  private dataTable : Array<object>;

  constructor(private fb: FormBuilder,
              private navParams : NavParams,
              private dummyData : UnitlinkBenefit,
            private broadcast: Broadcaster) {

    this.prospect = this.navParams.get('prospect');


   this.group_ckbox = this.fb.group ({
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: '',
      col6: '',
      col7: '',
      col8: '',
      col9: '',
      col10: '',
      col11: '',
      col12: '',
      col13: '',
      col14: '',
      col15: '',
      col16: '',
      col17: '',
      col18: '',
      col19: '',
      col20: '',
      col21: '',
      col22: '',
      col23: '',
      col24: '',
      col25: '',
      col26: '',
      col27: '',
      col28: '',
      col29: '',
      col30: '',
      col31: '',
      col32: '',
      col33: '',
      col34: ''
   });

  
  } 


  /**
   * show/Hide Column
   */
  private showHideColumn(): void {
      this.showColumn = !this.showColumn;
  }

  private onSelectedAll(ev) : boolean {
    alert(this.data);
  if (ev.target.checked) {
    this.allChecked = true;
  } else {
    this.allChecked = false;
  }

  return;
  }

  private getDataTable(planType: string, planCode: string ,data: any){

    //let dummyData : UnitlinkBenefit = new UnitlinkBenefit();
    let plancode : string;
    let insureAge : number;
    let insureAgeEnd : number;
    let sex : string;
    let mode : string;
    let tax : number;
    let quotationSum : number;
    let quotationPremium : number;
    let topupPremium : number;
    let arrtop : object;
    let arrwd : object[];
    let arrpro : object;

    if (planCode = 'UA01') {
      if (planType == 'child_fund') {

    
        plancode = 'UA01';
        insureAge = Number(this.prospect.age);
        insureAgeEnd = Math.abs ( (Number(data.ulinkChildInfo.controls['child_ageto'].value) - Number(data.ulinkChildInfo.controls['child_age'].value))) + Number(this.prospect.age); 
        console.log("insureAgeEnd",insureAgeEnd);
        sex    = (data.ulinkChildInfo.controls['child_ageto'].value == 'หญิง') ? 'F' :'M';
        mode  = "1";
        tax  = data.ulinkChildPremium.controls['child_tax'].value;
        quotationSum  = data.ulinkChildPremium.controls['PremiumUlinkChild'].value.single_prem;
        quotationPremium  = data.ulinkChildPremium.controls['PremiumUlinkChild'].value.top_prem;
        topupPremium  = 1000;
        arrtop = {'toptypepay': [],
                                'topage': [],
                                'topageto': [],
                                'topsum': []};
        arrwd  = [];
        arrpro = {'profitage': [],
                              'profitper': []};
    
        data.ulinkChildPremium_array.controls['toppayRows'].controls.forEach(element => {
        arrtop['toptypepay'].push(element.controls['toptypepay'].value);
        arrtop['topage'].push(element.controls['topage'].value);
        arrtop['topageto'].push(element.controls['topageto'].value);
        arrtop['topsum'].push(element.controls['topsum'].value);
        });
        
        
        // arrwd['child_inflation'] = data.ulinkChildWithdraw.controls['child_inflation'].value;
        // arrwd['bachlor_agestr_wd'] = data.ulinkChildWithdraw.controls['bachelor_agestr_wd'].value;
        // arrwd['bachlor_agestp_wd'] = data.ulinkChildWithdraw.controls['bachelor_agestp_wd'].value;
        // arrwd['bachelorwd'] = data.ulinkChildWithdraw.controls['bachelorwd'].value;
        
        // arrwd['master_agestr_wd'] = data.ulinkChildWithdraw.controls['master_agestr_wd'].value;
        // arrwd['master_agestp_wd'] = data.ulinkChildWithdraw.controls['master_agestp_wd'].value;
        // arrwd['masterwd'] = data.ulinkChildWithdraw.controls['masterwd'].value
    
    
        data.ulinkChildProfit_array.controls['profitRows'].controls.forEach(element => {
          console.log("element>>>>>",element);
          arrpro['profitage'].push(element.controls['profitage'].value);
          arrpro['profitper'].push(element.controls['profitper'].value);
        });
    
        
        // this.dataTable = dummyData.getBenefitTableUA01(
        //   plancode , 
        //   insureAge ,
        //   insureAgeEnd ,
        //   sex , 
        //   mode ,
        //   tax ,
        //   quotationSum ,
        //   quotationPremium ,
        //   topupPremium ,
        //   arrtop ,
        //   arrwd ,
        //   arrpro ,
        //   );
          console.log('sssss : ',this.dataTable);
        
        }

      } else if (planCode == 'UA02') {
        /**
         * 
         * 
         * ใส่ data ส่วนฝั่ง  99/99 เพื่อยิง service
         */
      }
    }
   

}
