import { UnitlinkUtility } from './unitlink-utility';

/**
 * plancode : 99/1
 * 
 */
export class UnitlinkBenefitUA01 {
  //Insurance variable for calculation
  private yearPolicy =  new Array(); // 1
  private monthPolicy =  new Array(); // 2
  private agePolicy =  new Array(); // 3
  private SP = new Array(); //เบี้ยประกันภัยชำระครั้งเดียว							4
  private charge = new Array(); //ค่าใช้จ่ายในการดำเนินการประกันภัย					5
  private bonusSP = new Array(); //โบนัสเบี้ยประกันภัยชำระครั้งเดียว					6
  private AF = new Array(); //ค่าธรรมเนียมการบริหารกรมธรรม์						7
  private NAR = new Array(); //จำนวนเงินเสี่ยงภัยสุทธิ							8
  private COI = new Array(); //ค่าการประกันภัย								9
  private AVSP = new Array(); //มูลค่ารับซื้อคืนหน่วยลงทุน						10
  private deathBenefit = new Array(); //ผลประโยชน์กรณีเสียชีวิต					11
  private exppSP = new Array(); //มูลค่าเวนคืนกรมธรรม์หรือค่า surrender value		12
  private PREMIUMTOPUP = new Array();//								13
  private AVTOPUP = new Array();//									14
  private CVTOPUP = new Array();//									15
  private AFTOPUP = new Array();//									16
  private EXPENSETOPUP = new Array();//								17
  private REALWITHDRAW = new Array();//
  //Consumer variable for calculation
  private Tax; 
  private consAge = 0; //อายุผู้ซื้อ
  private sex; //เพศ
  private consName; //ชื่อผู้ซื้อ
  private agentName; //ชื่อผู้ขาย
  private sysdate; //วันที่
  private stopFlag=0; //ตัวนับการขาดกรมธรรม์
  private cancelFlag = 0;
  private stopPremium = 0;
  private showEndCV = [0,0,0];
  private showEndM = ["0","0","0"];
  private EM = "0";
  private loopAdd = 0;
  private PremSP; //ทุน
  private SumSP;  //เบี้ย
  private PremTOP; //เบี้ย

  private tmpCTOP;
  private tmpAFTOP;


  private yEndown = 99;
  private mEndown = this.yEndown*12;
  private data = null ;
  private tmpSSP;
  private tmpChr; 
  private tmpBN;
  private tmpAF;
  private tmpCOI;
  private SUMSP = new Array(); 
  private PREMSP = new Array(); 
  private PREMTOPUP = new Array(); 
  private PREMRIDER = new Array(); 
  private RATEUA01 = new Array(); 
  private WITHDRAW = new Array(); 
  private datatable = null ;	

  private ySeek = 0;
  private AVNumber = "0";

  // private TMOTable : Array<Array<number>>= [
  //   [1.05,0.93,0.83,0.74,0.67,0.6,0.56,0.53,0.52,0.53,
  //   0.58,0.65,0.76,0.9,1.07,1.26,1.46,1.66,1.85,2.01,
  //   2.28,2.39,2.46,2.51,2.53,2.55,2.55,2.55,2.55,2.57,
  //   2.59,2.62,2.67,2.73,2.81,2.9,3.02,3.16,3.31,3.49,
  //   3.69,3.87,4.12,4.38,4.67,4.99,5.1,5.46,5.87,6.31,
  //   6.81,7.36,7.98,8.67,9.45,10.32,11.3,12.4,13.64,15.03,
  //   16.61,18.39,20.37,22.57,24.97,27.56,30.33,33.26,36.36,39.63,
  //   43.13,46.92,51.08,55.69,60.83,66.56,72.89,79.75,87,94.44,
  //   101.81,108.91,115.68,122.25,128.98,136.44,145.33,156.27,169.74,185.9,
  //   204.57,225.23,247.21,269.8,292.39,314.57,336.16,357.22,378,1000], 
  //   [1.03,0.91,0.81,0.71,0.63,0.57,0.52,0.49,0.47,0.46, 
  //   0.47,0.48,0.51,0.54,0.57,0.6,0.63,0.66,0.69,0.71,
  //   0.77,0.79,0.81,0.82,0.84,0.85,0.86,0.88,0.9,0.92,
  //   0.95,0.99,1.03,1.08,1.14,1.19,1.25,1.32,1.38,1.45,
  //   1.52,1.54,1.63,1.72,1.83,1.96,2.1,2.27,2.47,2.7,
  //   2.98,3.32,3.72,4.18,4.72,5.34,6.05,6.83,7.71,8.69,
  //   9.76,10.96,12.29,13.78,15.46,17.35,19.49,21.88,24.53,27.44,
  //   30.57,33.89,37.36,40.93,44.55,48.24,52.01,55.94,60.18,64.9,
  //   70.32,76.64,84.1,92.87,103.07,114.78,128.01,142.66,158.59,175.55,
  //   193.01,210.4,227.46,244.42,261.82,280.76,302.15,326.81,354.72,1000]];


