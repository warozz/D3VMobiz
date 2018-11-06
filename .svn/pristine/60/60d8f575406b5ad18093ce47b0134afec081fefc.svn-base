import { FilePath } from '@ionic-native/file-path';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import {CameraPopoverOptions,    Camera,     CameraOptions} from '@ionic-native/camera';
import { TransferObject, Transfer, FileUploadOptions } from '@ionic-native/transfer';
import { CordovaOptions } from '@ionic-native/core';
import { Base64 } from '@ionic-native/base64';

/**
 * Generated class for the AttachFileEAppModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'attach-file-e-app-modal',
  templateUrl: 'attach-file-e-app-modal.html'
})
export class AttachFileEAppModalComponent {


  @Input()  dataDocType: string = '01;บัตรประจำตัวประชาชน';
  @Output() dataChange: EventEmitter<string>;

  private photos: any;
  private base64Image: string;
  private lastImage: string = null;
  private loading: Loading;

  // private result = {
  //   docType: [],
  //   image: []
  // };
  /**
   * รูปภาพ base64
   */
  private result: object = {
    attribute01: '', // base64 img
    attribute02: '', // type doc id
    attribute03: '',// type doc desc
    filePath:'',
    filetype: 'jpeg' // jpeg
  };

  constructor(private navCtrl: NavController, 
    private camera: Camera,
    private transfer: Transfer,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    private base64: Base64) {

  }

  
  ngOnInit() {
    this.photos = [];
  }

  /**
   * เวลา user กดปุ่มจาก Modal Attach File
   */
  presentAction() {
   this.takePicture(this.camera.PictureSourceType.CAMERA);    
  }

    
  takePicture(sourceType) {
    // Create options for the Camera Dialog
  

    var options: CameraOptions = {
      quality: 25,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      popoverOptions: { 
        x : 0, 
        y :  32,
        width : 32,
        height : 48,
        arrowDir : this.camera.PopoverArrowDirection.ARROW_ANY
      },
      targetHeight: 500,
      targetWidth: 500
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
     
        this.base64Image = imagePath;

        let arrDataDocType: Array<string> = this.dataDocType.split(';')
  
        this.result['attribute01'] = this.base64Image;
        this.result['attribute02'] = arrDataDocType[0];
        this.result['attribute03'] = arrDataDocType[1];

      this.photos.push(this.base64Image);
      this.photos.reverse();

     
    }, (err) => {
      this.presentToast('Error Can not upload image.');
    });
  }



// Copy the image to a local folder

 
presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

private select(): void {
  this.dataChange.emit(this.dataDocType);
}
 

      /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }

  private saveEAppPhotoModal() {
    this.viewCtrl.dismiss(this.result);
  }
}
