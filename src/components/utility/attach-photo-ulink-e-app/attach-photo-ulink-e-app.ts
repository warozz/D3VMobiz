import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewController, ActionSheetController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'attach-photo-ulink-e-app',
  templateUrl: 'attach-photo-ulink-e-app.html'
})
export class AttachPhotoUlinkEAppComponent {
  
  @Output() dataChange: EventEmitter<string>;

  private photos: any;
  private base64Image: string;

  /**
   * รูปภาพ base64
   */
  private result: object = {
    attribute01: '', // base64 img
    attribute02: '13', // type doc id
    attribute03: 'รูปผู้เอาประกัน',// type doc desc
    filePath:'',
    filetype: 'jpeg' // jpeg
  };

  constructor(private viewCtrl: ViewController
    , private camera: Camera
    , public actionSheetCtrl: ActionSheetController
    , public toastCtrl: ToastController
    , public platform: Platform
    , public loadingCtrl: LoadingController) {
  
  }

  ngOnInit(): void {
    this.photos = [];
  }

  /**
   * เวลา user กดปุ่มจาก Modal Attach File
   */
  public presentAction() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);    
   }

  public takePicture(sourceType) {
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
  
        this.result['attribute01'] = this.base64Image;

      this.photos.push(this.base64Image);
      this.photos.reverse();

     
    }, (err) => {
      this.presentToast('Error Can not upload image.');
    });
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
