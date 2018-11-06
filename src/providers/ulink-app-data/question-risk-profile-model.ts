export class QuestionRiskProfileModel{
    public agentid : string;
    public customerid : string;
    public risk1 : string; // อายุปัจจุบัน ต้องเก็บ?
    public risk2 : string;
    public risk3 : string;
    public risk4 : string;
    public risk5 : string;
    public risk6 : string;
    public risk7 : string;
    public risk8 : string;
    public risk9 : string;
    public risk10 : string;
    public risk11 : string;
    public risk12 : string;

    // น่าจะขาดวันที่บันทึกล่าสุด

    chkRiskProfile1: string;
    chkRiskProfile2: string;
    chkRiskProfile3: string;
    chkRiskProfile4: string;

    four1: string = '0';
    four2: string = '0';
    four3: string = '0';
    four4: string = '0';

    sumScore:number = 0;

    resultType: string;

}