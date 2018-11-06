import { ViewController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Component, Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
/**
 * Generated class for the CalculatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calculator',
  templateUrl: 'calculator.html'
})
export class CalculatorComponent {

  private buttonArray = {
    portrait: [ '1', '2', '3', 'C', '4', '5', '6', '<', '7', '8', '9', 'ล้าน', '0', '00', 'หมื่น', 'แสน' ],
    landscape: [ '1', '2', '3', '4', '5', 'หมื่น', 'แสน', 'ล้าน', '6', '7', '8', '9', '0', '00', '<', 'C' ],
  };

  private buttonMiniArray = {
    portrait: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<' ],
    landscape: [ '1', '2', '3', '4', '5', 'C', '6', '7', '8', '9', '0', '<' ],
  };

  private caption: string = 'ระบุตัวเลข';
  private style: string = 'full';
  private digit: number = 9;

  constructor(
    private viewCtrl: ViewController, 
    private params: NavParams) {
    this.number = String(this.params.get('number'));

    if (this.params.get('caption') != null)
      this.caption = this.params.get('caption');

    if (this.params.get('style') != null)
      this.style = this.params.get('style');

    if (this.params.get('digit') != null)
      this.digit = this.params.get('digit');
  }

  /**
   * ปิด modal
   */
  private close(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * ตกลง
   */
  private submit(): void {
    this.viewCtrl.dismiss(this.number);
  }

  /**
   * ตัวเลข
   */
  private number: string = '0';
  private calculator(key): void
  {
    switch (key) {
      case 'C':
        this.number = '0';
        break;
      
      case '<':
        if (this.number.length == 1)
          this.number = '0';
        else
          this.number = this.number.substring(0, this.number.length - 1);
        break;

      case 'หมื่น':
        this.getNumber('0000');
        break;

      case 'แสน':
        this.getNumber('00000');
        break;

      case 'ล้าน':
        this.getNumber('000000');
        break;
      
      default:
        this.getNumber(key); 
    }
  }

  /**
   * ใส่ตัวเลข
   */
  private getNumber(key: String): void {
    if (this.number == '0')
      this.number = '';

    let array: Array<string> = key.split('');
    array.forEach(num => {
      if (this.number.length < this.digit && !(num == '0' && this.number == '0'))
        this.number += num;
    });
  }
}

@Directive({
  selector: '[calculator-incrementer]' // Attribute selector
})
export class Calculator {

  @Input() private data: number = 0;
  @Output() private dataChange: EventEmitter<number>;

  @Input('caption') private caption: string;

  constructor(private modalCtrl: ModalController, private elementRef: ElementRef) {
    this.dataChange = new EventEmitter();
    let element: Element = this.elementRef.nativeElement;
    element.setAttribute('readonly', 'readonly');
  }

  @HostListener('click', ['$event']) private onclick(event): void {
    let data: object = { number: this.data, caption: this.caption };
    let modal: Modal = this.modalCtrl.create(CalculatorComponent, data, {cssClass: 'calculator'});
    modal.present();

    modal.onDidDismiss(data => {
      if (data != null)
        this.dataChange.emit(Number(data));
    });
  }
}
