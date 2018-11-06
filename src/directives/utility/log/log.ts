import { Directive, HostListener, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
import { LoggerProvider } from './../../../providers/logger/logger-service';
import { LoggerActionLogModel } from './../../../providers/logger/logger-actionlog-model';

/**
 * Generated class for the LogDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[log]' // Attribute selector
})
export class LogDirective {

  constructor(private storage: Storage, private logger: LoggerProvider) {
    
  }

  /**
   * หน้า
   */
  @Input('page') private page: string;
  /**
   * ชื่อ object ที่เกิด action
   */
  @Input('object') private object: string;
  /**
   * ชนิดของ object
   */
  @Input('type') private type: string;

  @HostListener('click', ['$event']) private onclick(event): void {
    this.storage.get('loginProfile').then(profile => {

      // actionLog Model
      let actionLog = new LoggerActionLogModel();
      actionLog.agentid = profile.agentid;
      actionLog.page = this.page;
      actionLog.object = this.object;
      actionLog.type = this.type;
      actionLog.seq = UUID.UUID()

      // call log
      this.logger.insertActionLog(actionLog);
    });
  }
}
