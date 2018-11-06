import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the SignalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'signal',
  templateUrl: 'signal.html'
})
export class SignalComponent {
  
  /**
   * ระดับสัญญาณ
   * < 0 ไม่มีสัญญาณ
   * 0 สัญญาณอ่อนมาก
   * 1 สัญญาณอ่อน
   * 2 สัญญาณปานกลาง
   * > 2 สัญญาณแรง
   */
  private signal = 0;

  constructor(
    private network: Network, 
    private storage: Storage,
    private platform: Platform) {
      this.watchSignal();
  }

  /**
   * เฝ้าดูระดับสัญญาณ
   * @param second ความถี่ในการตรวจจับ
   */
  private watchSignal(second = 5): void
  {
    this.checkSignal();
    
    let ms = second * 1000;
    setInterval(() => {
      this.checkSignal();
    }, ms);
  }

  /**
   * ตรวจสอบระดับสัญญาณ
   * @return ระดับสัญญาณ
   */
  private checkSignal(): void
  {
    if (!this.platform.is('core') && !this.platform.is('mobileweb') && this.network.type == 'none')
      this.signal = -1;
    else
    {
      // ping
      this.signal = Math.round(Math.random() * 5);
    }
  }
}
