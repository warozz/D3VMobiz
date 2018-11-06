import { Component, NgModule, OnInit, Input, Output, ElementRef, EventEmitter } from "@angular/core";
import { Platform } from "ionic-angular";


export class OptionItem {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
    selector: "select-option",
    templateUrl: "select-option.html"
  })

export class SelectOptionComponent {

  public isApp;

  @Input()
  datas: OptionItem[];

  @Input()
  data: any;

  @Input()
  labelName: string;

  @Output()
  dataChange:EventEmitter<any> = new EventEmitter();

  constructor(public platform:Platform) {
    
  }

  select(value) {
    this.dataChange.emit(value);
  }

}