import { Component, Input, HostBinding, ComponentFactoryResolver, ViewChild, ViewContainerRef, Type, ComponentFactory } from '@angular/core';

/**
 * Generated class for the StepContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'step',
  templateUrl: 'step.html'
})
export class StepComponent {

  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;
  /**
   * เนื้อหาภายใน
   */
  @Input() set root(page: Type<object>) {

      let component: ComponentFactory<object> = this.resolver.resolveComponentFactory(page);
      let instance = this.content.createComponent(component).instance;

    
  }

  /**
   * ไอคอน
   */
  @Input('stepIcon') public icon: string;

  /**
   * ชื่อเรื่อง
   */
  @Input('stepTitle') set stepTitle(title: string) {
    this.titleArray = title.split(' ');
    this.title = title.replace(' ', '');
  }
  private titleArray: Array<string>;
  public title: string;

  /**
   * ซ่อน / แสดง เนื้อหา
   */
  @HostBinding('attr.area-hidden') public hidden: boolean = true;

  /**
   * ซ่อน / แสดง tab
   */
  @Input('disabled') public disabledTab: boolean = false;
  /**
   * tab id
   */
  @Input('index') public id: number = 0;

  /**
   * เลือกรูปแบบ tab
   * 1 = รูปแบบที่ 1
   * 2 = รูปแบบที่ 2
   */
  @Input('stepStyle') private tabStyle: number = 1;

  /**
   * แสดง select tab
   * 0 = false
   * 1 = true
   */
  @Input('hasSelect') private hasSelect: number = 1;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    
  }
}