  private TMOTable = [
    [1.44, 0.34, 0.33, 0.32, 0.31, 0.30, 0.29, 0.28, 0.28, 0.25,
        0.28, 0.35, 0.46, 0.58, 0.72, 0.86, 1.00, 1.12, 1.23, 1.32,
        1.40, 1.45, 1.49, 1.52, 1.55, 1.57, 1.58, 1.60, 1.62, 1.65,
        1.69, 1.75, 1.82, 1.90, 1.99, 2.09, 2.19, 2.31, 2.44, 2.57,
        2.72, 2.88, 3.06, 3.26, 3.47, 3.72, 3.98, 4.28, 4.60, 4.94,
        5.32, 5.72, 6.15, 6.62, 7.13, 7.70, 8.32, 9.03, 9.82, 10.73,
        11.75, 12.91, 14.23, 15.71, 17.37, 19.25, 21.37, 23.77, 26.48,
        29.55, 33.04, 36.97, 41.39, 46.32, 51.77, 57.72, 64.18, 71.11,
        78.48, 86.26, 94.44, 102.99, 111.92, 121.25, 131.02, 141.30,
        152.18, 163.76, 178.94, 195.53, 213.66, 233.48, 255.12, 278.78,
        302.22, 327.18, 353.67, 381.70, 411.23, 1000.00
    ],
    [1.17, 0.30, 0.30, 0.29, 0.29, 0.28, 0.28, 0.27, 0.27, 0.28,
        0.29, 0.31, 0.32, 0.34, 0.35, 0.37, 0.39, 0.41, 0.42, 0.44,
        0.45, 0.47, 0.48, 0.50, 0.51, 0.52, 0.53, 0.54, 0.55, 0.57,
        0.58, 0.60, 0.62, 0.65, 0.68, 0.71, 0.76, 0.81, 0.87, 0.93,
        1.01, 1.09, 1.18, 1.27, 1.38, 1.49, 1.61, 1.75, 1.89, 2.05,
        2.22, 2.42, 2.64, 2.90, 3.19, 3.52, 3.90, 4.32, 4.80, 5.33,
        5.93, 6.62, 7.40, 8.30, 9.34, 10.57, 12.01, 13.72, 15.73,
        18.08, 20.82, 23.97, 27.56, 31.59, 36.06, 40.97, 46.31,
        52.07, 58.26, 64.88, 71.97, 79.57, 87.73, 96.51, 105.99,
        116.24, 127.34, 139.37, 154.25, 170.72, 188.94, 209.12,
        231.45, 256.16, 281.35, 308.48, 337.62, 368.76, 401.88, 1000.00
    ]
];

  private mode : number;  
  constructor(public func : UnitlinkUtility){

  }
  public preloadUA01(
    testA1 : number[][],
    testage,
    testsex,
    testmode,
    testageEndown,
    testTax,
  ) : string[][] {
    this.datatable = [];
    this.datatestUA01(
      testA1,
      testage,
      testsex,
      testmode,
      testageEndown,
      testTax,
      0);
    return this.datatable;
  }
  /**
   * 
   * @param testA1 object ที่ถูกปั้น data จากหน้าจากหลัก
   * @param testage อายุของผู้เอาประกัน
   * @param testsex เพศของผู้เอาประกัน
   * @param testmode รูปแบบการจ่าย Ex. รายปี, รายเดือน, ...
   * @param testageEndown ระยะเวลาคุ้มครอง
   * @param testTax ภาษีอะไรสักอย่าง
   * @param testSeek //อายุที่จะเจาะหา av 
   */
  private datatestUA01(
    testA1 : number[][],
    testage,
    testsex,
    testmode,
    testageEndown,
    testTax,
    testSeek
  ){
    this.consAge = testage; 
    this.sex = testsex; 
    this.mode = testmode;  // mode pay prem 1:Y 0=M 2=H 4=S 
    this.yEndown = testageEndown; 
    this.yEndown = (this.yEndown-this.consAge)+1;
    this.mEndown = this.yEndown*12;
    this.ySeek = testSeek;
    this.Tax = testTax;
    
    let endl = 0;
    for(let i = 0 ; i < this.yEndown  ; i++) 
    {
  //console.log("yEndown==" + yEndown + " SUMSP ==" +testA1[i][2]);		
      this.SUMSP[i] = testA1[i][2]; 
      this.PREMSP[i] = testA1[i][4]; 
      this.PREMTOPUP[i] = testA1[i][6]; 
      this.PREMRIDER[i] = testA1[i][7];
      this.WITHDRAW[i] = Number(this.func.Maddnum(testA1[i][8],0,0));
      this.RATEUA01[i] = testA1[i][9];	
      if ((i+1) == this.yEndown)
        endl = 1;
    }	
    if ( endl == 1){
      if(testSeek == 0){
        this.presetUA01('99');
      }else {
        this.presetUA01('get');
      }
     
    }
  }
  private presetUA01(src: string){
  
    // if ( src == 'ex' ||  src == '99'  ){
//alert('test==' + src);	
    
      
      if(src == '99') {

        this.EM = "0";
        this.agentName = "ตัวแทน ชื่อ-สกุล";
        this.consName = "ลูกค้า ประกัน";
        this.sysdate = "08/03/2560";
        let EP = "0";
        let EPYEAR = "0";
          
        this.yearPolicy =  new Array(); // 1
        this.monthPolicy =  new Array(); // 2
        this.agePolicy =  new Array(); // 3
        this.SP =  new Array(); // 4
        this.charge =  new Array(); // 5
        this.bonusSP =  new Array(); // 6
        this.AF =  new Array(); // 7
        this.NAR =  new Array(); // 8
        this.COI =  new Array(); // 9
        this.AVSP =  new Array(); // 10
        this.deathBenefit =  new Array(); // 11
        this.exppSP =  new Array(); // 12
        this.PREMIUMTOPUP = new Array();//								13
        this.AVTOPUP = new Array();//									14
        this.CVTOPUP = new Array();//									15
        this.AFTOPUP = new Array();//									16
        this.EXPENSETOPUP = new Array();//								17

        this.calculateControllerUA01('table');
        this.prepareInputUA01();
        this.tableInputUA01();
      }else if (src == 'get') {
        this.calculateControllerUA01('get');
        this.prepareInputUA01();
        this.resultSeekUA01();
      }
    

      // this.calculateControllerUA01('table',function(){
      //   this.prepareInputUA01(function(){
      //     this.tableInputUA01(function(){
      //         if (src == '99')
      //           {
      //             chkHave('benefit1').style.display = ""; 
      //             setHeadTableUA01('benefit1');
      //             setRowTableUA01('benefit1',yEndown);
      //           }
      //           else if (src == 'ex')
      //           {
      //             chkHave('benefitexam').style.display = ""; 
      //             setHeadTableUA01('benefitexam');
      //             setRowTableUA01('benefitexam',yEndown);
      //           }
      //       });	
      //     });
      //   });/**/
      	
  //     else if (src == 'get')
  //     {
  // //console.log('get');
  //       calculateControllerUA01('get',function(){
  //         prepareInputUA01(function(){
  //           resultSeekUA01(function(output){
  //             callback(output);
  //           });
  //         });
  //       });
  //     }	
    
  //  }
  }

