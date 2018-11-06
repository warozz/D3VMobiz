import { EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the SettingTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'setting-table',
  templateUrl: 'setting-table.html'
})
export class SettingTableComponent {

  @Input() private data: any;
  @Output() private plancodeout: EventEmitter<string> = new EventEmitter();
  constructor() {
    
  }

  private deletePlanCode(planCode : string): void {
    this.plancodeout.emit(planCode);
  }
}
