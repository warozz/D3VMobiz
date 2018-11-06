import { Response } from '@angular/http';
import { RegionProvider } from './../../../providers/address/region/region';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * Generated class for the RegionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'region',
  templateUrl: 'region.html'
})
export class RegionComponent implements OnInit {
  /**
   * ค่าที่เลือก
   */
  private dlRegion = [];
  @Input() private data: string;
  @Output() private dataChange: EventEmitter<any> = new EventEmitter();
  @Output() private dataShow: EventEmitter<string[]> = new EventEmitter();

  constructor(private regionService: RegionProvider) {}

  public ngOnInit(): void {
    this.regionService.getRegion()
    .then(
      res=>{ 
        if(res.status.status == 'S'){
          this.dlRegion = res.body;
        }
        else{
          this.dlRegion = [];
        }
      }
    );
  }

  private selectRegion(): void {
    this.dataChange.emit(this.data);
    this.dataShow.emit(this.dlRegion);
  }


}
