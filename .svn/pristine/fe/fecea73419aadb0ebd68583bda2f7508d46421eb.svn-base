import { Component, Injectable } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Injectable()
export class MyService {
  counter = 180;
  tick = 1000;

  getCounter() {
    return Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter)
  }
}


/**
 * Generated class for the QrcodeModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qrcode-modal',
  templateUrl: 'qrcode-modal.html',
  providers: [MyService]
})
export class QrcodeModalComponent {

  text: string;
  imagePath : SafeResourceUrl = null;
  alive : boolean ;
  countDown;
  counter = 180;
  interval : number;
  constructor(private viewCtrl: ViewController,private  http: HttpClient ,private _sanitizer: DomSanitizer,private myService: MyService, private navParams: NavParams ) {
    //console.log('Hello QrcodeModalComponent Component');
    this.text = 'Hello World';
    this.alive = true;
    this.interval = 1000;
    console.log("model call navParams >> "+JSON.stringify(this.navParams.data));
    this.getQrcode(this.navParams.data);
    
  }

      /**
   * ปิด modal
   */
  public close(data :Object ) {
    this.viewCtrl.dismiss(data);
  }

  getQrcode(data){
    

      this.imagePath =  this._sanitizer.bypassSecurityTrustResourceUrl(data['image']);
      this.countDown = this.myService.getCounter().do(() => --this.counter);
      TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        let url : string = 'http://dev.thailife.com:8080/DigitalPServices/rest/digital/checkqrcode';
        let header: HttpHeaders = new HttpHeaders();
        header = header.set("Content-Type","application/json")
        this.http.post(url, '{"policyNo" : "249754"}' , {headers : header} )
          .subscribe(data => {
            //this.showChkQrCode = true;
            console.log(JSON.stringify(data));
            if(data['status'] == "0"){
              this.alive = false;
              this.close(data);
            }
          }, (err) => {
            alert(JSON.stringify(err));
              
          });
        console.log("---- interval ----"+this.counter);
        if(this.counter == 0){
          this.alive = false;
          this.close({});
        }
        
      });
  }

  chkData(){
    let url : string = 'http://dev.thailife.com:8080/DigitalPServices/rest/digital/qrcode';
    let header: HttpHeaders = new HttpHeaders();
          header = header.set("Content-Type","application/json")
    this.http.post(url, '{"policyNo" : "249754"}' , {headers : header} )
      .subscribe(data => {
         console.log(JSON.stringify(data['image']));
         this.imagePath =  this._sanitizer.bypassSecurityTrustResourceUrl(data['image']);
         this.countDown = this.myService.getCounter().do(() => --this.counter);
      }, (err) => {
        alert(JSON.stringify(err));
      });
  }


}