  public CalculateAvUA01(
    testA1 : number[][],
    testage,
    testsex,
    testmode,
    testageEndown,
    testTax,
    testSeek
  ) : string {
    this.datatable = [];
    this.datatestUA01(
      testA1,
      testage,
      testsex,
      testmode,
      testageEndown,
      testTax,
      testSeek);
      
    return this.AVNumber;
  }

  private resultSeekUA01() {
    try {
        this.AVNumber = ""; 
        let show = this.ySeek - this.consAge;
        /*console.log("ySeek:"+ ySeek + " consAge:"+ consAge + "     show:"+ show 
        		+ "     AVSP:"+ data[show][9]  + "     AVTOP:"+ data[show][15] 
        		+ "     year:" +data[show][0] 
        		+ "     sp:" +data[show][3]    + "     age:" +data[show][2]
        		) ;*/
        let sp = this.data[show][9];
        let top = this.data[show][15];
        let res = this.Maddnum(top, sp, 2);

        //console.log(" resultSeekUA01 == "+res);
        this.AVNumber = res;
        
    } catch (e) {
        console.log(" error  datatest e=" + e);
    }
}
  private calculateControllerUA01(
    process : string,    
  ) {
    let insertFlag : number = 0;
    let insertCompareFlag : number = 0;
    let year : number = 1;
    let month : number = 1;
    let ccSP : number = 0;   //4
    let ccCharge : number = 0;  //5  
    let ccBonusSP : number = 0;  //6
    let ccAF : number = 0;    //7
    let ccNAR : number = 0;  //8
    let ccCOI : number = 0;  //9
    let ccAVSP : number = 0;  //10  &  12
    let ccDeathBenefit : number = 0;  //11
    let ratio : number = 0.01;
    let temp : number = 0;
    let prevAVSP : number = 0;
    
    
    
    let ccPremtopup : number = 0;   //1
    let ccExpensetopup : number = 0;   //2
    let ccAFtopup : number = 0;    //3
    let ccAVtopup : number = 0;    //4
    let ccCVtopup : number = 0;    //5
    let prevtopup : number = 0;    //6
    let mSP : number = 0;
    let mTOP : number = 0;
    let pSP : number = 0;
    let pTOP : number = 0;
    let newAV : number[] = [];
    let ccWithDraw : number = 0 ;
    let lastAVSP : number = 0 ;
    let lastAVtopup : number = 0 ;
    let chkWihDraw : number = 0 ;
    let ccSumWD : number = 0;  //ถอนสะสม


    // defualt
    this.stopFlag = 0;

    //console.log("process==" + process);
      for(let lc = 0 ; lc <= this.mEndown  ; lc++) 
      {
        if (  month % 12 == 1  )    
        {
          this.PremSP = this.PREMSP[0];   // prem
          this.SumSP = this.SUMSP[0];     // sum
          this.PremTOP = this.PREMTOPUP[temp]; // prem
          ratio =  this.func.formatInt(this.RATEUA01[temp]);
          
          temp++;
        }
        else
        {
          this.PremTOP = 0;
        }
        if(process == 'table')
        {
          if (  month % 12 == 0  )    
          {
            ccWithDraw = this.WITHDRAW[temp-1];
          }  
          else
          {
            ccWithDraw = 0 ;    
          }
  
        }  
        else
        {
          ccWithDraw = 0 ;
        }  
                    
        //calculate SP
        if( lc == 0) 
        {
          ccSP = this.PremSP;
          ccPremtopup = this.PremTOP;
          ccCharge = Number(this.calculateCharge(Number(this.PremSP))); 
          
        }
        else 
        {
          ccSP = 0;
          ccCharge = 0;
          ccBonusSP = 0;
          ccPremtopup = this.PremTOP;
        }
        
        //calculate Bonus (3)
        if (month % 12 == 1)
        {
          ccBonusSP = this.calculateBonusSP(year, month, prevAVSP , chkWihDraw);
        }
        //calculate AF (4)
        
        ccAF = Number(this.calculateAF(year, month, this.PremSP, ccCharge, lastAVSP ));
          
        //calculate NAR (5)
        ccSumWD +=  this.func.formatInt(this.func.Maddnum(ccWithDraw,0,0));
        ccNAR = this.calculateNAR(year, month, this.PremSP, ccCharge, lastAVSP  , ccSumWD );
    
        //calculate COI (6)
        
        ccCOI = Number(this.calculateCOI(this.consAge, year, ccNAR , this.sex));
        
        //(13)
        ccExpensetopup = Number(this.calculateChargeTOP(year, month, ccPremtopup));
        //(14)
        ccAFtopup = this.calculateAFTOPUA01(year, month, ccPremtopup , ccExpensetopup , lastAVtopup );
    
        
        //calculate AVSP (7)  (9)    
        ccAVSP = this.calculateAVSP( year, month , this.PremSP, ccCharge, ccBonusSP, ccAF, ccCOI, prevAVSP, ratio);
  
        //(15)
        ccAVtopup = Number(this.calculateAVTOPUA01(year, month, ccPremtopup , ccExpensetopup , prevtopup  , ccAFtopup));
        
        mSP = this.calculateMoneyUA01(year, month ,'SP' ,this.PremSP, ccBonusSP , ccPremtopup );
        mTOP = this.calculateMoneyUA01(year, month ,'TOP' ,this.PremSP, ccBonusSP  , ccPremtopup );
        
        pSP = Number(this.payAVSPUA01(year , month , ccCharge , ccAF, ccCOI ));
        pTOP = Number(this.payAVTOPUA01(year , month , ccExpensetopup  , ccAFtopup));
      
        if ( year >  100 )  {
          console.log("before growth ["+  year + "/" +  month +"]   " 
              + "ccAVSP="+ ccAVSP + "  ccAVtopup="+ ccAVtopup 
              /*+"  mSP="+ mSP   + "  mTOP="+ mTOP 
              +"  pSP="+ pSP + "  pTOP="+ pTOP
              +" prevAVSP="+ prevAVSP + " prevtopup="+ prevtopup
              + " ccAFtopup=" + ccAFtopup
              + " ccExpensetopup=" + ccExpensetopup
              + " ccBonusSP=" + ccBonusSP*/
              );      
        }    
          
          
        newAV = this.calculateAvUA01( year , month , mSP , mTOP , ccAVSP , ccAVtopup , prevAVSP , prevtopup 
                    ,  pSP , pTOP , ratio);
        
        
        
        ccAVSP = newAV[0];  
        ccAVtopup = newAV[1];
    /*
      if ( year >  0 )  {
        console.log("after growth ["+  year + "/" +  month +"]   " 
            + "ccAVSP="+ ccAVSP + "  ccAVtopup="+ ccAVtopup 
            /*+"  mSP="+ mSP   + "  mTOP="+ mTOP 
            +"  pSP="+ pSP + "  pTOP="+ pTOP
            +" prevAVSP="+ prevAVSP + " prevtopup="+ prevtopup
            + " ccAFtopup=" + ccAFtopup
            + " ccExpensetopup=" + ccExpensetopup
            + " ccBonusSP=" + ccBonusSP*/
    //    );      
    //  }  
          
      if(ccWithDraw > 0)
      {
        lastAVSP = ccAVSP ;  
        lastAVtopup = ccAVtopup ;
        ccWithDraw = Number(this.func.Maddnum(0,ccWithDraw,0));
                
        newAV = this.withDrawAVUA01( year , month , ccWithDraw  , ccAVSP , ccAVtopup);
        ccAVSP = newAV[0];  
        ccAVtopup = newAV[1];  
        if (lastAVSP != ccAVSP )
          chkWihDraw = 1;
        
        if( ccAVSP < 0 )
        {
          ccWithDraw = Number(this.func.Maddnum(ccWithDraw,ccAVSP,2));
          ccAVSP = 0;
          if( ccAVtopup < 0 )
            ccAVtopup = 0;
        }
        
      }
      else
      {
        
        lastAVSP = ccAVSP ;  
        lastAVtopup = ccAVtopup ;
      }  
      if ( year >  100 )  {
        console.log( "["+  year + "/" +  month +"]   "  + "ccWithDraw   =" + ccWithDraw + " Before   SP="  + lastAVSP  +"  top=" + lastAVtopup
        + "  After  SP="  +   ccAVSP + "  top=" +ccAVtopup
        +" AFSP = " +ccAF
        +" ccNAR = " +ccNAR
        +" COI = " +ccCOI
        +" ccBonuS =" +ccBonusSP 
        +" ChargeTOP = "+ ccExpensetopup
        +" AFTOP = " +ccAFtopup
        
        );      
      }    
        
        //calculate death benefit   (8)
        ccDeathBenefit = Number(this.calculateDeathBenefitUA01(this.PremSP, ccAVSP , ccAVtopup , ccSumWD));
        
        //(16)
        ccCVtopup =ccAVtopup;
        
        prevAVSP = ccAVSP;  
        prevtopup = ccAVtopup;
  /*    
  if ( year > 0 )  {    
  console.log("-----------month===" + month + "   year=====" + year 
            +" AFSP = " +ccAF
            +" ccNAR = " +ccNAR
            +" COI = " +ccCOI
            +" AFTOP = " +ccAFtopup
            +" ChargeTOP = "+ ccExpensetopup
            +" ccBonuS =" +ccBonusSP 
            +" ccCOI =" +ccCOI
            +" ccAVSP =" +ccAVSP);  
  }*/
        
        if (month % 12 == 1)
        {
          this.tmpSSP = ccSP;
          this.tmpChr = ccCharge;
          this.tmpBN = ccBonusSP;
          this.tmpAF = 0;
          this.tmpCOI = 0;
          this.tmpAFTOP = 0;
          this.tmpCTOP = ccExpensetopup;
          
        }
  
        this.tmpAF = this.func.Maddnum(this.tmpAF,ccAF,2);
        this.tmpCOI = this.func.Maddnum(this.tmpCOI,ccCOI,2);
        this.tmpAFTOP = this.func.Maddnum(this.tmpAFTOP,ccAFtopup,2);
  /*
  console.log("ratio ===" + ratio + "---------" +year+" / "+month  + "--"+
  " (3)=" +ccBonusSP+
  " (4)=" +ccAF+
  " (5)=" +ccNAR+
  " (6)=" +ccCOI+
  " (7)=" +ccAVSP+
  " (8)=" +ccDeathBenefit+
  " (9)=" +ccAVSP+
  " (prevAVSP)=" + prevAVSP+
  " (prevtopup)=" + prevtopup
  
  );*/
        if ( month % 12 == 0 )
        {
        
          
          this.yearPolicy[year-1] =  year; // 1
          this.monthPolicy[year-1] = "12"; // 2
          this.agePolicy[year-1] =  this.consAge+(year-1); // 3
          this.SP[year-1] =  this.tmpSSP; // 4
          this.charge[year-1] = this.tmpChr; // 5
          this.bonusSP[year-1] =  this.tmpBN; // 6
          this.AF[year-1] =  this.tmpAF; // 7  ทบมา
          this.NAR[year-1] =  ccNAR; // 8   
          this.COI[year-1] =  this.tmpCOI; // 9     ทบมา
          this.AVSP[year-1] =  this.func.Maddnum(ccAVSP,0,2) ; // 10  
          this.deathBenefit[year-1] = this.func.Maddnum(ccDeathBenefit,0,2) ; // 11  
          this.exppSP[year-1] =  this.func.Maddnum(ccAVSP,0,2) ; // 12  
          this.PREMIUMTOPUP[year-1] = this.func.Maddnum(ccPremtopup,0,2)  ; // 13
          this.EXPENSETOPUP[year-1] = this.ChargeInputUA01('TOP',year,this.tmpCTOP, this.mode); //14    ทบมา
          this.AFTOPUP[year-1] = this.tmpAFTOP ; //15    ทบมา
          this.AVTOPUP[year-1] = this.func.Maddnum(ccAVtopup,0,2) ; //16
          this.CVTOPUP[year-1] = this.func.Maddnum(ccAVtopup,0,2) ; //17
          this.REALWITHDRAW[year-1] = ccWithDraw;
        }
        month++;
        if ( month % 12 == 1)
        {
          year++;
        }
        if (year == (this.yEndown+1))
        {
          break;
        }
        if ( ccAVSP <= 0 && ccAVtopup <= 0 )
        {
          this.stopFlag = year-1;
  //console.log(" calculateControllerUA01  callback  year=" + year + "   stopFlag=" + stopFlag +  " ccAVSP==" + ccAVSP +  " ccAVtopup==" +  ccAVtopup);    
  
          break;
        }
        else
        {
          this.stopFlag = 0;
        }  
      }
    
  }
  private withDrawAVUA01( year : number, month : number, 
    ccWithDraw : number, ccAVSP : number, ccAVtopup : number) : number[]
  {
    let newChkAV : number[] = [];
    // let RSP
    let SP : number = 0
    let TOP : number = 0;;
    let withDrawTOP : number = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
    let withDrawSP : number = Number(this.func.Msubnum(ccAVSP , ccWithDraw, 4));

    let casewd = 0;
    if( ccAVtopup > 0 && withDrawTOP > 0)
    {
      TOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
      SP = ccAVSP ;
  casewd = 1;
    }
    else if (  ccAVtopup > 0 && withDrawTOP < 0 )
    {
      TOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
      SP = ccAVSP ;
  casewd = 2;
      if (ccAVSP > 0)
      {
        withDrawSP = Number(this.func.Maddnum(ccAVSP , TOP, 4));
        SP = Number(this.func.Maddnum(ccAVSP , TOP, 4));
        if ( withDrawSP > 0)
        {
          TOP = 0;
  casewd = 3;    
        }
        
      }
      
    }
    else if ( ccAVtopup <= 0  && ccAVSP > 0  && withDrawSP > 0)
    {
      TOP = ccAVtopup;
      SP = Number(this.func.Msubnum(ccAVSP , ccWithDraw, 4));
  casewd = 4;
    }
    else if ( ccAVtopup <= 0 && ccAVSP > 0 && withDrawSP < 0)
    {
      TOP = ccAVtopup;
      SP = Number(this.func.Msubnum(ccAVSP , ccWithDraw, 4));
  casewd = 5;  
    }
    else if ( ccAVtopup <= 0 && ccAVSP < 0 )
    {
      TOP = ccAVtopup;
      SP = Number(this.func.Msubnum(ccAVSP , ccWithDraw, 4));
  casewd = 6;  
    }  
    
  if ( year > 100 )  {
  console.log("  casewd=="+ casewd  + " ["+ year + " / "+ month+ "]   SP="+ SP + " TOP=" + TOP 
      + " ccAVtopup="+ ccAVtopup + " ccAVSP=" + ccAVSP  + " withDrawSP=" + withDrawSP);
  }

    
    newChkAV[0] = SP;
    newChkAV[1] = TOP;
    
    return newChkAV;
  }
  private calculateAvUA01(  year : number, month : number, mSP : number, 
    mTOP : number, ccAVSP : number, ccAVtopup : number, prevAVSP : number, 
    prevtopup  : number, pSP : number, pTOP : number, ratio : number) : number[]
  { 
    let newCCAV : number[] = [];
    let newSP : number, newTOP : number;
    let po : number = (Math.floor( ( Math.pow(1+ratio,1.0/12.0))*10000000)/10000000.0);
    let caseAV : number = 0;
    let SpBorrowTOP : number = Number(this.func.Maddnum(ccAVtopup , ccAVSP, 4));
    if ( ccAVSP > 0)
    {
    
      newSP = ccAVSP;
      newSP = Number(this.func.Mmultiply(newSP,po,4));
      if(ccAVtopup > 0 )
      {
  caseAV = 1.1;  
        newTOP = ccAVtopup;
        newTOP = Number(this.func.Mmultiply(newTOP,po,4));
      }
      else
      {
  caseAV = 1.2;    
        newTOP = 0;
      }  
      
      
    }  
    else if ( ccAVSP < 0 &&  SpBorrowTOP > 0 )
    {
  caseAV = 2;  
      newSP = 0;
      newTOP =  Number(this.func.Maddnum(ccAVtopup , ccAVSP, 4));
      newTOP = Number(this.func.Mmultiply(newTOP,po,4));
            
    }
    else if ( ccAVSP < 0 &&  SpBorrowTOP < 0 )
    {
  caseAV = 3;  
      newSP = Number(this.func.Maddnum(ccAVtopup , ccAVSP, 4));
      newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
            
    }
    newCCAV[0] = newSP;
    newCCAV[1] = newTOP;
    
    
    // newCCAV[0] = this.func.chkUndefined(newSP);
    // newCCAV[1] = this.func.chkUndefined(newTOP);
    
    if ( year > 100 )  {
      console.log("["+  year + "/" +  month +"]   caseAV==["+ caseAV + "]   ccAVSP="+ newCCAV[0] 
    + "  ccAVtopup="+ newCCAV[1] );  
    }  
      
      
    
    return newCCAV;
    
    
  }

