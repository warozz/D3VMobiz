import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';

@Injectable()
export class RiderConfig {

  constructor(
    private http: HttpClient,
    private storage: Storage) {

  }
  
  /**
   * ชื่อรหัสสัญญาเพิ่มเติม
   */
  private riderCode: any = {
    // อ.1
    AC01: 'AC01',
    // ตอ.1
    TAC01: 'TAC01',
    // ฆจ.1
    KG1: 'KG1',
    // ตฆ.1
    TKG1: 'TKG1',
    // อ.2
    AC02: 'AC02',
    // ตอ.2
    TAC02: 'TAC02',
    // ฆจ.2
    KG2: 'KG2',
    // ตฆ.2
    TKG2: 'TKG2',
    // อ.3
    AC03: 'AC03',
    // สร.2
    SR2: 'SR2',
    // ฉพ.
    JP: 'JP',
    // รพ.
    RP: 'RP',
    // ตรพ.
    TRP: 'TRP',
    // รพ.โกลด์
    RPG: 'HCG',//'HCG',
    // ทร.
    D01: 'D09',
    // ทร.44
    D02: 'D10',
    // ทร.ตลอดชีพ
    D03: 'D03',
    // สพ.
    H: 'H',
    // สพ.เด็ก
    J0: 'J0',
    // ตสพ.
    TH: 'TH',
    // สพ.โกลด์
    G: 'G',
    // วพ.
    VP: 'VP',
    // สมาร์ท วีไอพี
    V: 'V',
    // วพ.5
    VP5: 'VP5',
    // คบ
    KB2: 'KB2',
    KB2_1: 'KB2_1',
    // ค่าห้องสูงสุด
    UW: 'UW'
  };

  /**
   * ชื่อรหัสสัญญาเพิ่มเติมที่ผูกกับแบบประกัน
   */
  private riderCodeForPlan: Array<string> = [
    // รพ.
    'RP.SN',
    'RP.WN',
    // รพ.โกลด์
    'HCG.SN',
    'HCG.WN',
    // สพ.โกลด์.
    'G.SN'
  ];

  /**
   * ชื่อรหัสสัญญาเพิ่มเติมแฝง
   */
  private riderHiddenCode: Array<string> = [
    'C00',
    'C01',
    'C02',
    'C11',
    'C12',
    'D08',
    'HA',
    'HD',
    'TT',
    'AP5',

    'D13',
    'HD1',
    'C07',
    'HA1',
    'TT1',
    'C04',
    'C05',
    'C13',
    'C14',

    'A00'
  ];

  /**
   * ชื่อรหัสสัญญาเพิ่มเติม
   * @param value key = ดึงคีย์อ้างอิงสัญญาเพิ่มเติม | code = ดึงรหัสสัญญาเพิ่มเติม
   */
  public getRiderCode(value?: string): any {
    if (typeof value == 'undefined') {
        return this.riderCode;
    }
    else {
        let keys: Array<string> = [];
        let values: Array<string> = [];
        for (let key in this.riderCode) {
            keys.push(key);
            values.push(this.riderCode[key]);
        }

        if (value == 'key')
            return keys;
        else
            return values;
    }
  }

  /**
   * ชื่อรหัสสัญญาเพิ่มเติม
   * @param code คีย์อ้างอิง
   */
  public rider(code: string): string {
    if (typeof this.riderCode[code] != 'undefined')
        return this.riderCode[code];
    else
        return code;
  }

  public getRiderCodeForPlan(): Array<string> {
    return this.riderCodeForPlan;
  }

  public getRiderHiddenCode(): Array<string> {
    return this.riderHiddenCode;
  }

  /**
   * ตั้งค่า
   */
  private config: object = {};

  /**
   * จำนวนสัญญาเพิ่มเติมพี่พร้อมใช้งาน
   */
  private ready: number = 0;

