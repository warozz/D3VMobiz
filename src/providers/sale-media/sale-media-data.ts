import { Injectable } from '@angular/core';
import { MediaM } from "./media-model";
import _ from "lodash";

@Injectable()
export class SaleMediaData {
  // Consept เนื่องจาก Media pdf เป็นข้อมูลที่ค่อนข้างจะไม่เปลี่ยนแปลง จึงเอาชื่อ pdf มาเก็บเป็น key เพื่อที่จะได้ไม่ต้องไป request ข้อมูลใหม่จาก server

  /**
   * ตัวอย่างเอกสารประกอบการขาย
   */
  public medias: Array<MediaM>;

  /**
   * เซต PDF เข้ามีเดีย
   */
  public setMedia(data)
  {
    let arr = [];
    const key = _.replace(data.documentname, '.pdf', '');
    arr[key] = data;
    this.medias = arr;
  }
  
  /**
   * เรียกข้อมูล มีเดียจาก key ที่ส่งเข้ามา
   */
  public getMedia(key)
  {
    return this.medias[key];
  }

  /**
   * @param {string} key
   */
  public mediaExist(key): boolean
  {
    if (typeof this.medias === 'undefined')
      return false;
    return this.medias[key] != undefined;
  }
}