  private calculateAVSP( insY : number,  insM : number,  tmpSP : number,
    tmpCharge : number,  tmpBonusSP : number,  tmpAF : number, 
    tmpCOI : number,  tmpAVSP : number, ratio : number)
  {
    let d2 : number =0;
    if(insY == 1 && insM == 1) {
      d2 = Number(this.func.Msubnum(
          Number(this.func.Msubnum(
            Number(this.func.Msubnum(tmpSP,tmpCharge,4)),tmpAF,4)),tmpCOI,4));
    }
    else {
      d2=  Number(this.func.Msubnum(
          Number(this.func.Msubnum(
            Number(this.func.Maddnum(
              Number(this.func.Msubnum(tmpAVSP,tmpCharge,4))
              ,tmpBonusSP,4))
            ,tmpAF,4))
          ,tmpCOI,4));  
    }
    return d2;
  }

  private calculateMoneyUA01(year : number, month : number,
    type : string, PremSP : number, ccBonusSP : number, ccPremtopup : number) : number
  {
    let mn : number = 0;
    
    if( type == 'SP')
    {
      mn = Number(this.func.Maddnum(PremSP,ccBonusSP,2));
    }
    else if( type == 'TOP')
    {
      mn = ccPremtopup;
    }
    return mn;
  }



