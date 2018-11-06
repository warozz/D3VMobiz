import { Pipe, PipeTransform } from '@angular/core';
import {TlPlanProvider} from "../../providers/tlplan/tlplan";

/**
 * Generated class for the QuatationPlanBindingPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'quatationPlanBinding',
})
export class QuatationPlanBindingPipe implements PipeTransform {

  constructor(private tlplanService:TlPlanProvider) {

  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return this.tlplanService.bindingData(value, args[0]);
  }
}
