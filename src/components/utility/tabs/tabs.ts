import { Component, ContentChildren, QueryList, Input, ViewChild, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { TabComponent } from './tab/tab';

/**
 * Generated class for the TabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {
  tabArrayLength: number = 0;

  constructor() {
    this.indexChange = new EventEmitter();
  }

  /**
   * component tab
   */
  private list: QueryList<TabComponent>;
  private tabArray: Array<TabComponent>;
  @ContentChildren(TabComponent) set setList(list: QueryList<TabComponent>) {
    
    if (typeof list != 'undefined') {
      this.list = list;
      this.tabArray = this.list.toArray();
      this.tabArrayLength = this.tabArray.length;
    }
  }
  

  /**
   * ปุ่มรายการเมนู
   */
  @ViewChildren('oneTab') private oneTab: QueryList<ElementRef>;
  private oneTabArray: Array<ElementRef>;

  /**
   * เลือกแสดงผล
   */
  //@Input('selectIndex') private index: number = 0;
  private index: number = 0;
  @Input('selectIndex') set setTabIndex(index: number) {
    this.index = index;
    if (typeof this.oneTabArray != 'undefined') {
      this.oneTabArray = this.oneTab.toArray();
      if(this.tabArray.length > 0){
        this.tab(index);
      }
    }
  }
  @Output('change') private indexChange: EventEmitter<number>;

  /**
   * เลือกรูปแบบ tab
   * 1 = รูปแบบที่ 1
   * 2 = รูปแบบที่ 2
   */
  @Input('tabStyle') private tabStyle: number = 1;

  /**
   * แสดง select tab
   * 0 = false
   * 1 = true
   */
  @Input('hasSelect') private hasSelect: number = 1;

  public ngAfterContentInit() {
   
  }

  public ngAfterViewInit() {
    this.oneTabArray = this.oneTab.toArray();
    if(this.tabArray.length > 0){
      this.tabArray[this.index].hidden = false;
      this.selectTitle = this.tabArray[this.index].title;
      this.selectIcon = this.tabArray[this.index].icon;
    }
    
  }

  /**
   * ชื่อ tab ที่ถูกเลือก
   */
  private selectTitle: string = '';

  /**
   * ชื่อ icon ที่ถูกเลือก
   */
  private selectIcon: string = '';

  /**
   * แสดง dropdown
   */
  private showSelect: boolean = false;

  /**
   * เลือก tab
   */
  private tab(index: number) {
    // ล้างค่าที่เคยคลิก เลือกค่าที่ตรงกัน
    this.showSelect = false;
    this.oneTabArray.forEach((element: ElementRef, i: number) => {
      if (i == index)
      {
        element.nativeElement.setAttribute('class', 'oneTab action');
        this.tabArray[i].hidden = false;
        this.selectTitle = this.tabArray[i].title;
        this.selectIcon = this.tabArray[i].icon;
      }
      else
      {
        element.nativeElement.setAttribute('class', 'oneTab');
        this.tabArray[i].hidden = true;
      }
    });

    this.indexChange.emit(index);
  }

  /**
   * เลือก dropdown tab
   */
  private tabDropdown() {
    if (this.tabArray.length > 1)
      this.showSelect = true;
  }
}