  private payAVSPUA01(year , month , ccCharge , ccAF, ccCOI ) : string
  {
    return this.func.Maddnum(Number(this.func.Maddnum(ccCharge, ccAF,4)),ccCOI,4);
  }
  private payAVTOPUA01(year , month , ccExpensetopup  , ccAFtopup) : string
  {
    return this.func.Maddnum(ccExpensetopup, ccAFtopup,4);
  }

  private ChargeInputUA01(type : string, year : number, tmpc : number, mode : number) : number
  {
    let mul : number;
    if ( mode == 0)
      mul = 12;
    else if ( mode == 2)
      mul = 2;
    else if ( mode == 4)
      mul = 4;
    else 
      mul = 1;
    if(type == 'TOP')  
    {
      return Number(this.func.Mmultiply(tmpc,mul,2));
    }
  }
  private calculateCharge( tmpSP : number) : string 
  {
    return this.func.Mmultiply(tmpSP, 0.025, 2);
  }
  private calculateBonusSP( insY : number, insM : number, 
    tmpAVSP : number, chkWihDraw : number) : number
  {
    if(insY > 5 && chkWihDraw == 0 )
    {  
      return Number(this.func.Mmultiply(tmpAVSP, 0.0025, 2));
    }  
    return 0;
  }
  private calculateAF( insY : number,  insM : number, 
    tmpSP : number,  tmpCharge : number,  tmpAVSP : number) : string
  {
    let rateAF : string = this.func.Mdivide( 0.01 , 12 ,8); 
    rateAF = rateAF.substring(0,9)

    if(insY == 1 && insM == 1) {
      return this.func.Mmultiply(Number(this.func.Msubnum(tmpSP, tmpCharge, 4)), Number(rateAF), 2) ; 
    }
    else {
  /*console.log("rateAF======================" + rateAF + "  __ "+insY + "/" + insM 
      + " tmpAVSP ==" + tmpAVSP  +  " SPAF= " + Mmultiply(tmpAVSP, rateAF, 2) );
  */
      return this.func.Mmultiply(tmpAVSP, Number(rateAF), 2) ;
    }
  }
  private calculateNAR( insY : number, insM : number, 
    tmpSP : number, tmpCharge : number, 
    tmpAVSP : number, tmpWITHDRAW  : number ) : number
  {
    if(insY == 1 && insM == 1) {
      return Number(this.func.Msubnum( Number(this.func.Mmultiply(tmpSP, 1.1, 2))  , 
        Number(this.func.Msubnum(tmpSP, tmpCharge, 2)) ,2 ));
    }
    else {
      let Nar : number = 0;
      let a : number = Number(this.func.Msubnum(Number(this.func.Mmultiply(tmpSP, 1.1, 2)),tmpAVSP ,2));
      let b : number = Number(this.func.Mmultiply(tmpSP, 0.1, 2));
      let c : number = Number(this.func.Msubnum(Number(this.func.Mmultiply(tmpSP,1.1,2)) , Number(this.func.Maddnum(tmpWITHDRAW,tmpAVSP,2)) ,2));

      if (tmpWITHDRAW == 0)
      {
        if(a > b)
          Nar =a;
        else
          Nar =b;
      }
      else
      {
        if(c > b)
          Nar =c;
        else
          Nar =b;
      }
  //console.log(insY+ " /" + insM + " NAR ===" + Nar + "  b=" +b + " a=" +a   + "  c=" +c + "  tmpAVSP="+tmpAVSP + "   tmpWITHDRAW=" + tmpWITHDRAW);       
      return  Nar;
    }
  }
  private calculateCOI( tmpAge,  year,  tmpNAR ,   tmpSex) : string 
  {
    let sex : number = 0;
    if (tmpSex == 'F')
      sex = 1;
    
    tmpNAR = this.func.Mmultiply(tmpNAR, 1, 2);
    let agetmo : number = ( this.func.formatInt(tmpAge)+this.func.formatInt(year) ) -1;
    let stdMortal : number = this.TMOTable[sex][agetmo];
    let totMortal : number = Number(this.func.Mmultiply(stdMortal, tmpNAR,4));
    let sumUnit : number   = Number(this.func.Mdivide(totMortal, 1000, 4));
    let coi4 : string = this.func.Mdivide(sumUnit, 12, 4);
    
    let coi : string = this.func.subDecimal2(coi4);

  /*console.log("calculateCOI   tmpNAR=" + tmpNAR + " stdMortal=" +stdMortal + "  totMortal=" +totMortal 
      + "  sumUnit="+sumUnit + "  coi="+coi + "  coi4==" + coi4);   */
    
    return coi;
  }



