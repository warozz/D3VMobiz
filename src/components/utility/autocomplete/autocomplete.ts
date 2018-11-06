import { Component, Input, Output, HostBinding, ContentChildren, QueryList, EventEmitter, AfterViewInit } from '@angular/core';
import { DropdownOptionComponent } from './../dropdown/dropdown-option/dropdown-option';
import { PopupPlanDetailComponent } from '../popup-plan-detail/popup-plan-detail';
import { Modal,ModalController } from 'ionic-angular';

/**
 * Generated class for the AutocompleteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompleteComponent {


  /**
   * class boxSearchPlanInsurance
   */
  @HostBinding('class.boxSearchPlanInsurance') private classBoxSearchPlanInsurance: boolean = true;

  /**
   * ไอคอน
   */
  @Input('icon') private icon: string = '';
  /**
   * ชื่อเรื่อง
   */
  @Input('label') private label: string = '';
  /**
   * ลายน้ำ
   */
  @Input('placeholder') private placeholder: string = '';

  /**
   * แสดงรายการโปรด
   */
  @Input('favorite') set favorite(favorite: boolean) {
    this.showFavorite = favorite;
  }

  @Input('disabled')  private disabled: boolean = false;


  /**
   * แสดงAutocomplete ที่ไม่มีใน List
   */
  @Input('isEdit')  private isEdit: boolean = false;

  /**
   * กำหนดความยาวตัวอักษรสูงสุด
   */
  @Input('maxlength') private maxlength: number;

  /**
   * ซ่อน แสดง รายการ autocomplete
   */
  private showListOption: boolean = false;

  /**
   * ข้อความ
   */
  public text: string;
  /**
   * แสดงปุ่มล้างข้อความ
   */
  private showClear: boolean = false;

  /**
   * toggleMarkStarbtnFavorite
   */
  private btnMarkFavorite : boolean = false;
  /**
   * piece of optionArray obj
   */
  private objItem : object = {};
  /**
   * piece of optionArray obj
   */
  private favoriteItem : boolean = false;
  /**
   * แทปแบบประกัน2 ของ autoComplete
   */


  /**
   * component autocomplete-option
   */
  private optionArray: Array<DropdownOptionComponent>;
  private option: QueryList<DropdownOptionComponent>;
  @ContentChildren(DropdownOptionComponent) set component(option: QueryList<DropdownOptionComponent>) {
    this.option = option;
    this.optionArray = this.option.toArray();
    if (this.optionArray.length > 0 && this.data != '')
    {
      let found: boolean = false;
      this.optionArray.forEach(element => {
        if (this.data == element.value)
        {
          if (!this.showListOption) {
            this.checkFavoriteBtn(element.favorite);
            this.text = element.text;
            this.showClear = true;
          }
          found = true
          return;
        }
      });


      if(!this.isEdit && !found){
        this.clear(false);
      } else if (this.isEdit) {
        this.text = this.data;
        this.showClear = true;
      }

    }
    else if (this.data == '') {
      this.clear(false);
    }
    // ยังโหลด data ไม่เสร็จ
    else if (this.optionArray.length > 0) {
      this.clear();
    }
    // ไม่มีให้เลือก
    else {
      this.clear(false);
    }
  }

  /**
   * ข้อความ
   */
  private data: string = '';
  @Input('data') set setData(data: string) {
    this.data = data;

    if (typeof this.optionArray != 'undefined' && this.optionArray.length > 0 && this.data != '')
    {
      let found: boolean = false;
      this.optionArray.forEach(element => {
        if (this.data == element.value)
        {
          this.checkFavoriteBtn(element.favorite);
          found = true
          this.text = element.text;
          this.showClear = true;
          this.showListOption = false;
          return;
        }
      });

      if(!this.isEdit && !found){
          this.clear();
      }else if (this.isEdit) {
        this.text = this.data;
        this.showClear = true;
      }

    }
  }
  @Output() private dataChange: EventEmitter<string>;
  @Output() private changeFavorite: EventEmitter<Boolean>;

  constructor(
      private modalCtrl: ModalController
  ) {
    this.dataChange = new EventEmitter();
    this.changeFavorite = new EventEmitter();

  }

  /**
   * ซ่อน / แสดง รายการโปรด
   */
  @HostBinding('class.favorite') public showFavorite: boolean = false;

  /**
   * กำลังพิมพ์ข้อความ
   */
  private onTyping(): void {
    setTimeout(() => {
      if(this.text.length > 0) {
        this.showClear = true;
      } else {
        this.showClear = false;
      }
      this.showListOption = true;
    }, 100);
  }

  /**
   * ล้างข้อความค้นหา และ แสดงแบบประกัน
   * @param showList แสดง dropdown
   */
  private clear(showList: boolean = true): void {
    this.text = '';
    // this.data = '';
    this.showClear = false;
    this.showListOption = showList;
    this.btnMarkFavorite = false;
    if (!showList)
      this.dataChange.emit('');
  }

  /**
   * แสดงแบบประกัน กรณียังไม่ได้พิมพ์
   */
  private onFocus(status: boolean): void {
    if (this.text.length == 0 && status)
      this.showListOption = true;
    else if (!status)
      setTimeout(() => {
        //this.showListOption = false;
      }, 100);
  }

  /**
   * auto change favorite btn color
   */
  private checkFavoriteBtn(favorite: boolean) : void {
    if(favorite) {
      this.btnMarkFavorite = true;
    } else {
      this.btnMarkFavorite = false;
    }
  }

  /**
   * เลือกข้อความ
   */
  private select(text: string): void {
    this.text = text;
    let found: boolean = false;
    this.optionArray.forEach((element , index) => {

      if (this.text == element.text)
      {
        this.checkFavoriteBtn(element.favorite);
        found = true
        this.data = element.value;
        return;
      }
    });

    if (!found)
    {
      this.data = '';
      this.text = '';
    }
    this.dataChange.emit(this.data);
    this.showListOption = false;
    this.showClear = true;
  }

  /**
   * ทำเครื่องหมายรายการโปรด ที่ปุ่ม
   */
  private mark(): void {
    if (!this.disabled) {
      if(this.text.length <= 0) {
        console.log(this.optionArray);
        return;
      }

      let found: boolean = false;
      this.optionArray.forEach(element => {

        if (this.data == element.value)
        {
          found = true
          return;
        }
      });

      if (!found) {
        return;
      }

      this.objItem = {
        value     : this.data,
        text      : this.text,
        favorite  : this.btnMarkFavorite
      }
      this.checkFavoriteBtn(!this.btnMarkFavorite);
      this.callFavoriteRes(this.objItem);
    }
  }
  /**
   * ทำเครื่องหมายรายการโปรด ที่List
   */
  private markList(item): void {
    if(item.value != null && item.value.length >= 0) {
      this.callFavoriteRes(item);
    }
  }

  private selectedFavorite(value : string, favorite : boolean) : void {
    this.optionArray.forEach((element, index) => {
      if(element.value === value) {
        this.optionArray[index].favorite = favorite;
        return;
      }
    });
  }

  private callFavoriteRes(item) {
      this.changeFavorite.emit(item);
      this.selectedFavorite(item.value, !item.favorite);
  }

  private popup(): void {
    let text : any = this.text;
    let modal: Modal = this.modalCtrl.create(PopupPlanDetailComponent,{ plancode : this.data});
    modal.present();
  }

  private onKeyup(): void {
    if (this.isEdit)
      this.dataChange.emit(this.text);
      this.showClear = true;

  }
}
