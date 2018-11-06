import { DecimalPipe } from "@angular/common";
import { TextModal } from "./../../../providers/constants/text-modal";
import { WarningModalComponent } from "./../../../components/utility/warning-modal/warning-modal";

import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  forwardRef,
  Renderer2
} from "@angular/core";
import { ModalController, Modal } from "ionic-angular";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FullnameComponent } from "../../../components/utility/fullname/fullname";
import { FullNameInfo } from "./fullname-info";

/**
 * Generated class for the AgeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FullnamePopupDirective),
  multi: true
};

@Directive({
  selector: "[fullname-popup]", // Attribute selector
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class FullnamePopupDirective {
  /**
   * ค่า
   */
  private _value: string = "";
  private _info: FullNameInfo;

  /**
   * เปิด/ปิด
   */
  private _disabled: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @Output() fullnameChange:EventEmitter<FullNameInfo> = new EventEmitter();

  @Input("info")
  set info(info: FullNameInfo) {
    // debugger;
    if(info !== undefined && info !== null) {
      this._info = info;
    }
  }
  @Input('birthDate') private birthDate: string;

  // get options() {
  //   return this._info;
  // }

  @HostListener("click", ["$event"])
  private onclick(event): void {

    setTimeout(() =>{
      
      const info = {
        info: this._info,
        birthDate: this.birthDate
      };
      console.log("open modal -> ", info) ;
      console.log("birthDate : ", this.birthDate);

      let modal: Modal = this.modalCtrl.create(FullnameComponent, info);
      modal.present();
  
      modal.onDidDismiss((data) => {
        let userEmit = new FullNameInfo();
        userEmit.prefix = this._info['prefix'] ? this._info['prefix'] : '';
        userEmit.firstName = this._info['firstName'] ? this._info['firstName'] : '';
        userEmit.lastName = this._info['lastName'] ? this._info['lastName'] : '';
        if(data) {
          const userInfo = `${data.get('prefix').value} ${data.get('firstName').value} ${data.get('lastName').value}`;
          this.elementRef.nativeElement.value = userInfo;
          this.renderer.setProperty(this.elementRef.nativeElement, 'value', userInfo);
          
          userEmit.prefix = data.get('prefix').value;
          userEmit.firstName = data.get('firstName').value;
          userEmit.lastName = data.get('lastName').value;
          this.fullnameChange.emit(userEmit);
        }
        
        
  
      });
    }, 20);
  }

  // เขียนค่าลง input
  public writeValue(value: string) {
    if (typeof value != "undefined" && value != null) {
      this.elementRef.nativeElement.value = value;
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);

      this.onChange(value);
    }
  }

  private onChange = _ => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

    /**
   * เปิด/ปิด
   * @param disabled
   */
  public setDisabledState(disabled: boolean): void {
    const element: Element = this.elementRef.nativeElement;
    if (disabled) {
      element.removeAttribute('readonly');
      element.setAttribute('disabled', 'disabled');
    }
    else {
      element.removeAttribute('disabled');
      element.setAttribute('readonly', 'readonly');
    }
  }
}