  private calculateDeathBenefitUA01( tmpSP,  tmpAVSP ,  tmpAVTOP , tmpSUMWD) : string
  {
    
    let DB : string ="";
    let a : string = this.func.Maddnum(Number(this.func.Mmultiply(tmpSP, 0.1, 4)),tmpAVSP ,4);
    let b : string = this.func.Mmultiply(tmpSP, 1.1, 4);
    let c : string = this.func.Maddnum(
      Number(this.func.Mmultiply(tmpSP, 0.1, 4)),
      Number(this.func.Maddnum(tmpAVSP, tmpSUMWD ,4)),4);
    
    
    let a1 : string = this.func.Maddnum(tmpAVTOP,Number(a),4);
    let b1 : string = this.func.Maddnum(tmpAVTOP ,Number(this.func.Mmultiply(tmpSP, 1.1, 4)), 4);
    let c1 : string = this.func.Maddnum(tmpAVTOP ,Number(this.func.Maddnum(tmpAVSP, Number(this.func.Mmultiply(tmpSP, 0.1, 4)) ,4)) ,4);
    if (tmpSUMWD  == 0)
    {
      if(this.func.formatInt(a) > this.func.formatInt(b))
        DB =a1;
      else
        DB =b1;
    }
    else
    {
      if(this.func.formatInt(c) > this.func.formatInt(b))
        DB =c1;
      else
        DB =b1;
      
      if( tmpAVSP <= 0 ) 
        DB ="0";
        
    }  
    /*
  console.log("calDeathBenefit  tmpAVSP == "+ tmpAVSP  + " tmpSUMWD ==" +tmpSUMWD 
      + "  DB=" + DB + "  b="+ b  + "   a="+ a + "  c="+ c
      + "  b1="+ b1  + "   a1="+ a1 + "  c1="+ c1 );
      */
    return  DB;
  }
  public calculateChargeTOP(year : number, month : number, premTOP : number) : string
  {
    return this.func.Mdivide(Number(this.func.Mmultiply(premTOP,2.5,2)),100,2);  
  }
  private calculateAFTOPUA01( year : number, month : number, 
    premTOP : number, tmpChargeTOP : number, tmpAVTOP : number) : number
  {
    let d7 : number =0;
    let rateTop : string = this.func.Mdivide( 0.01 , 12 ,8);
    rateTop = rateTop.substring(0,9)
    let sub1 : number = 0;
    if(year == 1 && month == 1)
    {
      sub1 = Number(this.func.Msubnum(premTOP , tmpChargeTOP,2));   
      d7 = Number(this.func.Mmultiply(sub1 , Number(rateTop), 2)); 
    }
    else if (tmpAVTOP < 0)
    {
      d7 = 0;
    }  
    else
    {
      d7 = Number(this.func.Mmultiply(tmpAVTOP , Number(rateTop) , 2));  
      if(d7 < 0)
        d7 = 0;
    }  
    /*console.log("  calculateAFTOPUA01 ----  "+year+"/"+ month
        +"  premTOP=" + premTOP 
        +"  tmpChargeTOP=" + tmpChargeTOP 
        +"  tmpAVTOP=" + tmpAVTOP 
        +"  rateTop=" + rateTop
        +"  sub1="+ sub1
        +"  d7=" + d7);*/
    return  d7;
  
  }
  private calculateAVTOPUA01 (year : number ,
    month : number , premTOP :number , 
    Expensetopup : number  , prevtopup : number,
    AFtopup : number ) : string
  {
    if(year == 1 && month == 1)
    {
      let av = this.func.Msubnum(Number(this.func.Msubnum(premTOP , Expensetopup,4)), AFtopup,4);   
      return  av;
    }
    else 
    {
      let av = this.func.Msubnum(Number(this.func.Msubnum(Number(this.func.Maddnum(premTOP , prevtopup,4)), Expensetopup,4)), AFtopup,4);  
      return  av;
    }
  }
  
