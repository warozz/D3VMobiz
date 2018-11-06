import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ValidateProvider } from '../validate/validate';
import { MathUtilProvider } from '../utility/math-util';

/*
  Generated class for the CurrencyFormatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurrencyFormatProvider {

  constructor(private validate: ValidateProvider,
            private mathUtil: MathUtilProvider) {}

  /**
   * @param value anyData
   * @return String with Currency
   */
  public currencyFormat(value){
    if(this.validate.isEmpty(value)){
      return;
    }
    return Number(this.mathUtil.round10(value,-2)).toFixed(2).replace(/./g, function(char, index, num) {
      return index > 0 && char !== "." && (num.length - index) % 3 === 0 ? "," + char : char;
    });
  }

}