  /**
   * โหลด config สัญญาเพิ่มเติมทั้งหมด
   */
  public initConfig(): Promise<null> {

    return new Promise((resolve, reject) => {
      const allRiderCode: Array<string> = this.getRiderCode('code').concat(this.riderCodeForPlan);

      // default
      if (this.ready != allRiderCode.length) {
        allRiderCode.forEach(code => {
          this.config[code] = {
            rider: '',
            age: {
              min: null,
              max: null
            },
            steps: null,
            sum: {
              min: null,
              max: null
            },
            disabled: false,
            active: false,
            min: 0,
            minAlert: '',
            max: 999999999,
            maxAlert: '',
            zero: 0
          };

          if (code == this.rider('KB2')) {
            // this.changeBuyKB2(false);
          }
          else {
            this.rider[code] = {
              sum: 0,
              premium: '000000000'
            };
          }
        });

        // default
        this.riderHiddenCode.forEach(code => {
          this.rider[code] = {
            sum: 0,
            premium: '000000000'
          };
        });

        // this.premCal.setRider(this.rider);

        // ระดับสิทธิ์ตัวแทน
        this.storage.get('loginProfile').then(profile => {

          // config
          let allRiderCode: Array<string> = this.getRiderCode('code').concat(this.riderCodeForPlan);
          allRiderCode.forEach(code => {
            // ตั้งค่าสัญญาเพิ่มเติม
            this.http.get('assets/json/rider/'+ code +'.json').subscribe(config => {

              // ใช้ชื่อรหัสสัญญาเพิ่มเติมใหม่
              code = this.rider(code);

              // กรณีแบ่งตาม permission มากกว่า 1 ระดับสิทธิ์
              if (typeof config['agent'] != 'undefined') {
                let length: number = config['agent'].length;
                if (length == 1)
                  // มีระดับสิทธิ์เดียว
                  this.config[code] = config['agent'][0];
                else {
                  switch (profile.perrmissionAgent.trim().toLocaleLowerCase()) {
                    case 'normal':
                      this.config[code] = config['agent'][0];
                      break;
                    case 'q up':
                      this.config[code] = config['agent'][1];
                      break;
                    case 'top up':
                      this.config[code] = config['agent'][2];
                      break;
                    case 'top up plus':
                      if (length > 3)
                        // กรณีมีเงื่อนไขระดับ Top UP plus
                        this.config[code] = config['agent'][3];
                      else
                        // กรณีไม่มีเงื่อนไขระดับ Top UP plus ใช้ Top UP แทน
                        this.config[code] = config['agent'][2];
                      break;
                    default:
                      this.config[code] = config['agent'][0];
                  }
                }
                this.config[code].rider = config['rider'];
                if (typeof config['age'] != 'undefined')
                  this.config[code].age = config['age'];
                if (typeof config['steps'] != 'undefined')
                  this.config[code].steps = config['steps'];
                if (typeof config['rule'] != 'undefined')
                  this.config[code].rule = config['rule'];
              }
              else
                this.config[code] = config;

              this.config[code].disabled = false;
              this.config[code].active = false;
              this.config[code].min = 0;
              this.config[code].minAlert = '';
              this.config[code].max = 999999999;
              this.config[code].maxAlert = '';
              this.config[code].zero = 0;

              // if (code == this.conf.rider('KB2')) {
              //   this.minKB2Date = moment().subtract(Number(this.config[code].age.max.replace('y', '')), 'year').format('YYYY-MM-DD');
              //   this.maxKB2Date = moment().subtract(Number(this.config[code].age.min.replace('y', '')), 'year').format('YYYY-MM-DD');
              // }

              this.ready ++;
              if (this.ready == allRiderCode.length) {
                resolve();
              }
            });
          });
        });
      }
      else {
        resolve();
      }
    });
  }

  public getConfig(): Promise<string> {

    return new Promise((resolve, reject) => {
      if (this.ready == this.getRiderCode('code').concat(this.riderCodeForPlan).length)
        resolve(JSON.stringify(this.config));
      else {
        setTimeout(() => {
          this.getConfig().then(res => {
            resolve(res);
          })
        }, 100);
      }
    });
  }
}