  private prepareInputUA01() : void
  {
  //console.log("--- prepareInputUA01 --- yEndown==" + yEndown);
    if (this.stopFlag > 0)
      this.yEndown = this.stopFlag;
    
  //console.log(" prepareInputUA01 stopFlag==" + stopFlag);		
    
      this.data = new Array();
      for(let year = 0 ; year < this.yEndown; year++) 
      { 
        this.data[year] = new Array();
        this.data[year][0] = this.yearPolicy[year] ; // 1
        this.data[year][1] = this.monthPolicy[year] ; // 2
        this.data[year][2] = this.agePolicy[year] ; // 3
        this.data[year][3] = this.SP[year] ; // 4
        this.data[year][4] = this.charge[year] ; // 5
        this.data[year][5] = this.bonusSP[year] ; // 6
        this.data[year][6] = this.AF[year] ; // 7
        this.data[year][7] = this.NAR[year] ; // 8
        this.data[year][8] = this.COI[year] ; // 9
        this.data[year][9] = this.AVSP[year] ; // 10
        this.data[year][10] = this.deathBenefit[year] ; // 11
        this.data[year][11] = this.exppSP[year] ; // 12
        this.data[year][12] = this.PREMIUMTOPUP[year] ; // 13
        this.data[year][13] = this.EXPENSETOPUP[year] ; //14
        this.data[year][14] = this.AFTOPUP[year] ; //15
        this.data[year][15] = this.AVTOPUP[year] ; // 16
        this.data[year][16] = this.CVTOPUP[year] ; //17
        
        
        if ( (year+1) == this.yEndown)
        {
  //	console.log("--- prepareInputUA01   callback--- yEndown==" + yEndown);
          //callback();
          break;
        }
        
      }
  }

