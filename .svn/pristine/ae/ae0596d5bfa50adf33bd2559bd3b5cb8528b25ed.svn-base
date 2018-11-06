import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, forwardRef} from '@angular/core';
import {AddressProvider} from "../../providers/address/address";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Generated class for the AddressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressComponent),
  multi: true
};

@Component({
  selector: 'address',
  templateUrl: 'address.html',
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
})
export class AddressComponent {

  private limit = 50;
  private isShowAutoComplete = false;
  private addresses = [];
  private displayAddresses = [];
  private addressText = '';
  private arrowkeyLocation;
  private dirty: boolean = false;

  private _address:any;
  @Input() set address(_address){
    //  console.log("set address", _address, ", addressType", this.addressType);
    let addressText = _address[this.addressType];
    if (addressText===null || addressText===undefined) {
      addressText = '';
    }
    this.addressText = addressText;
    this._address = _address;
    // console.log("Set New Address");
    this.isShowAutoComplete=false;
    this.arrowkeyLocation = 0;

    if (addressText == '') {
      if (this.dirty) {
        this.value = null;
      }
      else
        this.dirty = true;
    }
    else {
      this.dirty = true;
      this.writeValue(_address);
    }
  }
  get address() {
    return this._address;
  }
  @Output() addressChange:EventEmitter<any> = new EventEmitter();

  @Input() addressType:string; // tambon_name, amphur_name, province_name, zip

  /**
   * เปิด/ปิด
   */
  private _disabled: boolean = false;

  constructor(public addressService: AddressProvider) {
  }

  ngOnInit() {
    //  console.log("=== on init ===");
    this.addresses = this.addressService.getAddress();
    if (this.limit===null || this.limit===undefined) {
      this.limit = this.addresses.length;
    }
    let addressText = this.address[this.addressType];
    if (addressText===null || addressText===undefined) {
      addressText = '';
    }
    this.addressText = addressText;
    this.arrowkeyLocation = 0;
  }

  onFocus() {
    // console.log("=== on focus ===");
    this.isShowAutoComplete = true;
    this.searchAddress(this.addressText);
  }

  onBlur() {
    // setTimeout(() => {
     
    //   this.isShowAutoComplete=false;
    //   this.arrowkeyLocation = 0;

    //   //return real text
    //   if(this.addressText.length <= 0) {
    //     this.setAddressObject(this.addressText.length);
    //   } else if(this.addressText.length > 0) {
    //     let search = this.addresses.filter((value, index) => 
    //        value[this.addressType] == this.addressText
    //     )
    //     if(search.length <= 0) {
    //       this.setAddressObject(this.addressText.length);
    //     }
    //   }
    // }, 300);
  }

  setAddressObject(length) {
    this.address[this.addressType] = this.addressText;
    this.addressChange.emit(this.address);

    if (length > 0)
      this.value = this.address;
    else
      this.value = null;
  }

  addressTextChamge($event){
    // console.log("=== address text change ===", $event)
    this.addressText = $event;
    this.searchAddress(this.addressText);
  }

  keyDown(event: KeyboardEvent) {
    // console.log("=== key down ===", event.keyCode, this.arrowkeyLocation);
    switch (event.keyCode) {
      case 38: // this is the ascii of arrow up
        if (this.arrowkeyLocation>0){
          this.arrowkeyLocation--;
        }
        break;
      case 40: // this is the ascii of arrow down
        if (this.arrowkeyLocation<this.displayAddresses.length) {
          this.arrowkeyLocation++;
        }
        break;
      case 13:
        this.selectAddress(this.displayAddresses[this.arrowkeyLocation]);
    }
  }

  searchAddress(addressName) {
    // console.log("=== search address ===", addressName, this.displayAddresses);
    let limit = this.limit;
    this.displayAddresses = this.addresses.filter((value, index) => {
      return value[this.addressType].startsWith(addressName);
    }).slice(0,limit);
  }

  selectAddress(address) {
    // console.log("=== select address ===", address, this.displayAddresses);
    this.isShowAutoComplete = false;
    this.arrowkeyLocation = 0;
    if (address===undefined) {
      return;
    }
    this.addressText = address[this.addressType];
    // console.log("Emit Address", address);
    this.addressChange.emit(address);
    this.value = address;
  }

  // อ่านค่า
  get value(): any {
    return this._address;
  };

  // เก็บค่า
  set value(address: any) {
    if (address !== this._address) {
      this._address = address;
      this.value = address;
      this.onChange(address);
      
    }
  }

  // เขียนค่าลง input
  public writeValue(address: any) {
    this._address = address;
    this.onChange(address);
  }

  private onChange = (_) => {};
  private onTouched = () => {};
  public registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
