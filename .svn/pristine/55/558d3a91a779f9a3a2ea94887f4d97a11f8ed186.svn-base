import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Component, ContentChildren, QueryList, Input, ElementRef, ViewChildren, ContentChild, TemplateRef, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { StepComponent } from './step/step';

/**
 * Generated class for the StepComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'steps',
  templateUrl: 'steps.html'
})
export class StepsComponent implements AfterContentInit, AfterViewInit {

  constructor(private navCtrl: NavController) {
    this.indexChange = new EventEmitter();
  }

  private list: QueryList<StepComponent>;
  private stepArray: Array<StepComponent>;

  /**
   * component step
   */
  @ContentChildren(StepComponent) set setList(list: QueryList<StepComponent>) {
    
    if (typeof list != 'undefined') {
      this.list = list;
      this.stepArray = this.list.toArray();
      this.total = this.stepArray.length;
    }
  }

  /**
   * ปุ่มรายการเมนู
   */
  private oneStep: QueryList<ElementRef>;
  private oneStepArray: Array<ElementRef>;
  @ViewChildren('oneStep') set setOneStep(oneStep: QueryList<ElementRef>) {
    this.oneStep = oneStep;
    this.oneStepArray = this.oneStep.toArray();
        
    this.oneStepArray.forEach((element: ElementRef, i: number) => {
      if (i == this.index) {
        element.nativeElement.setAttribute('area-selected', 'true');
        this.stepArray[i].hidden = false;
        this.selectTitle = this.stepArray[i].title;
        this.index = this.index;
      } else {
        element.nativeElement.setAttribute('area-selected', 'false');
        this.stepArray[i].hidden = true;
      }
    });
  }

  /**
   * action button
   */
  @ContentChild('action') actionTemp: TemplateRef<any>;

  /**
   * เลือกแสดงผล
   */
  private index: number = 0;
  @Input('selectIndex') set setIndex(index: number) {
    if (typeof this.oneStepArray != 'undefined' && this.total > 0) {
      this.oneStepArray.forEach((element: ElementRef, i: number) => {
        if (i == index) {
          element.nativeElement.setAttribute('area-selected', 'true');
          this.stepArray[i].hidden = false;
          this.selectTitle = this.stepArray[i].title;
          this.index = index;
        } else {
          element.nativeElement.setAttribute('area-selected', 'false');
          this.stepArray[i].hidden = true;
        }
      });
     
      //หาตำแหน่ง stepPage
      const dwDisabledTab = this.dropWhile(this.stepArray);
      this.stepPage = dwDisabledTab.indexOf(index) != -1 ? dwDisabledTab.indexOf(index) : 0;
    }

    this.index = index;
    
  }
  @Output('change') private indexChange: EventEmitter<number>;
  
  @Output('changeIndex') private changeIndex: EventEmitter<number> = new EventEmitter();

  /**
   * แสดงปุ่ม action
   */
  @Input('showAction') private showAction: number = 1;

  /**
   * รูปแบบ design
   */
  @Input('design') private design: number = 1;

  @Input('disabled') private disabled: false;

  @Input('prevPage') private prevPage: string;
  @Input('nextPage') private nextPage: string;

  /**
   * รายชื่อ Event
   */
  private event = {
    "click" : "click",
    "decrease"  : "decrease",
    "increase"  : "increase"
  }

  public ngAfterContentInit(): void {
    // this.stepArray = this.list.toArray();
    // this.total = this.stepArray.length;

    // setTimeout(() => {
    //   const dwDisabledTab = this.dropWhile(this.stepArray);
    //   this.last = dwDisabledTab[dwDisabledTab.length - 1];
    // }, 1000);
  }

  public ngAfterViewInit(): void {
    this.oneStepArray = this.oneStep.toArray();
    if(this.stepArray.length > 0){
      this.stepArray[this.index].hidden = false;
      this.selectTitle = this.stepArray[this.index].title;
    }
    
  }

  /**
   * ชื่อ step ที่ถูกเลือก
   */
  private selectTitle: string = '';

  /**
   * จำนวน step
   */
  private total: number;

  /**
   * ตำแหน่ง Page ใน dropWhile function
   * dropWhile ตรงข้าม filter
   */
  private stepPage: number = 0;
  private last: number;
  private dropWhile = (arr) => arr
    .filter( item => !item.disabledTab )
    .map( item => item.id );
  /**
   * เลือก step
   */
  private step(index: number, event?: string) {
    
    // alert(index + ' ' + this.oneStepArray.length);

    if (index == this.index)
      return;

    if (index < 0 && this.prevPage) {
      this.navCtrl.setRoot(this.prevPage);
      return;
    }
    else if (index == this.total && this.nextPage) {
      this.navCtrl.setRoot(this.nextPage);
      return;
    }


    this.changeIndex.emit(index);

    if (this.disabled)
      return;

    const dwDisabledTab = this.dropWhile(this.stepArray);
    const first : number = dwDisabledTab[0];
    const last  : number = dwDisabledTab[dwDisabledTab.length - 1];
    // event true :  click()
    // event false : another events;
    // ตรวจสอบแทบ disabled
    if (typeof event != 'undefined') {
      if(event == this.event.click && this.stepArray[index].disabledTab) {
        return;
      } else if(event != this.event.click) {
        if(event == this.event.increase) { index = dwDisabledTab[++this.stepPage]; index == undefined ? index = last: index }
        if(event == this.event.decrease) { index = dwDisabledTab[--this.stepPage]; index == undefined ? index = first: index } 
      }
    }
    // ล้างค่าที่เคยคลิก เลือกค่าที่ตรงกัน
    this.oneStepArray.forEach((element: ElementRef, i: number) => {
      if (i == index) {
        element.nativeElement.setAttribute('area-selected', 'true');
        this.stepArray[i].hidden = false;
        this.selectTitle = this.stepArray[i].title;
        this.index = index;
      } else {
        element.nativeElement.setAttribute('area-selected', 'false');
        this.stepArray[i].hidden = true;
      }
    });
    this.last = last;
    //หาตำแหน่ง stepPage
    this.stepPage = dwDisabledTab.indexOf(index) != -1 ? dwDisabledTab.indexOf(index) : 0;
    this.indexChange.emit(index);   

    //alert('clickStep ' + index);
  }
}