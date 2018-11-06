import { ProvinceProvider } from './../../../providers/address/province/province';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

/**
 * Generated class for the ProvinceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'province',
  templateUrl: 'province.html'
})
export class ProvinceComponent implements OnInit {
  /**
   * ค่าที่เลือก
   */
  @Input() private data: string = '';

  @Input() set filter(filter: string) {
    this.filterRegion = filter;
    this.data = '';
    this.dataChange.emit(this.data);
  }
  
  private filterRegion: string = '';
  private dlprovince  =  [];
  private temprovince = [];

  @Output() dataChange: EventEmitter<string> = new EventEmitter();

  constructor(private provinceService: ProvinceProvider) {

  }

  public ngOnInit(): void {
    this.provinceService.getProvince().then(
      res=>{ 
        if(res.status.status == 'S'){
          this.dlprovince = res.body.datas;
          this.temprovince = res.body.datas;
        }
        else{
         this.dlprovince = [];
        }
      }
    );
  }

  private selectProvince(value: string): void {
    this.dataChange.emit(value);
  }
}
