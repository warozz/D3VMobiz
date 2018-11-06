import { Component, Input, HostBinding, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';

/**
 * Generated class for the TabComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tab',
  templateUrl: 'tab.html'
})
export class TabComponent {

  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;
  /**
   * เนื้อหาภายใน
   */
  @Input() set root(page: any) {

    let component: ComponentFactory<object> = this.resolver.resolveComponentFactory(page);
    this.content.createComponent(component);

  }

  /**
   * ไอคอน
   */
  @Input('tabIcon') public icon: string;

  /**
   * ชื่อเรื่อง
   */
  @Input('tabTitle') public title: string;

  /**
   * ซ่อน / แสดง tab
   */
  @Input('disabled') public disabledTab: boolean = false;


  /**
   * ซ่อน / แสดง เนื้อหา
   */
  @HostBinding('attr.area-hidden') public hidden: boolean = true;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    
  }
}
