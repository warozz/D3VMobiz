import { UnitlinkUtility } from './unitlink-utility';

/**
 * plancode : 99/99
 * 
 */
export class UnitlinkBenefitUA02 {
  //Insurance variable for calculation
  private yearPolicy =  new Array(); 
  private monthPolicy =  new Array(); 
  private agePolicy =  new Array(); 
  private RPP = new Array();
  private RSP = new Array(); 
  private RCP = new Array();
  private chargeRPP = new Array(); 
  private chargeRSP = new Array();
  private bonusRPP = new Array(); 
  private AFRPP = new Array();
  private AFRSP = new Array(); 
  private COIRPP = new Array(); 
  private COIRSP = new Array(); 
  private COIRIDER = new Array(); 
  private PF = new Array();
  private AVRPP = new Array(); 
  private AVRSP = new Array(); 
  private deathBenefit = new Array(); 
  private exppRPP = new Array();
  private exppRSP = new Array(); 
  private PREMIUMTOPUP = new Array();
  private AVTOPUP = new Array();
  private CVTOPUP = new Array();
  private AFTOPUP = new Array();
  private EXPENSETOPUP = new Array();
  private REALWITHDRAW = new Array();//
  private REALPREMRIDER = new Array();
  private FEEWD = new Array();

  //Consumer variable for calculation
  private Tax; 
  private consName; 
  private agentName; 
  private sysdate;
  private stopFlag = 0; 
  private cancelFlag = 0;
  private stopPremium = 0;
  private EM : number = 0; 
  private showEndCV = [0,0,0];
  private showEndM = ["0","0","0"];
  private EP : number = 0;
  private EPYEAR : number = 0;
  private Age_i = 61 ;  
  private Age_s = "61" ;   
  private loopAdd = 0;
  private mode ;      

  private consAge; 
  private sex; 
  private moneyRPP; //ทุน
  private moneyRSP; //ทุน
  private usualRPP; //เบี้ย
  private usualRSP; //เบี้ย
  private usualTOP; //เบี้ย
  private usualRIDER; //เบี้ย
  private yEndown = 0;
  private mEndown = 0;
  private ySeek = 0;
  private data = null ;
  private tmpBN;
  private tmpCRPP; 
  private tmpCRSP;
  private tmpAFRPP; 
  private tmpAFRSP;
  private tmpCIRPP;
  private tmpCIRSP;
  private tmpCTOP;
  private tmpAFTOP;
  private  tmpCIRIDER;


  private SUMRPP = new Array(); 
  private SUMRSP = new Array(); 
  private PREMRPP = new Array(); 
  private PREMRSP = new Array(); 
  private PREMTOPUP = new Array(); 
  private PREMRIDER = new Array(); 
  private RATE = new Array(); 
  private WITHDRAW = new Array(); 
  private datatable = null ;
  //Charge ratio, array [0] for RPP [1] for RSP
  private chargeRatio : number[][] = [[0.6, 0.4, 0.2, 0.1, 0.1, 0.05, 0 ], [0.1, 0.08, 0.06, 0.02, 0.005, 0.005, 0.005 ]];
  //TMO Table with array[0] for Male array[1] for Female, eachline has 10 age range starting from 0 to till 99 
  // private TMOTable : number[][] = [[1.05,0.93,0.83,0.74,0.67,0.6,0.56,0.53,0.52,0.53,
  //         0.58,0.65,0.76,0.9,1.07,1.26,1.46,1.66,1.85,2.01,
  //         2.28,2.39,2.46,2.51,2.53,2.55,2.55,2.55,2.55,2.57,
  //         2.59,2.62,2.67,2.73,2.81,2.9,3.02,3.16,3.31,3.49,
  //         3.69,3.87,4.12,4.38,4.67,4.99,5.1,5.46,5.87,6.31,
  //         6.81,7.36,7.98,8.67,9.45,10.32,11.3,12.4,13.64,15.03,
  //         16.61,18.39,20.37,22.57,24.97,27.56,30.33,33.26,36.36,39.63,
  //         43.13,46.92,51.08,55.69,60.83,66.56,72.89,79.75,87,94.44,
  //         101.81,108.91,115.68,122.25,128.98,136.44,145.33,156.27,169.74,185.9,
  //         204.57,225.23,247.21,269.8,292.39,314.57,336.16,357.22,378,1000], 
  //         [1.03,0.91,0.81,0.71,0.63,0.57,0.52,0.49,0.47,0.46, 
  //         0.47,0.48,0.51,0.54,0.57,0.6,0.63,0.66,0.69,0.71,
  //         0.77,0.79,0.81,0.82,0.84,0.85,0.86,0.88,0.9,0.92,
  //         0.95,0.99,1.03,1.08,1.14,1.19,1.25,1.32,1.38,1.45,
  //         1.52,1.54,1.63,1.72,1.83,1.96,2.1,2.27,2.47,2.7,
  //         2.98,3.32,3.72,4.18,4.72,5.34,6.05,6.83,7.71,8.69,
  //         9.76,10.96,12.29,13.78,15.46,17.35,19.49,21.88,24.53,27.44,
  //         30.57,33.89,37.36,40.93,44.55,48.24,52.01,55.94,60.18,64.9,
  //         70.32,76.64,84.1,92.87,103.07,114.78,128.01,142.66,158.59,175.55,
  //         193.01,210.4,227.46,244.42,261.82,280.76,302.15,326.81,354.72,1000]];

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
  private AVNumber = "0";
  
  constructor(public func : UnitlinkUtility){

  }
  public preload(
    test: number[][],
    testage,
    testsex,
    testmode,
    testageEndown,
    testTax,
    testEm,
    testEp,
    testEpYear,
  ) : string[][] {
    this.datatest(test,
      testage,
      testsex,
      testmode,
      testageEndown,
      testTax,
      testEm,
      testEp,
      testEpYear,
      0
    );
    return this.datatable;
    /*preset(function(){
          if (a == '99')
          {
            chkHave('benefit99').style.display = ""; 
            setHeadTable('benefit99');
            setRowTable('benefit99',yEndown);
          }	
          else if (a == 'ex')
          {
            chkHave('benefitexam').style.display = ""; 
            setHeadTable('benefitexam');
            setRowTable('benefitexam',yEndown);
          }
    });*/
    
  }	
  private datatest(
    test: number[][],
    testage : number,
    testsex,
    testmode,
    testageEndown,
    testTax,
    testEm : number,
    testEp : number,
    testEpYear : number,
    testSeek : number
  ){
    this.consAge = testage; 
    this.sex = testsex; 
    this.mode = testmode;  // mode pay prem 1:Y 0=M 2=H 4=S 
    this.yEndown = testageEndown; 
    this.yEndown = (this.yEndown-this.consAge)+1;
    this.mEndown = this.yEndown*12;
    console.log('yEndown : '+this.yEndown+' this.mEndown : '+this.mEndown)
    this.ySeek = testSeek;
    this.EM = testEm; 
    this.EP = testEp;
    this.EPYEAR = testEpYear;
    this.Tax = testTax;
    
    let endl = 0;

    for(let i = 0 ; i < this.yEndown  ; i++) 
    {
      this.SUMRPP[i] = test[i][2]; 
      this.SUMRSP[i] = test[i][3]; 
      this.PREMRPP[i] = test[i][4]; 
      this.PREMRSP[i] = test[i][5]; 
      this.PREMTOPUP[i] = test[i][6]; 
      this.PREMRIDER[i] = test[i][7];
      this.WITHDRAW[i] = this.func.Maddnum(test[i][8],0,0);
      this.RATE[i] = test[i][9];	
//console.log( "--------------------WITHDRAW=" + i + " :"+WITHDRAW[i]  );			
      if (i+1 == this.yEndown)
        endl = 1;
    }	
  
    console.log('endl : '+endl)
    if ( endl == 1)
    if(testSeek == 0){
      this.preset('99');
    }else {
      this.preset('get');
    }
  }
  // private resultSeek()
  // {
  //     let show = ySeek - this.consAge;
  //     /*console.log("ySeek:"+ ySeek + " consAge:"+ consAge 
  //         + "     show:"+ show 
  //         + "     AVRPP:"+ data[show][14] 
  //         + "     AVRSP:" +data[show][15] 
  //         + "     AVTOP:" +data[show][22] 
  //         + "     year:" +data[show][0] 
  //         + "     rpp:" +data[show][3]
  //         + "     rcp:" +data[show][5]
  //         + "     age:" +data[show][2]
  //         ) ;*/
      
  //     let rpp = this.data[show][14];  
  //     let rsp = this.data[show][15];
  //     let top = this.data[show][22];
      
  //     let res = this.func.Maddnum(top,Number(this.func.Maddnum(rpp,rsp,2)),2); 
  //     //console.log(" resultSeek == "+res);
  //     // callback( res );
  // }
  private preset(src : string) 
  {

console.log('ex');	
  if(src == '99') {

    this.agentName = "ตัวแทน ชื่อ-สกุล";
    this.consName = "ลูกค้า ประกัน";
    this.sysdate = "08/03/2560";
    this.yearPolicy =  new Array(); // 1
    this.monthPolicy =  new Array(); // 2
    this.agePolicy =  new Array(); // 3
    this.RPP =  new Array(); // 4
    this.RSP =  new Array(); // 5
    this.RCP =  new Array(); // 6
    this.chargeRPP =  new Array(); // 7
    this.chargeRSP =  new Array(); // 8
    this.bonusRPP =  new Array(); // 9
    this.AFRPP =  new Array(); // 10
    this.AFRSP =  new Array(); // 11
    this.COIRPP =  new Array(); // 12
    this.COIRSP =  new Array(); // 13
    this.PF =  new Array(); // 14
    this.AVRPP =  new Array(); // 15
    this.AVRSP =  new Array(); // 16
    this.deathBenefit =  new Array(); // 17
    this.exppRPP =  new Array(); // 18
    this.exppRSP =  new Array(); //19
    this.PREMIUMTOPUP = new Array();//20
    this.AVTOPUP = new Array();//21
    this.CVTOPUP = new Array();//22
    this.AFTOPUP = new Array();//23
    this.EXPENSETOPUP = new Array();//24
    this.REALWITHDRAW = new Array();
    this.REALPREMRIDER = new Array();
    this.COIRIDER = new Array(); 
    this.FEEWD = new Array();
      
    this.calculateController('table');
    this.prepareInput();
    this.tableInput();

  } else if (src == 'get'){
    this.calculateController('get');
    this.prepareInput();
    this.resultSeek();
  }

   

    // /**/calculateController('table',function(){
    //     prepareInput(function(){
    //       tableInput(function(){
    //         if (src == '99')
    //           {
    //             chkHave('benefit99').style.display = ""; 
    //             //setHeadTable('benefit99');
    //             setRowTable('benefit99',yEndown);
    //           }	
    //           else if (src == 'ex')
    //           {
    //             chkHave('benefitexam').style.display = ""; 
    //             setHeadTable('benefitexam');
    //             setRowTable('benefitexam',yEndown);
    //           }
    //       });	
    //     });
    //   });/**/

//     else if (src == 'get')
// 		{
// //console.log('get');
// 			calculateController('get',function(){
// 				prepareInput(function(){
// 					resultSeek(function(output){
// 						callback(output);
// 					});
// 				});
// 			});
// 		}	
  }

  public CalculateAvUA02(
    test: number[][],
    testage,
    testsex,
    testmode,
    testageEndown,
    testTax,
    testEm,
    testEp,
    testEpYear,
    testSeek
  ) : string {
    this.datatest(test,
      testage,
      testsex,
      testmode,
      testageEndown,
      testTax,
      testEm,
      testEp,
      testEpYear,
      testSeek
    );
    return this.AVNumber;
  
    
  }

