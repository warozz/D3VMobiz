/**
 * function กลาง
 * 
 */

export class UnitlinkUtility {
  constructor(){
    
  }
  public clearNum( num : string) : number
  {
    if ( num == ".0000" || num == ".00" )
      return 0;
    else
      return parseInt(num, 10);
  }
  public Maddnum(a : number ,b : number ,c : number) : string
  {
    a = (a)*1;
    b = (b)*1;
    let result : number =0;
    if (c > 0)
      result = (a+b);
    else 
      result = (a+b);
    
    return (result*1.0000).toFixed(c);
  }
  public Msubnum(a : number,b : number,c : number) : string
  {
    a = (a)*1;
    b = (b)*1;
    let result : number =0;
    if (c > 0)
      result = (a-b);
    else 
      result = (a-b);
    
    return (result*1.0000).toFixed(c);
  }
  public Mdivide(a : number,b : number,c : number) : string
  {
    a = (a)*1;
    b = (b)*1;
    let result : number = 0;
    if (c > 0)
      result = (a/b)
    else 
      result = (a/b);
    
    return (result*1.0000).toFixed(c);
  }
  public Mmultiply(a : number, b : number, c : number) : string
  {
    a = (a)*1;
    b = (b)*1;
    let result : number =0;
    if (c > 0)
      result = (a*b);
    else 
      result = (a*b);
    
    return (result*1.0000).toFixed(c);
  }
  public subDecimal2( val : string) : string
  {
    var c = new Array();
    c = val.split(".");
    var newC = c[1];
    if (this.formatInt(newC.substring(2,3)) == 5 )
    {

      newC = newC.substring(0,2) ;
      newC = newC+"6" ;
      val = c[0]+"."+newC;
    }
    else 
    {   
      val = val;
    }	
    return this.Maddnum(Number(val),0,2);

  }
  public subDecimal5(vall : string) : string 
  {
    let c : Array<string> = [];
    c = vall.split(".");
    let newC : string = '00000'
    if(c.length >= 2)
      newC = c[1];
    let val : string = "";
    if (Number(newC.substring(4,5)) >= 5 )
    {	
      let newCC = Number(newC.substring(0,4));
      val = this.Maddnum(newCC, 1, 0);
      val = c[0]+"."+val;
    }
    else 
    {
      newC =newC.substring(0,4) ;
      val = c[0]+"."+newC;
    }	
    return val;
  }
  // public chkUndefined(val : number) : number
  // {
  //   if (val > 0)
  //     return val;
  //   else if (val < 0)
  //     return val;
  //   else 
  //     return 0;
  // }
  public formatInt(a : string) : number{
    if (typeof a === 'string') {
      a = a.trim();
    }
    if(a == '' || a == null){
      return 0;
    }
    let num : number = Number(a);
    if(isNaN(num)){
      return NaN;
    }
    var b = num*1;
    return b;
  }
  public chkValue(val : string){
    try{
      if (typeof val === 'string') {
        val = val.trim();
      }
      if((val == "") || (val == null) || (val == "-") || (val == "0")){
        return false;
      }
      return true;
    }catch(e){
      return false;
    }
  }
}