  private tableInputUA01() 
  {
//console.log(" tableInput yEndown==" + yEndown);
		if (this.stopFlag > 0)
      this.yEndown = this.stopFlag;
//console.log(" tableInput stopFlag==" + stopFlag);
	
    let sumPrem1 : number = 0;
    let sumWD : number = 0;
    this.datatable = new Array();
		for(let year = 0 ; year < this.yEndown  ; year++) 
		{ 
			
			this.datatable[year] = new Array();
			this.datatable[year][0] = this.agePolicy[year] ; 		// 	age
			this.datatable[year][1] = this.yearPolicy[year] ; 	// year
			this.datatable[year][2] = this.SUMSP[year] ; 			// sum
			this.datatable[year][3] = this.PREMSP[year] ; 		// prem 
			this.datatable[year][4] = this.PREMTOPUP[year] ; 		// prem
      this.datatable[year][5] = this.func.Maddnum(this.PREMTOPUP[year],this.PREMSP[year],2) ; 	// sum prem
      sumPrem1 = sumPrem1 + Number(this.datatable[year][5]);
			this.datatable[year][6] = sumPrem1;										   	// sum prem++
			this.datatable[year][7] = this.func.Maddnum(this.charge[year],this.EXPENSETOPUP[year],2)  ; 						   	// charge
			this.datatable[year][8] = this.func.Maddnum(this.AF[year],this.AFTOPUP[year],2) ; 								// af
			this.datatable[year][9] = this.COI[year] ; 								// coi
			this.datatable[year][10] = this.func.Maddnum( this.datatable[year][7] ,Number(this.func.Maddnum(this.datatable[year][8],this.datatable[year][9],2)),2)  ; 	// sum charge
			this.datatable[year][11] = this.bonusSP[year] ; 							// bonus
			this.datatable[year][12] = this.func.Mmultiply(this.RATEUA01[year],100,0) ; // rate
      this.datatable[year][13] = this.REALWITHDRAW[year] ; 							// withdraw
      sumWD = sumWD + Number(this.datatable[year][13]);
			this.datatable[year][14] = sumWD; 							// sum withdraw
			this.datatable[year][15] = this.AVSP[year] ; 						// AVSP
			this.datatable[year][16] = this.AVTOPUP[year] ; 					// AVTOP
			this.datatable[year][17] = this.func.Maddnum( this.AVTOPUP[year] ,this.AVSP[year],2) ; 	// SUM AV
			this.datatable[year][18] = this.deathBenefit[year] ; 						// death
			this.datatable[year][19] = this.chargeTax( this.datatable[year][9] , this.datatable[year][7] , this.datatable[year][8]) ; 	// tax
			this.datatable[year][20] = this.Tax ;// tax
			this.datatable[year][21] = this.calTax(this.datatable[year][19], this.datatable[year][20] ) ; 							// tax
	
			
			if ( (year+1) == this.yEndown)
			{
//console.log(" tableInputUA01   callback    yEndown==" + yEndown);
        //callback();
        break;
			}
			
		}
  }
  // var sumPrem1 = 0;
  // var sumWD = 0;
  // function sumPremUA01 (prem) 
  // {
  //   sumPrem1 +=  formatInt(prem);
  //   return sumPrem1;
  // }
  // function sumWithDrawUA01 (wd) 
  // {
  //   sumWD +=  formatInt(wd);
  //   return sumWD;
  // }
  private calTax (charge : number, baseTax : number) : number
  {
    // let a : number = charge ; 
    // let b : number = baseTax;
    let calTax : number = Number(this.func.Mmultiply(charge,baseTax,2));
    calTax = Number(this.func.Mdivide(calTax,100,2));
      
    return calTax;
  }
  private chargeTax (charge : number, af : number , coi : number) : number
  {
    let sumcharge = Number(this.func.Maddnum( coi , Number(this.func.Maddnum(charge,af,2)) ,2 ));
    let maxcharge : number = 100000;
    let chargeTax : number = 0;
    if ( sumcharge > maxcharge)
      chargeTax = maxcharge;
    else
      chargeTax = sumcharge;
      
    return chargeTax;
  }

  private Maddnum(a, b, c) {
    a = (a) * 1;
    b = (b) * 1;
    let result = '0';
    if (c > 0)
        result = (a + b);
    else
        result = (a + b);

    result = String((Number(result) * 1.0000).toFixed(c));
    return result;
}
}