  private resultSeek()
  {
    try{
      let show = this.ySeek - this.consAge;
      /*console.log("ySeek:"+ ySeek + " consAge:"+ consAge 
          + "     show:"+ show 
          + "     AVRPP:"+ data[show][14] 
          + "     AVRSP:" +data[show][15] 
          + "     AVTOP:" +data[show][22] 
          + "     year:" +data[show][0] 
          + "     rpp:" +data[show][3]
          + "     rcp:" +data[show][5]
          + "     age:" +data[show][2]
          ) ;*/
      
      let rpp = this.data[show][14];  
      let rsp = this.data[show][15];
      let top = this.data[show][22];
      
      let res = this.func.Maddnum(top,Number(this.func.Maddnum(rpp,rsp,2)),2); 
      //console.log(" resultSeek == "+res);
      this.AVNumber = res;
    }
    catch(e){
      console.log(" error  datatest e=" +e);
    }
    
    
  }
  private calculateController(process) 
  {
  //console.log(" calculateController  yEndown=" + yEndown + "mode==" + mode);
    let insertFlag = 0;
    let insertCompareFlag = 0;
    let i;
    let year = 1;
    let month = 1;
    let ccRPP = 0;
    let ccRSP = 0;
    let ccRCP = 0;
    let ccChargeRPP = 0;
    let ccChargeRSP = 0;
    let ccBonusRPP = 0;
    let ccAFRPP = 0;
    let ccAFRSP = 0;
    let ccCOIRPP = 0;
    let ccCOIRSP = 0;
    let ccPF = 0;
    let ccAVRPP = 0;
    let ccAVRSP  = 0;
    let ccDeathBenefit = 0;
    let ccExppRPP = 0;
    let prevAVRPP = 0;
    let prevAVRSP = 0;
    let exAVRPP  = 0;
    let checkFlag = 0;
    let exAVRSP = 0;
    let ratio = 0.01;
    let temp = 0;
    
    let ccPremtopup = 0; 		//1
    let ccExpensetopup = 0; 	//2
    let ccAFtopup = 0;			//3
    let ccAVtopup = 0;			//4
    let ccCVtopup = 0;			//5
    let prevtopup = 0;			//6
    
    let ccRider = 0;
    let ccsumprem = 0;
    let havePremRSP = 0;
    let pRspSubCharge = 0;
    let tmpA=0;
    
    
    let mRPP = 0;
    let mRSP = 0;
    let mTOP = 0;
    let pRPP = 0;
    let pRSP = 0;
    let pTOP = 0;
    let newAV= new Array();
    let ccWithDraw = 0 ;
    let ccCoiRider = 0 ;
    let stopPay = 0;
    
    let lastAVRPP = 0 ;
    let lastAVRSP = 0 ;
    let lastAVtopup = 0 ;
    let chkWihDraw = 0 ; //ถอนแล้วโดน Rpp
    let chkHoliday = 0 ; //
    let ccSumWD = 0;	//ถอนสะสม
    let ccFee = 0;
    let chkZeroFromWD = 0;
  //console.log("process==" + process);		
    console.log('calculateController() ==> this.mEndown '+this.mEndown)
      for(let lc = 0 ; lc <= this.mEndown  ; lc++) 
      { 
  //console.log("for loop lc="+lc + "  mEndown="+mEndown +"  PREMRPP =" +PREMRPP.length);		
        if ( lc == 0 )
        {
          if (this.PREMRSP[temp] > 0)
            havePremRSP = 1; // prem
          else 
            havePremRSP = 0; // prem
        }	
        if ( this.PREMRSP[temp] > 0 )
        {
          havePremRSP = 1; // prem
        }	
          
        if (  month % 12 == 1  )				
        {
  //console.log("for loop lc="+lc + "  mEndown="+mEndown +"  RATE =" +formatInt(RATE[temp]));					
          this.usualRPP = this.PREMRPP[temp]; // prem
          this.usualRSP = this.PREMRSP[temp]; // prem
          this.usualTOP = this.PREMTOPUP[temp]; // prem
          this.usualRIDER = this.PREMRIDER[temp]; // prem
          this.moneyRPP = this.SUMRPP[temp]; // sum
          this.moneyRSP = this.SUMRSP[temp]; // sum
          ratio =  Number(this.RATE[temp]);
          
          if ( this.PREMRPP[temp] == 0 && this.PREMRSP[temp] == 0 && this.PREMTOPUP[temp] == 0 )
            stopPay = 1;
          if ( this.PREMRPP[temp] == 0 )
            chkHoliday = 1;
          temp++;
        }
        
        if(stopPay != 0)
        {
          ccCoiRider = Number(this.func.Mdivide(Number(this.usualRIDER),12,2));
        }
        else
        {
          ccCoiRider = 0;
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
        
        
        //calculate RPP, RSP, RCP, Bonus (1) & (2) & (3) & (6)
        if(this.mode == 1) {
          if(month % 12 == 1){
            ccRPP = this.usualRPP;
            ccRSP = this.usualRSP;
            ccPremtopup = this.usualTOP;
            ccBonusRPP = this.calculateBonusRPP(ccAVRPP, year , this.usualRPP , chkWihDraw);
          }
          else {
            ccRPP = 0;
            ccRSP = 0;
            ccPremtopup = 0;
            ccBonusRPP = 0;
          }	
        }
        else if (this.mode == 2) {
          if(month % 6 == 1){
            ccRPP = this.usualRPP;
            ccRSP = this.usualRSP;
            ccPremtopup = this.usualTOP;
            ccBonusRPP = this.calculateBonusRPP(ccAVRPP, year , this.usualRPP , chkWihDraw);
          }
          else {
            ccRPP = 0;
            ccRSP = 0;
            ccPremtopup = 0;
            ccBonusRPP = 0;
          }
        }
        else if (this.mode == 4) {
          if(month % 3 == 1){
            ccRPP = this.usualRPP;
            ccRSP = this.usualRSP;
            ccPremtopup = this.usualTOP;
            ccBonusRPP = this.calculateBonusRPP(ccAVRPP, year , this.usualRPP , chkWihDraw);
          }
          else {
            ccRPP = 0;
            ccRSP = 0;
            ccPremtopup = 0;
            ccBonusRPP = 0;
          }
        }
        else if (this.mode == 0) {
          ccRPP = this.usualRPP;
          ccRSP = this.usualRSP;
          ccPremtopup = this.usualTOP;
          ccBonusRPP = this.calculateBonusRPP(ccAVRPP, year , this.usualRPP , chkWihDraw);
        }
        //calculate RCP to fill-in (3)
        if(this.mode == 1) {
          if(month % 12 == 1)
            ccRCP =(Number(ccRPP)+Number(ccRSP))+Number(ccRCP);
        }
        else if(this.mode == 2) {
          if(month % 6 == 1)
            ccRCP = (Number(ccRPP)+Number(ccRSP))+Number(ccRCP);
        }
        else if(this.mode == 4) {
          if(month % 3 == 1)
            ccRCP = (Number(ccRPP)+Number(ccRSP))+Number(ccRCP);
        }
        else if(this.mode == 0) {
          ccRCP = (Number(ccRPP)+Number(ccRSP))+Number(ccRCP);
        }

        //insert charge (4) & (5)
        ccChargeRPP = Number(this.calculateChargeRPP(month, this.usualRPP));
        ccChargeRSP = Number(this.calculateChargeRSP(month, this.usualRSP));
        
        
        //calculate AF (7) & (8)
        ccAFRPP = this.calculateAFRPP(year, month, this.usualRPP, ccChargeRPP, lastAVRPP);
        ccAFRSP = this.calculateAFRSP(year, month, this.usualRSP, ccChargeRSP, lastAVRSP , ccRSP);
        
        //calculate COI (9) & (10)

        ccCOIRPP = this.calculateCOIRPP(this.consAge, year, this.sex , this.moneyRPP, this.EP , this.EPYEAR);
        ccCOIRSP = this.calculateCOIRSP(this.consAge, year, month, this.sex, this.EP , this.EPYEAR  , this.moneyRSP , prevAVRSP , ccRSP);
      
        //calculate PF (11)
        ccPF = this.calculatePF();
        
        
        //(21)
        ccExpensetopup = this.calculateChargeTOP(year, month, ccPremtopup);
        //(22)
        ccAFtopup = this.calculateAFTOP(year, month, ccPremtopup , ccExpensetopup , lastAVtopup );

                
        
        //calculate AVRPP & AVRSP  & AVTOP
        
        if (havePremRSP != 0  )
        {	
          tmpA= this.checkCVRSP(ccRSP,ccChargeRSP,prevAVRSP);
          if ( tmpA > 0 )
            pRspSubCharge = Number(this.func.Msubnum(ccRSP, ccChargeRSP,2)); 
          else 
            pRspSubCharge = 0 ;
          
          pRspSubCharge = Number(pRspSubCharge);				
        }
        else 
        {
          pRspSubCharge = 0 ;
          prevAVRSP = 0 ;
        }
        
        ccSumWD +=  Number(this.func.Maddnum(ccWithDraw,0,0));
        
        ccAVRPP = this.calculateAVRPP( year, month , ccRPP, ccBonusRPP , prevAVRPP , ccChargeRPP , ccAFRPP , ccCOIRPP, ccCoiRider  ,  ccPF , ratio  ) ;
        //(23)
        ccAVtopup = this.calculateAVTOP(year, month, ccPremtopup , ccExpensetopup , prevtopup  , ccAFtopup , ratio);
        mRPP = this.calculateMoney(year, month ,'RPP' ,ccRPP, ccBonusRPP , ccRSP , ccPremtopup );
        pRPP = this.payAVRPP(year , month , ccChargeRPP  ,ccAFRPP , ccCOIRPP , ccCoiRider , ccPF );
        mTOP = this.calculateMoney(year, month ,'TOP' ,ccRPP, ccBonusRPP , ccRSP , ccPremtopup );
        pTOP = this.payAVTOP(year , month , ccExpensetopup  , ccAFtopup , prevtopup , ccPremtopup);
        
        if ( havePremRSP != 0)
        {
          ccAVRSP = this.calculateAVRSP( year, month , ccRSP  , prevAVRSP , ccChargeRSP , ccAFRSP, ccCOIRSP, ratio  ) ;
          mRSP = this.calculateMoney(year, month ,'RSP' ,ccRPP, ccBonusRPP , ccRSP , ccPremtopup );
          pRSP = this.payAVRSP(year , month , ccChargeRSP , ccAFRSP, ccCOIRSP ,prevAVRSP , ccRSP );
                          
        }
        else 
        {
          ccAVRSP = 0;
          mRSP = 0;
          pRSP = 0;
        }	
            
        
        /*if (year == 0 )
        {*/
  /*				console.log("-------"+  year + "/" +  month 
              + "--   (1)ccRPP="+ ccRPP
              + "--   (2)ccRSP="+ ccRSP
              + "--   (3)ccRCP="+ ccRCP
              + "--   (4)ccChargeRPP="+ ccChargeRPP
              + "--   (5)ccChargeRSP="+ ccChargeRSP
              + "--   (6)ccBonusRPP="+ ccBonusRPP
              + "--   (7)ccAFRPP="+ ccAFRPP
              + "--   (8)ccAFRSP="+ ccAFRSP
              + "--  moneyRSP=" + moneyRSP
              + "--   (9)ccCOIRPP="+ ccCOIRPP
              + "--   (10)ccCOIRSP="+ ccCOIRSP
                + "--   (11)ccPF="+ ccPF
              + "-- ccAFtopup=" + ccAFtopup
              + "--   havePremRSP=" + havePremRSP
              + "--   usualRSP=" +  usualRSP
              + "--   ccAVtopup=" +  ccAVtopup
              );	*/				
        //}		
        
        
        
  if ( year > 100)	{
    console.log("["+  year + "/" +  month +"]   " 
        + "ccAVRPP="+ ccAVRPP 
        + "  ccAVRSP="+ ccAVRSP 
        + "  ccAVtopup="+ ccAVtopup 
        + "--   (7)ccAFRPP="+ ccAFRPP
        + "--   (8)ccAFRSP="+ ccAFRSP
        + "--   (9)ccCOIRPP="+ ccCOIRPP
        + "--   (10)ccCOIRSP="+ ccCOIRSP
        + "-- ccAFtopup=" + ccAFtopup
        /*+"  mRPP="+ mRPP 
        + "  mRSP="+ mRSP 
        + "  mTOP="+ mTOP 
        +"  pRPP="+ pRPP 
        + "  pRSP="+ pRSP 
        + "  pTOP="+ pTOP 
        + "  ccCoiRider=" +ccCoiRider
        +" prevAVRPP="+ prevAVRPP 
        + " prevAVRSP="+ prevAVRSP 
        + " prevtopup="+ prevtopup*/
        );					
  }		

        
        newAV = this.calculateAV( year , month , mRPP , mRSP , mTOP , ccAVRPP , ccAVRSP ,ccAVtopup, prevAVRPP , prevAVRSP 
            ,  prevtopup  , pRPP , pRSP , pTOP , ratio);
        
        
        if ( havePremRSP != 0)
        {
          ccAVRPP = newAV[0];
          ccAVRSP = newAV[1];	
          ccAVtopup = newAV[2];
        }
        else
        {
          ccAVRPP = newAV[0];
          ccAVRSP = 0;	
          ccAVtopup = newAV[2];
        }	
        
  if ( year > 100)	{
    console.log("AFTER_calculateAV   ["+  year + "/" +  month +"]   " 
        + "ccAVRPP="+ ccAVRPP + "  ccAVRSP="+ ccAVRSP + "  ccAVtopup="+ ccAVtopup 
        /*+"  mRPP="+ mRPP + "  mRSP="+ mRSP + "  mTOP="+ mTOP 
        +"  pRPP="+ pRPP + "  pRSP="+ pRSP + "  pTOP="+ pTOP + "  ccCoiRider=" +ccCoiRider
        +" prevAVRPP="+ prevAVRPP + " prevAVRSP="+ prevAVRSP + " prevtopup="+ prevtopup*/ );					
  }		
      
        
        
        
        if(ccWithDraw > 0)
        {
          /*if ( year > 80)	{
            console.log(" --  withDrawAV -- ["+  year + "/" +  month +"]    " + "ccAVRPP="+ ccAVRPP + "  ccAVRSP="+ ccAVRSP 
                + "  ccAVtopup="+ ccAVtopup + "   ccWithDraw=" +  ccWithDraw
                );					
          }*/
          
          lastAVRPP = ccAVRPP ;
          lastAVRSP = ccAVRSP ;	
          lastAVtopup = ccAVtopup ;
          
          newAV = this.withDrawAV( year , month , ccWithDraw , ccAVRPP , ccAVRSP , ccAVtopup);
          ccAVRPP = newAV[0];
          ccAVRSP = newAV[1];	
          ccAVtopup = newAV[2];
          
          if (lastAVRPP != ccAVRPP )
            chkWihDraw = 1;
          
          if( ccAVRPP < 0 )
          {
            ccWithDraw = Number(this.func.Maddnum(ccWithDraw,ccAVRPP,2));
            ccAVRPP = 0;
            if( ccAVRSP < 0 )
              ccAVRSP = 0;
            if( ccAVtopup < 0 )
              ccAVtopup = 0;
            
            if( ccAVRSP == 0 && ccAVRSP == 0 && ccAVtopup == 0 )
              chkZeroFromWD = 1;
            
          }
          
          ccFee = this.CalculateFEE( year , month , chkWihDraw ,ccWithDraw ,lastAVRPP ,ccAVRPP );
          
        }
        else
        {
          lastAVRPP = ccAVRPP;
          lastAVRSP = ccAVRSP;	
          lastAVtopup = ccAVtopup;
          
          ccFee = this.CalculateFEE( year , month , chkWihDraw ,ccWithDraw ,lastAVRPP ,ccAVRPP );
          
        }	

        
        
        //(14)
        ccDeathBenefit = this.calculateDeathBenefit(month, this.consAge, ccAVRPP , ccAVRSP ,ccAVtopup ,ratio , this.moneyRPP , this.moneyRSP , ccSumWD , chkZeroFromWD);
        //(15)
        ccExppRPP = this.calculateExppRPP(month, ccAVRPP , 0 , ratio);
        //(24)
        ccCVtopup = ccAVtopup;
        
        prevAVRPP = ccAVRPP;
        prevAVRSP = ccAVRSP;	
        prevtopup = ccAVtopup;
        


  if (year > 100  )
  {

    console.log("["+  year + "/" +  month +"]"
        /*+ "-- (1)ccRPP="+ ccRPP
        + "-- (2)ccRSP="+ ccRSP
        + "-- (3)ccRCP="+ ccRCP
        + "-- (4)ccChargeRPP="+ ccChargeRPP
        + "-- (5)ccChargeRSP="+ ccChargeRSP
        + "-- (6)ccBonusRPP="+ ccBonusRPP
        + "-- (7)ccAFRPP="+ ccAFRPP
        + "-- (8)ccAFRSP="+ ccAFRSP
        + "-- (9)ccCOIRPP="+ ccCOIRPP
        + "-- (10)ccCOIRSP="+ ccCOIRSP
        + "-- (11)ccPF="+ ccPF
        + "-- (12)ccAVRPP="+ ccAVRPP
        + "-- (13)ccAVRSP="+ ccAVRSP
        + "-- ccExppRPP="+ ccExppRPP
        + "-- (14)ccDeathBenefit="+ ccDeathBenefit
        + " ---  ccPremtopup=" + ccPremtopup*/
        + " prevtopup="+prevtopup
        /*+ " prevAVRSP="+ prevAVRSP*/
        + " ccExpensetopup="+ ccExpensetopup
        + " ccAFtopup="+ ccAFtopup
        + " ccAVtopup="+ ccAVtopup 
        );
    console.log("---------------------------------------------------------------------------------------------------------------------");
  }	
      

        if (month % 12 == 1)
        {
          this.tmpCRPP = ccChargeRPP; 
          this.tmpCRSP = ccChargeRSP;
          this.tmpBN = 0;
          this.tmpAFRPP = 0;
          this.tmpAFRSP = 0;
          this.tmpCIRPP = 0;
          this.tmpCIRSP = 0;
          this.tmpAFTOP = 0;
          this.tmpCTOP = ccExpensetopup;
          this.tmpCIRIDER = 0;
          
        }
        
  //printlog(year+"/"+month+"  ccAFRSP=="+ ccAFRSP +  " ||   Maddnum(tmpAFRSP,ccAFRSP,2)=="+ Maddnum(tmpAFRSP,ccAFRSP,2)  ,"");
        this.tmpBN = this.func.Maddnum(this.tmpBN,ccBonusRPP,2);
        this.tmpAFRPP = this.func.Maddnum(this.tmpAFRPP,ccAFRPP,2);
        this.tmpAFRSP = this.func.Maddnum(this.tmpAFRSP,ccAFRSP,2);
        this.tmpCIRPP = this.func.Maddnum(this.tmpCIRPP,ccCOIRPP,2);
        this.tmpCIRSP = this.func.Maddnum(this.tmpCIRSP,ccCOIRSP,2);
        this.tmpAFTOP = this.func.Maddnum(this.tmpAFTOP,ccAFtopup,2);
        this.tmpCIRIDER = this.func.Maddnum(this.tmpCIRIDER,ccCoiRider,2);
        
        
        
        if ( month % 12 == 0 )
        {
  /*console.log("month===" + month + "   year=====" + year  
      + "   tmpAFRPP=="+ tmpAFRPP 
      + "   tmpAFRSP=="+ tmpAFRSP
      + "   tmpAFTOP=="+ tmpAFTOP
      
      
      );	*/	
          
          
          this.yearPolicy[year-1] =  year; // 1
          this.monthPolicy[year-1] = "12"; // 2
          this.agePolicy[year-1] =  Number(this.consAge)+Number(year-1); // 3
          this.RPP[year-1] = this.premInput('RPP',year); // 4
          this.RSP[year-1] = this.premInput('RSP',year); // 5
          this.RCP[year-1] = this.premInput('RCP',year); // 6
          this.chargeRPP[year-1] =  this.ChargeInput('RPP',year,this.tmpCRPP); // 7		ทบมา
          this.chargeRSP[year-1] =  this.ChargeInput('RSP',year,this.tmpCRSP); // 8		 ทบมา
          this.bonusRPP[year-1] =  this.tmpBN; // 9			 ทบมา
          this.AFRPP[year-1] =  this.tmpAFRPP; // 10		 ทบมา
          this.AFRSP[year-1] =  this.tmpAFRSP; // 11		ทบมา  	
          this.COIRPP[year-1] =  this.tmpCIRPP; // 12		ทบมา
          this.COIRSP[year-1] =  this.tmpCIRSP; // 13		ทบมา
          this.PF[year-1] =  ccPF; // 14
          this.AVRPP[year-1] =  this.func.Maddnum(ccAVRPP,0,2) ; // 15
          this.AVRSP[year-1] =  this.func.Maddnum(ccAVRSP,0,2) ; // 16
          this.deathBenefit[year-1] =  this.func.Maddnum(ccDeathBenefit,0,2) ; // 17
          this.exppRPP[year-1] =  this.func.Maddnum(ccExppRPP,0,2); // 18
          this.exppRSP[year-1] = this.func.Maddnum(ccAVRSP,0,2) ; //19
          this.PREMIUMTOPUP[year-1] =  this.premInput('TOP',year) ; // 20
          this.EXPENSETOPUP[year-1] = this.ChargeInput('TOP',year,this.tmpCTOP); //21      ทบมา
          this.AFTOPUP[year-1] = this.tmpAFTOP ; //22        ทบมา
          this.AVTOPUP[year-1] = this.func.Maddnum(ccAVtopup,0,2) ; //23
          this.CVTOPUP[year-1] = this.func.Maddnum(ccAVtopup,0,2) ; //24
          this.REALWITHDRAW[year-1] = ccWithDraw;
          this.FEEWD[year-1] = ccFee;
          if(stopPay != 0)
            this.REALPREMRIDER[year-1] = 0;
          else
            this.REALPREMRIDER[year-1] = this.PREMRIDER [year-1];
          this.COIRIDER[year-1] = this.tmpCIRIDER; 
        }	
        
  //console.log("year  ==" +year + " month ==" +month);
        month++;
        if ( month % 12 == 1)
        {
          year++;
        }
        
        if (year == (this.yEndown+1))
        {
  //console.log("------------------ calculateController  callback    yEndown=" + yEndown);
          // callback();
          break;
        }
        
        
        if ( ccAVRPP <= 0 && ccAVRSP <= 0 && ccAVtopup <= 0 &&  year > 5)
        {
          this.stopFlag = year-1;
  //console.log("------------------ calculateController  callback    year=" + year + "   stopFlag=" + stopFlag +  " ccAVRPP==" +ccAVRPP +  " ccAVRSP==" + ccAVRSP +  " ccAVtopup==" +  ccAVtopup);				
          // callback();
          break;
        }
        else if (ccAVRPP <= 0 && ccAVRSP <= 0 && ccAVtopup <= 0 && chkWihDraw == 1 )
        {
          this.stopFlag = year-1;
  //console.log("------------------ calculateController  callback    year=" + year + "   stopFlag=" + stopFlag +  " ccAVRPP==" +ccAVRPP +  " ccAVRSP==" + ccAVRSP +  " ccAVtopup==" +  ccAVtopup);				
          // callback();
          break;
        }	
        else if (ccAVRPP <= 0 && ccAVRSP <= 0 && ccAVtopup <= 0 &&  chkHoliday == 1)
        {
          this.stopFlag = year-1;
  //console.log("------------------ calculateController  callback    year=" + year + "   stopFlag=" + stopFlag +  " ccAVRPP==" +ccAVRPP +  " ccAVRSP==" + ccAVRSP +  " ccAVtopup==" +  ccAVtopup);				
          // callback();
          break;
        }
        else
        {
          this.stopFlag = 0;
  //console.log("------------------ calculateController  callback    year=" + year + "   stopFlag=" + stopFlag +  " ccAVRPP==" +ccAVRPP +  " ccAVRSP==" + ccAVRSP +  " ccAVtopup==" +  ccAVtopup);				
          
        }	
          
        
      }
  }
  private withDrawAVUA01(
    year : number, 
    month : number, 
    ccWithDraw : number, 
    ccAVSP : number, 
    ccAVtopup : number
  ) : string[]{

    let newChkAV : string[] = new Array();
    let RSP,TOP : string ,withDrawTOP : number,withDrawSP : number;
    let SP : string;// เพิ่มตัวแปร
    withDrawTOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
    withDrawSP = Number(this.func.Msubnum(ccAVSP , ccWithDraw, 4));

    let casewd = 0;
    if( ccAVtopup > 0 && withDrawTOP > 0)
    {
      TOP = this.func.Msubnum(ccAVtopup , ccWithDraw, 4);
      SP = String(ccAVSP);
  casewd = 1;
    }
    else if (  ccAVtopup > 0 && withDrawTOP < 0 )
    {
      TOP = this.func.Msubnum(ccAVtopup , ccWithDraw, 4);
      SP = String(ccAVSP);
  casewd = 2;
      if (ccAVSP > 0)
      {
        withDrawSP = Number(this.func.Maddnum(ccAVSP , Number(TOP), 4));
        SP = this.func.Maddnum(ccAVSP , Number(TOP), 4);
        if ( withDrawSP > 0)
        {
          TOP = "0";
  casewd = 3;				
        }
        
      }
      
    }
    else if ( ccAVtopup <= 0  && ccAVSP > 0  && withDrawSP > 0)
    {
      TOP = String(ccAVtopup);
      SP = this.func.Msubnum(ccAVSP , ccWithDraw, 4) ;
  casewd = 4;
    }
    else if ( ccAVtopup <= 0 && ccAVSP > 0 && withDrawSP < 0)
    {
      TOP = String(ccAVtopup);
      SP = this.func.Msubnum(ccAVSP , ccWithDraw, 4) ;
  casewd = 5;		
    }
    else if ( ccAVtopup <= 0 && ccAVSP < 0 )
    {
      TOP = String(ccAVtopup);
      SP = this.func.Msubnum(ccAVSP , ccWithDraw, 4) ;
  casewd = 6;		
    }	
    
  if ( year > 100 )	{
  console.log("  casewd=="+ casewd  + " ["+ year + " / "+ month+ "]   SP="+ SP + " TOP=" + TOP 
      + " ccAVtopup="+ ccAVtopup + " ccAVSP=" + ccAVSP  + " withDrawSP=" + withDrawSP);
  }

    
    newChkAV[0] = (SP);
    newChkAV[1] = (TOP);
    
    return newChkAV;
  }
  private CalculateFEE(
    year : number, 
    month : number,
    chkWihDraw : number, 
    ccWithDraw : number,
    lastAVRPP : number,
    ccAVRPP : number
  ) : number {
    if (ccWithDraw == 0)
    {
      return 0;
      
    }
    else
    {
  /*console.log('['+ year +" / " +  month + '] chkWihDraw=' + chkWihDraw + " ccWithDraw=" + ccWithDraw 
      + " lastAVRPP=" +lastAVRPP + " ccAVRPP=" +ccAVRPP );
  */
      if (chkWihDraw != 0 &&  month == 12)
      {
        var resFee1 : number = Number(this.func.Mmultiply(Number(this.func.Msubnum(lastAVRPP,ccAVRPP,4)) , 0.4 ,2));
        return resFee1;
      }	
      else if (chkWihDraw != 0 &&  month == 24)
      {
        var resFee2 : number = Number(this.func.Mmultiply(Number(this.func.Msubnum(lastAVRPP,ccAVRPP,4)) , 0.3 ,2));
        return resFee2;
      }
      else
        return 0;
      
    }
  }
  private withDrawAV(
    year : number,
    month : number, 
    ccWithDraw : number, 
    ccAVRPP : number, 
    ccAVRSP : number, 
    ccAVtopup : number
  ) : number[]{
    let newChkAV : number[] = new Array();
    let RPP : number,RSP : number ,TOP : number ,withDrawTOP : number ,withDrawRSP : number,withDrawRPP : number;
    withDrawTOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
    withDrawRSP = Number(this.func.Msubnum(ccAVRSP , ccWithDraw, 4));
    withDrawRPP = Number(this.func.Msubnum(ccAVRPP , ccWithDraw, 4));
    let casewd : number = 0;
    if( ccAVtopup > 0 && withDrawTOP > 0)
    {
      TOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
      RSP = ccAVRSP ;
      RPP = ccAVRPP ;
  casewd = 1;
    }
    else if (  ccAVtopup > 0 && withDrawTOP < 0 )
    {
      TOP = Number(this.func.Msubnum(ccAVtopup , ccWithDraw, 4));
      RSP = ccAVRSP ;
      RPP = ccAVRPP ;
  casewd = 2;
      if (ccAVRSP > 0)
      {
        withDrawRSP = Number(this.func.Maddnum(ccAVRSP , TOP, 4));
        RSP = Number(this.func.Maddnum(ccAVRSP , TOP, 4));
        if ( withDrawRSP > 0)
        {
          TOP = 0;
  casewd = 3;				
        }
        else 
        {
          withDrawRPP = Number(this.func.Maddnum(ccAVRPP , RSP, 4));
          RPP = Number(this.func.Maddnum(ccAVRPP , RSP, 4));
  casewd = 4;			
          if ( withDrawRPP > 0 )
          {
            TOP = 0;
            RSP = 0;
  casewd = 5;
          }
        }	
      }
      else if (ccAVRPP > 0)
      {
        withDrawRPP = Number(this.func.Maddnum(ccAVRPP , TOP, 4));
        RPP = Number(this.func.Maddnum(ccAVRPP , TOP, 4));
  casewd = 6;			
        if ( withDrawRPP > 0 )
        {
          TOP = 0;
  casewd = 7;
        }
      }
    }
    else if ( ccAVtopup <= 0 && ccAVRSP > 0  && withDrawRSP > 0)
    {
      TOP = ccAVtopup;
      RSP = Number(this.func.Msubnum(ccAVRSP , ccWithDraw, 4));
      RPP = ccAVRPP ;
  casewd = 8;
    }
    else if ( ccAVtopup <= 0 && ccAVRSP > 0  && withDrawRSP < 0)
    {
      TOP = ccAVtopup;
      RSP = Number(this.func.Msubnum(ccAVRSP , ccWithDraw, 4));
      RPP = ccAVRPP ;
  casewd = 9;
  
  
      if (ccAVRPP > 0)
      {
  
        withDrawRPP = Number(this.func.Maddnum(ccAVRPP , RSP, 4));
        RPP = Number(this.func.Maddnum(ccAVRPP , RSP, 4));
  casewd = 10;
        if ( withDrawRPP > 0 )
        {
          RSP = 0;
  casewd = 11;
  
        }	
      }
          
    }
    else if ( ccAVtopup <= 0 && ccAVRSP <= 0  && ccAVRPP > 0  && withDrawRPP > 0)
    {
      TOP = ccAVtopup;
      RSP = ccAVRSP ;
      RPP = Number(this.func.Msubnum(ccAVRPP , ccWithDraw, 4));
  casewd = 12;
    }
    else if ( ccAVtopup <= 0 && ccAVRSP <= 0  && ccAVRPP > 0 && withDrawRPP < 0)
    {
      TOP = ccAVtopup;
      RSP = ccAVRSP ;
      RPP = Number(this.func.Msubnum(ccAVRPP , ccWithDraw, 4));
  casewd = 13;		
    }
    
    if(year > 100 )
  console.log("  casewd=="+ casewd +" [ " + year +" / " + month +" ] " + " RPP=" + RPP +" RSP="+ RSP + " TOP=" + TOP  );
    
    newChkAV[0] = (RPP);
    newChkAV[1] = (RSP);
    newChkAV[2] = (TOP);
    
    return newChkAV;
  }
  private calculateMoney(
    year : number, 
    month : number,
    type : string,
    ccRPP : number, 
    ccBonusRPP : number, 
    ccRSP : number, 
    ccPremtopup : number
  ){
    var mn = 0;
    if( type == 'RPP')
    {
      mn = Number(this.func.Maddnum(ccRPP,ccBonusRPP,2));
    }
    else if( type == 'RSP')
    {
      mn = ccRSP;
    }
    else if( type == 'TOP')
    {
      mn = ccPremtopup;
    }
    return mn;
  }
  private payAVRPP(
    year : number, 
    month : number, 
    ccChargeRPP : number,
    ccAFRPP : number, 
    ccCOIRPP : number,
    ccCoiRider : number, 
    ccPF : number
  ) : number {
    return Number(this.func.Maddnum(Number(this.func.Maddnum(Number(this.func.Maddnum(Number(this.func.Maddnum(ccChargeRPP, ccAFRPP,4)),ccCOIRPP,4)),ccCoiRider,4)),ccPF,4));
  }
  private payAVRSP(
    year : number, 
    month : number, 
    ccChargeRSP : number, 
    ccAFRSP : number, 
    ccCOIRSP : number,
    prevAVRSP : number, 
    ccRSP : number
  ) : number {
  //console.log(" Charge= " +  ccChargeRSP + " AF= " +ccAFRSP + " COI= "  + ccCOIRSP);
    if ( prevAVRSP == 0 && ccRSP == 0)
      return 0;
    else	
      return Number(this.func.Maddnum(ccCOIRSP, ccAFRSP,4));
      //return Maddnum(Maddnum(ccChargeRSP, ccAFRSP,4),ccCOIRSP,4);
  }
  private payAVTOP(
    year : number, 
    month : number, 
    ccExpensetopup : number, 
    ccAFtopup : number, 
    prevtopup : number, 
    ccPremtopup : number
  ) : number{
    if ( prevtopup == 0 && ccPremtopup == 0)
      return 0;
    else	
      return Number(this.func.Maddnum(0, ccAFtopup,4));
      //return Maddnum(ccExpensetopup, ccAFtopup,4);
  }
  private calculateAV( 
    year : number, 
    month : number, 
    mRPP : number, 
    mRSP : number, 
    mTOP : number, 
    ccAVRPP : number, 
    ccAVRSP : number,
    ccAVtopup : number, 
    prevAVRPP : number, 
    prevAVRSP : number, 
    prevtopup : number, 
    pRPP : number, 
    pRSP : number, 
    pTOP : number, 
    ratio : number,
  ) : number[] { 
    var newCCAV : number[] = new Array();
    var newRPP : number, newRSP : number, newTOP : number;
    let po : number = (Math.floor( ( Math.pow(1+ratio,1.0/12.0))*10000000)/10000000.0);
    let RppBorrowRSP : number = Number(this.func.Maddnum(ccAVRSP , ccAVRPP, 4));
    let RppBorrowTOP : number = Number(this.func.Maddnum(ccAVtopup ,ccAVRPP , 4));
    let RspBorrowTOP : number = 0;
    let caseAV : number = 0;
    let PrevTOP : number = 0;
    let RppBorrowPrevTOP : number = 0;
    let RspBorrowPrevTOP : number = 0;
    let RppBorrowPrevRSP : number = 0;
    
    if ( prevAVRSP > 0 )
      RppBorrowPrevRSP = Number(this.func.Maddnum(prevAVRSP , ccAVRPP, 4));
    else 
    {
      prevAVRSP = Number(this.func.Maddnum(pRSP , ccAVRSP, 4));
      RppBorrowPrevRSP = Number(this.func.Maddnum(prevAVRSP , ccAVRPP, 4));
    }	
      
    
    
    if (year > 100)
    {
      console.log("-------------------------------boom " + " ccAVRPP=" + ccAVRPP
          + " ccAVRSP=" + ccAVRSP
          + " ccAVtopup=" + ccAVtopup
          + " prevAVRSP=" + prevAVRSP
          + " RppBorrowPrevRSP=" + RppBorrowPrevRSP
          + " pRSP=" +pRSP
          );
    //	-------------------------------boom  ccAVRPP=-11161.2000 ccAVRSP=10974.9500 ccAVtopup=443352.7453 prevAVRSP=12000.0000 RppBorrowPrevRSP=838.8000 pRSP=1025.0500

    }
    
    
    
    /*if (year <= 5)
    {*/
      if (ccAVRPP > 0  && ccAVRSP > 0 )
      {
  caseAV = 1;
        newRPP = Number(this.func.Mmultiply(ccAVRPP,po,4));
        newRSP = Number(this.func.Mmultiply(ccAVRSP,po,4));
        
        if ( ccAVtopup == 0 )
          newTOP = 0;
        else if ( ccAVtopup > 0 )
        {
          newTOP = Number(this.func.Mmultiply(ccAVtopup,po,4));
        }	
        else  
          newTOP = prevtopup;
      }
      else if (ccAVRPP > 0  && ccAVRSP == 0 )
      {
  caseAV = 2;
        newRPP = Number(this.func.Mmultiply(ccAVRPP,po,4));
        newRSP = 0;
        
        if ( ccAVtopup == 0 )
          newTOP = 0;
        else if ( ccAVtopup > 0 )
          newTOP = Number(this.func.Mmultiply(ccAVtopup,po,4));
        else  
          newTOP = prevtopup;
      }
      else if (ccAVRPP > 0  && ccAVRSP < 0   )
      {
      
        newRPP = Number(this.func.Mmultiply(ccAVRPP,po,4));
        
        if ( ccAVtopup == 0 )
        {
  caseAV = 2.1;	
          newTOP = 0;
          newRSP = 0;
        }	
        else if ( ccAVtopup > 0 )
        {
  caseAV = 2.2;					
          RspBorrowTOP =  Number(this.func.Maddnum(ccAVtopup ,ccAVRSP , 4));
          if (RspBorrowTOP > 0)
          {
  caseAV = 2.3;/*		
  console.log("   ccAVtopup " + ccAVtopup);
            newTOP = Maddnum(ccAVtopup ,ccAVRSP , 4) ;
            newTOP = Mmultiply(newTOP,po,4);
  console.log("   newTOP " + newTOP);					
            newRSP = 0;*/
            
          }
          else
          {
  caseAV = 2.4;					
            newRSP = Number(this.func.Maddnum(prevtopup ,ccAVRSP , 4));
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
          }	
        }
        else  
        {
  caseAV = 2.5;
          newTOP = 0;
          newRSP = 0;
        }
      }
      
      else if (ccAVRPP < 0  && ccAVRSP == 0 )
      {
  //console.log(" -----------------    caseAV===3       --------------------");
        if (ccAVtopup  == 0)
        {
  caseAV = 3.1;
          newRPP = ccAVRPP;
          newRSP = 0;
          newTOP = 0;
          
        }	
        else if (ccAVtopup > 0 && RppBorrowTOP > 0)
        {
  caseAV = 3.2;			
          newRPP = 0;
          newRSP = 0;
          newTOP = Number(this.func.Maddnum(ccAVtopup , ccAVRPP, 4));
          newTOP = Number(this.func.Mmultiply(newTOP,po,4));
        }
        else if (ccAVtopup < 0 &&  prevtopup > 0 )
        {
  caseAV = 3.3;				
          newRPP = Number(this.func.Maddnum(prevtopup , ccAVRPP, 4));
          newRSP = 0;
          newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
        }
        else if (ccAVtopup < 0 && prevtopup < 0)
        {
  caseAV = 3.4;				
          newRPP = ccAVRPP;
          newRSP = 0;
          newTOP = prevtopup;
        }
        else if (ccAVtopup > 0 &&  prevtopup > 0 )
        {
  caseAV = 3.5;				
          newRPP = Number(this.func.Maddnum(prevtopup , ccAVRPP, 4));
          newRSP = 0;
          newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
        }
        
      }
      else if( ccAVRPP < 0 && ccAVRSP > 0  && RppBorrowRSP > 0 )
      {
  caseAV = 4;	
  //console.log(" -----------------    caseAV===4       --------------------");
          newRPP = 0;
          newRSP = Number(this.func.Maddnum(ccAVRSP , ccAVRPP, 4));
          newRSP = Number(this.func.Mmultiply(newRSP,po,4));
          
          if ( ccAVtopup == 0 )
            newTOP = 0;
          else if ( ccAVtopup > 0 )
            newTOP = Number(this.func.Mmultiply(ccAVtopup,po,4));
          else  
            newTOP = prevtopup;
      }	
      else if ( ccAVRPP < 0  && ccAVRSP > 0  && RppBorrowRSP < 0 && RppBorrowPrevRSP  < 0   )
      {
  //console.log(" -----------------    caseAV===5       --------------------" +ccAVRPP +"/"+ ccAVRSP +"/"+ RppBorrowRSP +"/"+ RppBorrowPrevRSP);			
        if ( ccAVtopup == 0 )
        {
          if ( prevAVRSP > 0)
          {
  caseAV = 5.1;		
            newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));
            newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4));
            newTOP = 0;
          }
          else if ( prevAVRSP < 0)
          {
  caseAV = 5.2;		
            newRPP = ccAVRPP;
            newRSP = prevAVRSP;
            newTOP = 0;
          }
          
        }
        else if ( ccAVtopup > 0 )
        {				
        
          newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));
          newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4));
  //console.log("555 newRPP== " + newRPP + "   newRSP== " + newRSP  + "    prevAVRSP==" +prevAVRSP + " AVRSP==" + ccAVRSP);	
          RppBorrowTOP = Number(this.func.Maddnum(ccAVtopup ,newRPP , 4));
          if ( newRPP < 0 && RppBorrowTOP > 0 )
          {	
            newTOP = Number(this.func.Maddnum(ccAVtopup ,newRPP , 4));
            newRPP = 0;
            
            RspBorrowTOP =  Number(this.func.Maddnum(newTOP ,newRSP , 4));
            if (RspBorrowTOP > 0)
            {
  caseAV = 5.3;	

              newTOP =  Number(this.func.Maddnum(newTOP ,newRSP , 4));
              newTOP = Number(this.func.Mmultiply(newTOP,po,4));
              newRSP = 0;
            }	
            else 
            {
              PrevTOP = Number(this.func.Maddnum(newTOP ,pTOP , 4));
              RspBorrowPrevTOP = Number(this.func.Maddnum(PrevTOP ,newRSP , 4));
              
              if (RspBorrowPrevTOP > 0)
              {
  caseAV = 5.4;							
                newRSP = 0;
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }
              else
              {
  caseAV = 5.5;								
                newRSP = Number(this.func.Maddnum(PrevTOP ,newRSP , 4));
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }	
            }	
            
          }
          else if ( newRPP < 0 && RppBorrowTOP < 0)
          {
            PrevTOP = Number(this.func.Maddnum(ccAVtopup ,pTOP , 4));
            RppBorrowPrevTOP = Number(this.func.Maddnum(PrevTOP ,newRPP , 4));
            
            if (RppBorrowPrevTOP > 0)
            {
  caseAV = 5.6;							
              newRPP = 0;
              newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
            }
            else 
            {
              if( prevtopup > 0)
              {	
  caseAV = 5.7;								
                newRPP = Number(this.func.Maddnum(prevtopup , newRPP , 4));
                newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4));
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }	
              else 
              {	
  caseAV = 5.8;								
                newRPP = Number(this.func.Maddnum(ccAVtopup , newRPP , 4));
                newRSP = newRSP;
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }
            }		
          }	
          
        }	
      }
      else if ( ccAVRPP < 0  && prevAVRSP < 0 && ccAVRSP < 0 )
      {
  //console.log(" -----------------    caseAV===6       --------------------");			
        if ( ccAVtopup == 0 )
        {
  caseAV = 6.1;	
          newRPP = ccAVRPP;
          newRSP = prevAVRSP;
          newTOP = 0;
          
        }
        else if ( ccAVtopup > 0 )
        {
          RppBorrowTOP = Number(this.func.Maddnum(ccAVtopup ,ccAVRPP , 4));
          PrevTOP = Number(this.func.Maddnum(newTOP ,pTOP , 4));
          RppBorrowPrevTOP = Number(this.func.Maddnum(PrevTOP ,newRPP , 4));
          
          if ( RppBorrowTOP > 0 )
          {
            newRPP = 0;
            newTOP = Number(this.func.Maddnum(ccAVtopup ,ccAVRPP , 4));
            
            RspBorrowTOP =  Number(this.func.Maddnum(newTOP ,newRSP , 4));
            if (RspBorrowTOP > 0)
            {
  caseAV = 6.2;	
              newTOP = Number(this.func.Maddnum(newTOP ,newRSP , 4));
              newTOP = Number(this.func.Mmultiply(newTOP,po,4));
              newRSP = 0;
            }	
            else 
            {
              PrevTOP = Number(this.func.Maddnum(newTOP ,pTOP , 4));
              RspBorrowPrevTOP = Number(this.func.Maddnum(PrevTOP ,newRSP , 4));
              
              if (RspBorrowPrevTOP > 0)
              {
  caseAV = 6.3;							
                newRSP = 0;
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }
              else
              {
  caseAV = 6.4;								
                newRSP = Number(this.func.Maddnum(PrevTOP ,newRSP , 4));
                newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
              }	
            }	
                      
          }
          else if ( RppBorrowPrevTOP > 0)
          {
  caseAV = 6.5;					
            newRPP = 0;
            newRSP = prevAVRSP;
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
            
          }
          else
          {
  caseAV = 6.6;						
            newRPP = Number(this.func.Maddnum(ccAVtopup ,ccAVRPP , 4)); 
            newRSP = prevAVRSP;
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
          }	
        }
        else // top -
        {
  caseAV = 6.7;				
          newRPP = ccAVRPP ;
          newRSP = prevAVRSP;
          newTOP = prevtopup;
        }	
        
      }
      else if ( ccAVRPP < 0  && ccAVRSP < 0  && prevAVRSP > 0 )
      {
  //console.log(" -----------------    caseAV===7       --------------------");			

        if (ccAVtopup == 0 )
        {
  caseAV = 7.1;	
          newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));
          newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4));
          newTOP = 0;
        }	
        else if ( ccAVtopup > 0 )
        {
  caseAV = 7.2;
          newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));     // + Rsp (t-1)
          newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4)); 			  // ค่าใช้จ่าย 
          newRSP = Number(this.func.Maddnum(newRSP ,newRPP , 4));		  // เงินที่ไปช่วยเเเล้วเหลือมา มาจัดการค่าใช้จ่ายก่อน	
          
          RspBorrowTOP =  Number(this.func.Maddnum(ccAVtopup ,newRSP , 4));
          RspBorrowPrevTOP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
          
          if (RspBorrowTOP > 0)
          {
  caseAV = 7.3;	

            newRPP = 0;
            newTOP = Number(this.func.Maddnum(ccAVtopup ,newRSP , 4));
            
            newRSP = 0;
            newTOP = Number(this.func.Mmultiply(newTOP,po,4));
          }	
          else if (RspBorrowPrevTOP > 0)
          {
  caseAV = 7.4;	
            newRPP = 0;
            newRSP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));		 	   // ค่าใช้จ่าย 
            newTOP = Number(this.func.Maddnum(newRSP ,newTOP , 4));		  // เงินที่ไปช่วยเเเล้วเหลือมา มาจัดการค่าใช้จ่ายก่อน	
            newRSP = 0;
          }	
          else 
          {
  caseAV = 7.5;	
            newRPP = 0;
            newRSP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
                      
          }
        }	
        
      }
      else if ( ccAVRPP < 0  && ccAVRSP > 0  && RppBorrowPrevRSP > 0 )
      {
  //console.log(" -----------------    caseAV===8       --------------------");			
        if (ccAVtopup == 0 )
        {
  caseAV = 8.1;				
          newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));
          newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4));
          newTOP = 0;
        }	
        else if ( ccAVtopup > 0 )
        {
  caseAV = 8.2;
          newRPP = Number(this.func.Maddnum(prevAVRSP ,ccAVRPP , 4));     // + Rsp (t-1)
          newRSP = Number(this.func.Mmultiply(-1 ,pRSP , 4)); 			  // ค่าใช้จ่าย 
          newRSP = Number(this.func.Maddnum(newRSP ,newRPP , 4));		  // เงินที่ไปช่วยเเเล้วเหลือมา มาจัดการค่าใช้จ่ายก่อน	
          
          RspBorrowTOP =  Number(this.func.Maddnum(ccAVtopup ,newRSP , 4));
          RspBorrowPrevTOP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
          
          if (RspBorrowTOP > 0)
          {
  caseAV = 8.3;	

            newRPP = 0;
            newTOP = Number(this.func.Maddnum(ccAVtopup ,newRSP , 4));
  //console.log("newRSP = "+ newRSP + "  newTOP = "+ newTOP);				
            
            newRSP = 0;
            newTOP = Number(this.func.Mmultiply(newTOP,po,4));
          }	
          else if (RspBorrowPrevTOP > 0)
          {
  caseAV = 8.4;	
            newRPP = 0;
            newRSP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));		 	   // ค่าใช้จ่าย 
            newTOP = Number(this.func.Maddnum(newRSP ,newTOP , 4));		  // เงินที่ไปช่วยเเเล้วเหลือมา มาจัดการค่าใช้จ่ายก่อน	
            newRSP = 0;
          }	
          else 
          {
  caseAV = 8.5;	
            newRPP = 0;
            newRSP = Number(this.func.Maddnum(prevtopup ,newRSP , 4));
            newTOP = Number(this.func.Mmultiply(-1 ,pTOP , 4));
            
                      
          }
          
          
        }
        
      }
      else
      {
  //console.log(" -----------------    caseAV===else       --------------------");
  caseAV = 9;


        newRPP = ccAVRPP ;
        newRSP = prevAVRSP;
        newTOP = prevtopup;
      }

      /*
      newCCAV[0] = newRPP;
      newCCAV[1] = newRSP;
      newCCAV[2] = newTOP;*/
      
      newCCAV[0] = (newRPP);
      newCCAV[1] = (newRSP);
      newCCAV[2] = (newTOP);
    

    if ( year > 100 )	{
      console.log("["+  year + "/" +  month +"]     caseAV==["+ caseAV + "]   ccAVRPP="+ newCCAV[0] 
    + "  ccAVRSP="+ newCCAV[1] + "  ccAVtopup="+ newCCAV[2] 
    + "  po==" + po	);	
    }
    
    return newCCAV;
  }
  private calculateAVRPP ( 
    year : number, 
    month : number, 
    ccRPP : number, 
    ccBonusRPP : number, 
    prevAVRPP : number, 
    ccChargeRPP : number, 
    ccAFRPP : number, 
    ccCOIRPP : number, 
    ccCoiRider : number,  
    ccPF : number, 
    ratio
  ) : number {
    let d12 : number = 0;
    let pay : number = 0;
    let money : number = 0;
    
    pay = Number(this.func.Maddnum(Number(this.func.Maddnum(Number(this.func.Maddnum(Number(this.func.Maddnum(ccChargeRPP,ccAFRPP,4)),ccCOIRPP,4)),ccCoiRider,4)),ccPF,4));
    
    if(year == 1 && month == 1)
    {
      money = ccRPP;
      d12 = Number(this.func.Msubnum(money,pay,4));
    }
    else 
    {
      money = Number(this.func.Maddnum(Number(this.func.Maddnum(ccRPP,prevAVRPP,4)),ccBonusRPP,4));
      d12 = Number(this.func.Msubnum(money,pay,4));
    }
  
  /*
   console.log("------- calculateAVRPP ------- year="+ year + " month=" + month + " ccRPP="+ ccRPP+ " ccBonusRPP=" +ccBonusRPP+ " prevAVRPP ="+ prevAVRPP 
  + " ccChargeRPP=" +  ccChargeRPP + " ccAFRPP="+ccAFRPP + " ccCOIRPP=" + ccCOIRPP  + " ccPF=" + ccPF + " ratio=" + ratio + "   d12=" +d12);
   */
    return d12;
  }
  private calculateAVRSP ( 
    year : number,
    month : number , 
    ccRSP : number , 
    prevAVRSP : number , 
    ccChargeRSP : number , 
    ccAFRSP : number , 
    ccCOIRSP : number , 
    ratio
  ) : number {
    let d13 : number = 0;
    let pay : number = 0;
    let money : number = 0;
    
    pay = Number(this.func.Maddnum(Number(this.func.Maddnum(ccChargeRSP,ccAFRSP,4)),ccCOIRSP,4));
    
    if(year == 1 && month == 1)
    {
      money = ccRSP;
      d13 = Number(this.func.Msubnum(money,pay,4));
    }
    else if ( prevAVRSP == 0 &&  ccRSP == 0)
    {
      d13 = 0;
    }	
    else 
    {
      money = Number(this.func.Maddnum(ccRSP,prevAVRSP,4));
      d13 = Number(this.func.Msubnum(money,pay,4));
    }
  
  /*console.log("------- calculateAVRSP ------- year="+ year + " month=" + month + " ccRSP="+ ccRSP+ " prevAVRSP ="+ prevAVRSP 
  + " ccChargeRSP=" +  ccChargeRSP + " ccAFRSP="+ccAFRSP + " ccCOIRSP=" + ccCOIRSP  + " ratio=" + ratio + "   d13=" +d13);
  */
  
    return d13;
  }
  private calculateAVTOP(
    year : number , 
    month : number , 
    premTOP : number , 
    Expensetopup : number , 
    prevtopup : number , 
    AFtopup : number , 
    ratio
  ){
    let res : number = 0;
    let pay : number = 0;
    let money : number = 0;
    
    pay = Number(this.func.Maddnum(AFtopup, Expensetopup,4));  
    
    if(year == 1 && month == 1)
    {
      money = premTOP;
      res = Number(this.func.Msubnum(money,pay,4));
    }
    else 
    {
      money = Number(this.func.Maddnum(premTOP,prevtopup,4));
      res = Number(this.func.Msubnum(money,pay,4));
        
    }
  if(year > 100)	
  console.log("------- calculateAVTOP ------- year="+ year + " month=" + month +" premTOP=" + premTOP 
  +"  Expensetopup=" + Expensetopup +"  prevtopup=" + prevtopup +"  AFtopup=" + AFtopup +"  res=" +res);

    return  res;
  }
  private checkCVRSP(prem : number,  cost : number,  oldrsp : number
  ) : number {
    return Number(this.func.Maddnum(Number(this.func.Msubnum(prem, cost, 4)), oldrsp, 4));
  }

  private checkEnd(month : number, cvRPP : number, cvRSP : number, expenses : number
  ) : string {

    if (month < 60 && this.usualRSP==0 ) 
    {	
        return "1"; 
    }	
    else  if(month < 60 && this.usualRSP!=0)
    {
        return "1"; 		
    }	
    else if ( month >= 60  && this.usualRSP==0) 
    {
      if (cvRPP < 0  )
        return "0"; 
      else 
        return "1"; 
    }
    else  
    {
      if (cvRSP < 0   )
        return "0"; 
      else if (cvRSP == 0  && expenses < 0 )
        return "0"; 
      else 
        return "1"; 
    }
  }
  // 1 2 3
  private premInput(type : string, year : number
  ) : number {
    var mul : number;
    if ( this.mode == 0)
      mul = 12;
    else if ( this.mode == 2)
      mul = 2;
    else if ( this.mode == 4)
      mul = 4;
    else 
      mul = 1;
    if(type == 'RPP')
    {
      return Number(this.func.Mmultiply(Number(this.usualRPP),mul,2));
    }
    else if(type == 'RSP')	
    {
      return Number(this.func.Mmultiply(Number(this.usualRSP),mul,2));
    }	
    else if(type == 'TOP')	
    {
      return Number(this.func.Mmultiply(Number(this.usualTOP),mul,2));
    }
    else if(type == 'RCP')
    {
      return Number(this.func.Mmultiply( Number(this.func.Maddnum( Number(this.func.Mmultiply(Number(this.usualRSP),mul,2)) ,  Number(this.func.Mmultiply(Number(this.usualRSP),mul,2)) , 2 )) , year , 2));
    
    }	
      
  }
  // 4 5
  private ChargeInput(type : string, 
    year : number, 
    tmpc : number
  ) : number {
    let mul : number ;
    if ( this.mode == 0)
      mul = 12;
    else if ( this.mode == 2)
      mul = 2;
    else if ( this.mode == 4)
      mul = 4;
    else 
      mul = 1;
    if(type == 'RPP')
    {
      return Number(this.func.Mmultiply(Number(tmpc),mul,2));
      
    }
    else if(type == 'RSP')	
    {
      return Number(this.func.Mmultiply(Number(tmpc),mul,2));
    }	
    else if(type == 'TOP')	
    {
      return Number(this.func.Mmultiply(Number(tmpc),mul,2));
    }
  }
  //4
  private calculateChargeRPP(tmpPayCount : number,  tmpRPP) : string
  {
  //console.log("--------   tmpPayCount=="+ tmpPayCount + "      tmpRPP ==" +tmpRPP + " tmpPayCount % 3=="+ tmpPayCount % 3 + "   (tmpPayCount/3) + 1==" + ((tmpPayCount/3) + 1 ));		
    
    //check for yearly payment
    if(this.mode == 1){
      if(tmpPayCount % 12 == 1)
        tmpPayCount = Math.floor(tmpPayCount/12) + 1;
      else
        return "0";

      if(tmpPayCount == 1)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][0],2);
      else if(tmpPayCount == 2)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][1],2);
      else if(tmpPayCount == 3)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][2],2); 
      else if(tmpPayCount == 4)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][3],2);  
      else if(tmpPayCount == 5)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][4],2);  
      else if(tmpPayCount == 6)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][5],2);  
      else if(tmpPayCount >= 7)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][6],2);  
    }
    //check for half-year payment
    if(this.mode == 2){
      if(tmpPayCount % 6 == 1)
        tmpPayCount = Math.floor(tmpPayCount/6) + 1;
      else
        return "0";

      if(tmpPayCount <= 2)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][0],2);
      else if(tmpPayCount <= 4)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][1],2);
      else if(tmpPayCount <= 6)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][2],2);
      else if(tmpPayCount <= 8)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][3],2);
      else if(tmpPayCount <= 10)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][4],2);
      else if(tmpPayCount <=12)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][5],2);
      else if(tmpPayCount >= 13)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][6],2);
      }
    //check for quarter payment
    if(this.mode == 4){
      if(tmpPayCount % 3 == 1)
        tmpPayCount = Math.floor(tmpPayCount/3) + 1;
      else
        return "0";	

      if(tmpPayCount <= 4)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][0],2);
      else if(tmpPayCount <= 8)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][1],2);
      else if(tmpPayCount <= 12)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][2],2);
      else if(tmpPayCount <= 16)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][3],2);
      else if(tmpPayCount <= 20)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][4],2);
      else if(tmpPayCount <= 24)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][5],2);
      else if(tmpPayCount >= 25)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][6],2);
    }
    //check for monthly payment
    if(this.mode == 0){
      if(tmpPayCount <= 12)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][0],2);
      else if(tmpPayCount <= 24)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][1],2);
      else if(tmpPayCount <= 36)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][2],2);
      else if(tmpPayCount <= 48)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][3],2);
      else if(tmpPayCount <= 60)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][4],2);
      else if(tmpPayCount <= 72)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][5],2);
      else if(tmpPayCount >= 73)
        return this.func.Mmultiply(Number(tmpRPP),this.chargeRatio[0][6],2);
    }
    return "0";
  }
  //5
  private calculateChargeRSP( tmpPayCount : number,  tmpRSP) : string
  {
    if(this.mode == 1){
      if(tmpPayCount % 12 == 1)
        tmpPayCount = Math.floor(tmpPayCount/12) + 1;
      else
        return "0";

      if(tmpPayCount == 1)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][0],2);
      else if(tmpPayCount == 2)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][1],2);
      else if(tmpPayCount == 3)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][2],2);
      else if(tmpPayCount == 4)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][3],2);
      else if(tmpPayCount == 5)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][4],2);
      else if(tmpPayCount == 6)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][5],2);
      else if(tmpPayCount >= 7)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][6],2);
    }
    if(this.mode == 2){
      if(tmpPayCount % 6 == 1)
        tmpPayCount = Math.floor(tmpPayCount/6) + 1;
      else
        return "0";

      if(tmpPayCount <= 2)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][0],2);
      else if(tmpPayCount <= 4)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][1],2);
      else if(tmpPayCount <= 6)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][2],2);
      else if(tmpPayCount <= 8)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][3],2);
      else if(tmpPayCount <= 10)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][4],2);
      else if(tmpPayCount <= 12)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][5],2);
      else if(tmpPayCount >= 13)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][6],2);
    }
    
    if(this.mode == 4){
      if(tmpPayCount % 3 == 1)
        tmpPayCount = Math.floor(tmpPayCount/3) + 1;
      else
        return "0";

      if(tmpPayCount <= 4)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][0],2);
      else if(tmpPayCount <= 8)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][1],2);
      else if(tmpPayCount <= 12)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][2],2);
      else if(tmpPayCount <= 16)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][3],2);
      else if(tmpPayCount <= 20)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][4],2);
      else if(tmpPayCount <= 24)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][5],2);
      else if(tmpPayCount >= 25)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][6],2);
    }
    if(this.mode == 0){
      if(tmpPayCount <= 12)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][0],2);
      else if(tmpPayCount <= 24)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][1],2);
      else if(tmpPayCount <= 36)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][2],2);
      else if(tmpPayCount <= 48)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][3],2);
      else if(tmpPayCount <= 60)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][4],2);
      else if(tmpPayCount <= 72)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][5],2);
      else if(tmpPayCount >= 73)
        return this.func.Mmultiply(Number(tmpRSP),this.chargeRatio[1][6],2);
    }
    return "0";
  }
  //6
  private calculateBonusRPP( 
    AVRPP : number, 
    year : number, 
    premRpp : any, 
    chkWihDraw  : number
  ) : number {
    let rate : number = 0.0025;
    // var mul ;
  /*	console.log("------------ chkWihDraw === "+ chkWihDraw 
        + "     year==" + year + " rate=="+ rate 
        + "    AVRPP="+AVRPP + "  mode="+mode  
        + "    bonus=" + Mmultiply(formatInt(AVRPP) , rate , 2)
        + " ------------"
        + " premRpp=" +  premRpp + " chkWihDraw="+chkWihDraw );*/
    if(year > 5 && premRpp > 0  ){
      
      if ( this.mode == 0)
        rate = Number(this.func.Mdivide( 0.0025 , 12 ,7));
      else if ( this.mode == 2)
        rate = Number(this.func.Mdivide( 0.0025 , 2 ,7));
      else if ( this.mode == 4)
        rate = Number(this.func.Mdivide( 0.0025 , 4 ,7));
      else 
        rate =  0.0025 ;
      
      
      /*console.log("------------ chkWihDraw === "+ chkWihDraw 
          + "     year==" + year + " rate=="+ rate 
          + "    AVRPP="+AVRPP + "  mode="+mode  
          + "    bonus=" + Mmultiply(formatInt(AVRPP) , rate , 2)
          + " ------------"
          + " premRpp=" +  premRpp + " chkWihDraw="+chkWihDraw );*/
          
      if ( chkWihDraw == 1 )
        return 0;
      else
        return Number(this.func.Mmultiply(Number(AVRPP) , rate , 2));
      
    }
    
    /*console.log("------------ chkWihDraw === "+ chkWihDraw 
        + "     year==" + year + " rate=="+ rate 
        + "    AVRPP="+AVRPP + "  mode="+mode  
        + "    bonus= 0 " 
        + " ------------"
        + " premRpp=" +  premRpp + " chkWihDraw="+chkWihDraw );*/
      
    return 0;	
  }
  private calculateAFRPP( 
    insY : number,  
    insM : number,  
    tmpRPP ,  
    tmpChargeRPP : number,  
    tmpAVRPP : number
  ) : number {
  //console.log("-------"+  insY + "/" +  insM + "-- tmpRPP=" + tmpRPP + "-- tmpChargeRPP=" + tmpChargeRPP + "-- tmpAVRPP=" + tmpAVRPP  );		
    let rateRpp : string = this.func.Mdivide( 0.01 , 12 ,8); 
    rateRpp = rateRpp.substring(0,9)
    let d7 : number = 0;

    if(insY == 1 && insM == 1){
      let tRRP : number = tmpRPP;
      let cRRP : number = tmpChargeRPP;
      let sub1 : string = this.func.Msubnum(Number(tRRP) , cRRP,2); 	
      d7 = Number(this.func.Mmultiply(Number(sub1) , Number(rateRpp) , 2)); 
      return  d7;
    }
    else if (tmpAVRPP < 0)
    {
      return  0;
    }	
    else{
      let tAVRRP : number =tmpAVRPP;
      d7 = Number(this.func.Mmultiply(tAVRRP , Number(rateRpp) , 2));
      if(d7 < 0)
        d7 = 0;
      return  d7;
    }
  }
  private calculateAFRSP( 
    insY : number,  
    insM : number,  
    tmpRSP : number,  
    tmpChargeRSP : number,  
    tmpAVRSP : number, 
    premRSP : number
  ) : number {
    let rateRsp : string = this.func.Mdivide( 0.01 , 12 ,8);
    rateRsp = rateRsp.substring(0,9)
    let d8 : number =0;
    
  //console.log("calculateAFRSP======================" + insM + "             tmpAVRSP=="  +tmpAVRSP); 	
    
    if(insY == 1 && insM == 1){
      var tRSP = tmpRSP;
      var cRSP = tmpChargeRSP;
      let sub1 : string = this.func.Msubnum(tRSP , cRSP,2); 	
      d8 = Number(this.func.Mmultiply(Number(sub1) , Number(rateRsp) , 2)); 
      return  d8;
    }
    else if (tmpAVRSP < 0  )
    {
      return  0;
    }	
    else {
      var tAVRSP = tmpAVRSP;
      d8 = Number(this.func.Mmultiply(tAVRSP , Number(rateRsp) , 2));  
      return  d8;
    }
      
      
  //   if ( preAVRSP <= 0 && month != 1   &&  sumRSP == 0  )
  
  }
  private calculateCOIRPP( 
    tmpAge : number,  year : number,   
    tmpSex: string ,  sumRPP : number,  
    tmpEP : number,  tmpYearEP : number
  ) : number {
    let sex : number = 0;
    if (tmpSex == 'F')
      sex = 1;
      
    let SEM =  this.func.Mdivide(Number(this.EM), 100 , 2);      
    let agetmo = ( Number(tmpAge)+Number(year) ) -1;
        
    let stdMortal = this.TMOTable[sex][agetmo];//TOM.getTOM51(agetmo,tmpSex);
    let extMortal = this.func.Mmultiply(Number(stdMortal),Number(SEM),4);
    let totMortal = this.func.Maddnum(Number(stdMortal),Number(extMortal),4);
    let sumUnit   = this.func.Mdivide(sumRPP , 1000 , 4); 
    let coiRPP : string = this.func.Mmultiply(Number(sumUnit) , Number(totMortal) ,4);
    coiRPP = this.func.Mdivide(Number(coiRPP) , 12 , 4); 
    coiRPP = this.func.subDecimal2(coiRPP);
    
    let EPsum : string = this.func.Mmultiply(Number(sumUnit) , Number(tmpEP) ,1);  
    EPsum = this.func.Mdivide(Number(EPsum) , 12 , 4);   
    EPsum = this.func.subDecimal2(EPsum);
    
    
    if ( year <= Number(tmpYearEP) &&  Number(tmpYearEP) != 0 )
      return Number(this.func.Maddnum(Number(EPsum) ,Number(coiRPP),2));
    else
      return Number(coiRPP);

  }
  private calculateCOIRSP( 
    tmpAge : number, year : number,  
    month : number,  tmpSex : string,   
    tmpEP  : number, tmpYearEP  : number, 
    sumRSP : number, preAVRSP : number, premRSP : number
  ) : number {
    let sex : number = 0;
    if (tmpSex == 'F')
      sex = 1;
      
    let SEM =  this.func.Mdivide(Number(this.EM) , 100 , 2);    
    let agetmo = ( Number(tmpAge)+Number(year) ) -1;
    
    let stdMortal = this.TMOTable[sex][agetmo];
    let extMortal = this.func.Mmultiply(Number(stdMortal),Number(SEM),4);
    let totMortal = this.func.Maddnum(Number(stdMortal),Number(extMortal),4);
    let sumUnit   = this.func.Mdivide(sumRSP , 1000 , 4); 
    let coiRSP    = this.func.Mmultiply(Number(sumUnit) , Number(totMortal) ,4);
    coiRSP = this.func.Mdivide(Number(coiRSP) , 12 , 4);  
    coiRSP   = this.func.subDecimal2(coiRSP);
    
    let EPsum = this.func.Mmultiply(Number(sumUnit) , Number(tmpEP) ,1);  
    EPsum =  this.func.Mdivide(Number(EPsum) , 12 , 4);
    EPsum   = this.func.subDecimal2(EPsum);

    if ( preAVRSP <= 0 && month != 1   )
    {
  //	console.log(" month == "+ month+"  || preAVRSP==" + preAVRSP + "  sumRSP==" +sumRSP + "  premRSP==" + premRSP);
  //	preAVRSP==0  sumRSP==60000  premRSP==12000 
  //	 month == 1057  || preAVRSP==0  sumRSP==60000  premRSP==12000

      if (sumRSP > 0 && premRSP == 0 )
        return 0;
      else if (premRSP > 0 )
        return Number(coiRSP);
      else
        return Number(coiRSP);
        
    }	
    else if ( year <= Number(tmpYearEP) &&  Number(tmpYearEP) != 0    )
        return Number(this.func.Maddnum(Number(EPsum), Number(coiRSP) ,2));
      else
        return Number(coiRSP);

  }
  private calculatePF() : number{
    return 0;
  }
  private calculateDeathBenefit( 
    tmpMonth,  tmpAge,  
    tmpAVRPP,  tmpAVRSP ,  
    tmpAVTOP ,  ratio , 
    sumRpp , sumRsp , 
    tmpSUMWD , chkZeroFromWD
  ) : number {	
  
    if (tmpMonth == 1) 
    {
      return Number(this.func.Maddnum(
        Number(this.func.Maddnum(
          Number(this.func.Maddnum(
            Number(this.func.Maddnum(Number(sumRpp),Number(sumRsp),4)
          ),tmpAVRPP,4)
        ),tmpAVRSP,4)
      ),tmpAVTOP,4));
    }
    else if( tmpAVRSP == 0 && chkZeroFromWD == 0)
    {	
      return Number(this.func.Maddnum(
        Number(this.func.Maddnum(sumRpp,tmpAVRPP,4)
      ),tmpAVTOP,4));
    }
    else if( tmpAVRSP < 0 && chkZeroFromWD == 0)
    {	
      return Number(this.func.Maddnum(
        Number(this.func.Maddnum(
          Number(this.func.Maddnum(sumRpp,tmpAVRPP,4)
        ),tmpAVRSP,4)
      ),tmpAVTOP,4));
    }	
    else if ( tmpAVRSP == 0 && tmpSUMWD > 0 )
    {
      return 0;
    }
    else if ( tmpAVRSP == 0 && chkZeroFromWD == 1)
    {
      return 0;
    }
    else
    {	
      return Number(this.func.Maddnum(
        Number(this.func.Maddnum(
          Number(this.func.Maddnum(
            Number(this.func.Maddnum(sumRpp,sumRsp,4)
          ),tmpAVRPP,4)
        ),tmpAVRSP,4)
      ),tmpAVTOP,4));
    }
  }
  //15  
  private calculateExppRPP( 
    tmpPayCount : number, tmpRPP : number, 
    chk : number, ratio : number
  ) : number {
    let d : number = 0;
    if (tmpPayCount <= 12)
      d = Number(this.func.Mmultiply(tmpRPP,0.4,2));
    else if (tmpPayCount <= 24 )
      d = Number(this.func.Mmultiply(tmpRPP,0.3,2));
    else 
      d = 0;
    
    //console.log("tmpPayCount =="+ tmpPayCount + "  d="+d);
    //d = subDecimal2(d);
    
    
    
    if(this.mode == 1) {
      if(tmpPayCount/12 < 3) 
        return Number(this.func.Msubnum(tmpRPP, d,2));
    }
    else if(this.mode == 2) {
      if(tmpPayCount/6 < 5)
        return Number(this.func.Msubnum(tmpRPP, d,2));
    }
    else if(this.mode == 4) {
      if(tmpPayCount/3 < 9)
        return Number(this.func.Msubnum(tmpRPP, d,2));
    }
    else if(this.mode == 0) {
      if(tmpPayCount < 25)
        return Number(this.func.Msubnum(tmpRPP, d,2));
    }

    return tmpRPP;   

  }
  private calculateChargeTOP( year : number, month : number, premTOP : number) : number
  {
    return Number(this.func.Mdivide(Number(this.func.Mmultiply(premTOP,2.5,2)),100,2));
  }
  private calculateAFTOP( year, month, premTOP , tmpChargeTOP , tmpAVTOP) 
  {
    let d7 : number =0;
    let rateTop : string = this.func.Mdivide( 0.01 , 12 ,8); 
    rateTop = rateTop.substring(0,9)
    let sub1 : string = "0";
    
    
    if(year == 1 && month == 1)
    {
      sub1 = this.func.Msubnum(premTOP , tmpChargeTOP,2); 	
      d7 = Number(this.func.Mmultiply(Number(sub1) , Number(rateTop) , 2));  
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
    
    /*
    if(year == 1 && month == 1)
    {
      sub1 = Msubnum(premTOP , tmpChargeTOP,2); 	
      d7 = Mmultiply(sub1 , rateTop , 2); 
    }
    else if ( tmpAVTOP > 0 )
    {
      d7 = Mmultiply( tmpAVTOP , rateTop , 2)
    }	
    else 
    {
      
      if (premTOP > 0)
      {
        d7 = 0;
      }	
    }*/

    return  d7;
    
  }
  private prepareInput() 
  {
    console.log('yearPolicy : '+JSON.stringify(this.yearPolicy));
  //console.log(" prepareInput yEndown==" + yEndown);
  
    if (this.stopFlag > 0)
      this.yEndown = this.stopFlag;
    
  //console.log(" prepareInput stopFlag==" + stopFlag);	
    this.data = new Array();
    for(let year = 0 ; year < this.yEndown  ; year++) 
    { 
  //console.log(" prepareInput into  year>>" + year);
      this.data[year] = new Array();
      this.data[year][0] = this.yearPolicy[year] ; // 1
      this.data[year][1] = this.monthPolicy[year] ; // 2
      this.data[year][2] = this.agePolicy[year] ; // 3
      this.data[year][3] = this.RPP[year] ; // 4
      this.data[year][4] = this.RSP[year] ; // 5
      this.data[year][5] = this.RCP[year] ; // 6
      this.data[year][6] = this.chargeRPP[year] ; // 7
      this.data[year][7] = this.chargeRSP[year] ; // 8
      this.data[year][8] = this.bonusRPP[year] ; // 9
      this.data[year][9] = this.AFRPP[year] ; // 10
      this.data[year][10] = this.AFRSP[year] ; // 11
      this.data[year][11] = this.COIRPP[year] ; // 12
      this.data[year][12] = this.COIRSP[year] ; // 13
      this.data[year][13] = this.PF[year] ; // 14
      this.data[year][14] = this.AVRPP[year] ; // 15
      this.data[year][15] = this.AVRSP[year] ; // 16
      this.data[year][16] = this.deathBenefit[year] ; // 17
      this.data[year][17] = this.exppRPP[year] ; // 18
      this.data[year][18] = this.exppRSP[year] ; //19
      this.data[year][19] = this.PREMIUMTOPUP[year] ; // 20
      this.data[year][20] = this.EXPENSETOPUP[year] ; //21
      this.data[year][21] = this.AFTOPUP[year] ; //22
      this.data[year][22] = this.AVTOPUP[year] ; // 23
      this.data[year][23] = this.CVTOPUP[year] ; //24
      

      if ( (year+1) == this.yEndown)
      {
//console.log(" prepareInput   callback    yEndown==" + yEndown);
        
      }
    }
  }
  private tableInput() 
  {
  //console.log(" tableInput yEndown==" + yEndown);
    if (this.stopFlag > 0)
    this.yEndown = this.stopFlag;
  //console.log(" tableInput stopFlag==" + stopFlag);	
    this.datatable = new Array();
    let sumPrem2 : number = 0;
    let sumWD : number = 0;
    for(let year = 0 ; year < this.yEndown  ; year++) 
    {
      this.datatable[year] = new Array();
      this.datatable[year][0] = this.agePolicy[year] ; // 1
      this.datatable[year][1] = this.yearPolicy[year] ; // 2
      this.datatable[year][2] = this.SUMRPP[year] ; // rpp
      this.datatable[year][3] = this.SUMRSP[year] ; // rsp
      this.datatable[year][4] = this.func.Maddnum(Number(this.SUMRPP[year]),Number(this.SUMRSP[year]),2) ; // rpp+rsp
      this.datatable[year][5] = this.RPP[year] ; // prem
      this.datatable[year][6] = this.RSP[year] ; // prem
      this.datatable[year][7] = this.PREMIUMTOPUP[year] ; // topup
      this.datatable[year][8] = this.REALPREMRIDER[year] ; // rider
      this.datatable[year][9] = this.func.Maddnum(Number(this.REALPREMRIDER[year]),Number(this.func.Maddnum(Number(this.PREMIUMTOPUP[year]),Number(this.func.Maddnum(Number(this.RPP[year]),Number(this.RSP[year]),2)),2)),2) ; // rpp+rsp+topup+rider
      sumPrem2 = sumPrem2+Number(this.datatable[year][9]);
      this.datatable[year][10] = sumPrem2;//this.sumPremUA02(this.datatable[year][9]) ; // rpp+rsp+topup+rider
      this.datatable[year][11] = this.func.Maddnum(Number(this.func.Maddnum(Number(this.chargeRPP[year]),Number(this.chargeRSP[year]),2)),Number(this.EXPENSETOPUP[year]),2) ; // chargeRPP+chargeRPP
      this.datatable[year][12] = this.func.Maddnum(Number(this.func.Maddnum(Number(this.AFRPP[year]),Number(this.AFRSP[year]),2)),Number(this.AFTOPUP[year]),2) ; // AFRPP+AFRSP+AFTOPUP
      this.datatable[year][13] = this.func.Maddnum(Number(this.func.Maddnum(Number(this.COIRPP[year]),this.COIRSP[year],2)),this.COIRIDER[year],2) ; // COIRPP+COIRSP
      this.datatable[year][14] = this.func.Maddnum(Number(this.datatable[year][11]) ,Number(this.func.Maddnum(Number(this.datatable[year][12]),Number(this.datatable[year][13]),2)),2) ; // sum charge
      this.datatable[year][15] = this.bonusRPP[year] ; // 15
      this.datatable[year][16] = this.func.Mmultiply(this.RATE[year],100,0) ; // rate
      this.datatable[year][17] = this.REALWITHDRAW[year] ; // 17
      this.datatable[year][18] = this.FEEWD[year] ; // 18
      this.datatable[year][19] = this.func.Msubnum(	Number(this.datatable[year][17]) , 	Number(this.datatable[year][18])  ,0); //19
      sumWD = sumWD+Number(this.datatable[year][17])
      this.datatable[year][20] = sumWD//this.sumWITHDRAW(this.datatable[year][17]) ; // 20
      this.datatable[year][21] = this.AVRPP[year]  ; // Av
      this.datatable[year][22] = this.AVRSP[year] ; // Av
      this.datatable[year][23] = this.AVTOPUP[year] ; // Av
      this.datatable[year][24] = this.func.Maddnum( Number(this.AVTOPUP[year]) ,Number(this.func.Maddnum(Number(this.AVRPP[year]),Number(this.AVRSP[year]),2)),2) ; // Av
      this.datatable[year][25] = this.deathBenefit[year] ; // 25
      this.datatable[year][26] = this.chargeTax( Number(this.datatable[year][13]) , Number(this.datatable[year][11]) , Number(this.datatable[year][12])) ; // coi charge af
      this.datatable[year][27] = this.Tax ; // tax
      this.datatable[year][28] = this.calTax (Number(this.datatable[year][26]), Number(this.datatable[year][27]) ) ; // tax
      // if ( formatInt(year)+1 == this.yEndown)
      // {
      //   callback();
      // }
      
    }
  }
  private calTax (charge : number, baseTax : number) : number
  {
    // let a = charge ; 
    // let b = baseTax;
    let calTax : number = Number(this.func.Mmultiply(charge,baseTax,2));
    calTax = Number(this.func.Mdivide(Number(calTax),100,2));
      
    return calTax;
  }
  private chargeTax(charge : number, af : number, coi : number) : number
  {
    let sumcharge : number = Number(this.func.Maddnum( coi , Number(this.func.Maddnum(charge,af,2)) ,2 )); 
    let maxcharge : number = 100000;
    let chargeTax : number = 0;
    if ( sumcharge > maxcharge )
      chargeTax = maxcharge;
    else
      chargeTax = sumcharge;
      
    return chargeTax;
  }
  
}