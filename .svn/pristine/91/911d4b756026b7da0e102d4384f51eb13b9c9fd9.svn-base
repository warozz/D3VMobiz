import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumberFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
  
  constructor(private decimalPipe: DecimalPipe) {

  }
  
  /**
   * แปลง format ตัวเลข
   * @param value ตัวเลข
   * @param digits จำนวนตำแหน่งทศนิยม
   * @param zeroSymbol สัญลักษณ์แทน 0
   */
  transform(value: string | number, digits?: string, zeroSymbol?: string): string {

    let number: number;

    if (typeof value == 'undefined' || value == 'undefined')
      number = 0
    if (typeof value == 'string') {
      number = Number(value);
      if (value == 'NaN')
        number = 0;
      else if (isNaN(number))
        return value;
    }
    else
      number = value;

    if (isNaN(number))
      number = 0;
    
    if (number != 0)
      return this.decimalPipe.transform(number, digits);
    else {
      if (typeof zeroSymbol != 'undefined')
        return zeroSymbol;
      else
        return '0';
    }
  }
}
