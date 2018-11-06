import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PaginationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<any>, args?:any):any {
    let pagedItems = [];
    let pageSize = Number(args.pageSize);
    let startIndex = (args.currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, value.length - 1);
    pagedItems = value.slice(startIndex, endIndex + 1);
    return pagedItems;
  }
}
