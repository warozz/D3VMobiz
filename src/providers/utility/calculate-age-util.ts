import { CalculateAgeDirective } from "../../directives/utility/calculate-age/calculate-age";

export class CalculateAgeUtil {

     /**
   * คำนวณอายุ จากวันเกิด
   * @param birthDate วันเกิด
   */
   static calculateAge(birth: Date): any {

    let calage :  CalculateAgeDirective = new CalculateAgeDirective();
    return calage.calculateAge(birth).toString();



  }

}