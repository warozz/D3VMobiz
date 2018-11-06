import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(records: Array<any>, args?: any): any{
    if(typeof records === 'undefined'){
      return;
    }
    return records.sort((first,secord) => {
      if(first[args.property] < secord[args.property]){
        return -1 * args.direction;
      } else if(first[args.property] > secord[args.property]){
        return 1 * args.direction;
      } else {
        return 0;
      }
    });
  };
}
