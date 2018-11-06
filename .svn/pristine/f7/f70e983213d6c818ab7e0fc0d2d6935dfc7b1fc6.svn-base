import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

interface BroadcastEvent {
  key: string;
  data?: any;
}

@Injectable()
/**
 * คลาสสำหรับประค่าตัวแปรให้ใช้งานได้จากทุกหน้า
 */
export class Broadcaster {

  private _broadcasts: BehaviorSubject<BroadcastEvent>;

  constructor() {
    this._broadcasts = <BehaviorSubject<any>> new BehaviorSubject({});
  }

  /**
   * ประกาศค่าตัวแปร
   * @param key ชื่ออ้างอิง
   * @param data ข้อมูลที่ต้องการประกาศ
   */
  public broadcast(key: string, data?: any) {
    this._broadcasts.next(Object.assign({}, { key, data }));
  }

  /**
   * อ่านค่าจากชื่ออ้างอิง
   * @param key ชื่ออ้างอิง
   */
  public on<T>(key: string): Observable<any> {
    return this._broadcasts.asObservable()
      .filter(event => event.key === key)
      .map(event => <any>event.data);
  }

  public count(): void {
    console.log('<<< count broadcast >>> ' + this._broadcasts.observers.length);
  }
}
