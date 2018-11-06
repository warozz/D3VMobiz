import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CustomerFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchProspectFilter',
})
export class SearchProspectFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any[], args : String): any {
    if(args != 'A'){
      return value.filter(value => value.customerType === args);
    }
    return value;
  }
}
