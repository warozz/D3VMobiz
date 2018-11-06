import { LoadingController, Loading } from 'ionic-angular';
import { Directive } from '@angular/core';

/**
 * Generated class for the LoadingDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[loading]' // Attribute selector
})
export class LoadingDirective extends LoadingController {
  private loading: Loading;
  /**
   * แสดงข้อความขณะกำลังโหลดข้อมูล
   * @param message ข้อความที่แสดง
   * 
   */
  public present(message: string = 'กรุณารอสักครู่...'): void {

    this.loading = this.create({
      content: message
    });
    this.loading.present();
  }

  /**
   * ปิดการแสดงข้อความขณะกำลังโหลดข้อมูล
   * 
   */
  public dismiss(): void {
    this.loading.dismiss();
  }

  public scopePresent(message: string = 'กรุณารอสักครู่...') {
    let loading = this.create({
      content: message
    });
    loading.present();
    return loading;
  }

  public scopeDismiss(loading:Loading): void {
    loading.dismiss();
  }
}
