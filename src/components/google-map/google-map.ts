import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, Platform, ViewController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";

declare var google;

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;

  // constructor(
  //   private viewCtrl: ViewController,
  //   private platform: Platform,
  //   private geolocation: Geolocation,
  //   private events: Events
  // ) {}

  // ngOnInit() {
  //   this.platform.ready()
  //     .then(()=> {
  //       if(this.platform.is('core')) {
  //         this.loadWebMap();
  //       }

  //       if(this.platform.is('mobile')) {
  //         this.loadMobileMap();
  //       }
  //     })
  // }

  // close(){
  //   let currentPosition = null;

  //   if (this.map === null) {
  //     currentPosition = null;
  //   } else if (this.platform.is('core')) {
  //     currentPosition = {
  //       'lat': this.map.getCenter().lat(),
  //       'lng': this.map.getCenter().lng()
  //     };
  //   } else if (this.platform.is('mobile')) {
  //     currentPosition = {
  //       'lat': this.map.getCameraTarget().lat,
  //       'lng': this.map.getCameraTarget().lng
  //     };
  //     this.events.publish('google-map-event', currentPosition);
  //   } else {
  //     console.log('platform not support.');
  //   }

  //   this.viewCtrl.dismiss(currentPosition);
  // }

  // loadWebMap() {
  //   let latLng = new google.maps.LatLng(13.7676405, 100.5708195);
  //   let marker = undefined;
  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 17,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //   if (this.map) {
  //     // this.map.setMyLocationEnabled(true);
  //     this.map.addListener('center_changed', ()=> {
  //       let latLng = new google.maps.LatLng(this.map.getCenter().lat(), this.map.getCenter().lng());
  //       if (marker) {
  //         marker.setMap(null);
  //       }
  //       marker = new google.maps.Marker({
  //         position: latLng,
  //         map: this.map,
  //         title: 'Your Location'
  //       });
  //     });
  //   }

  //   this.geolocation.getCurrentPosition()
  //     .then((position)=> {
  //       latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //       this.map.setCenter(latLng);
  //     })
  //     .catch((error)=> {
  //       console.warn('cannot get current location '+JSON.stringify(error));
  //     });
  // }

  // loadMobileMap() {
  //   console.log("Load Mobile Success.");
  //   let currentMarker = undefined;
  //   let createdMarker = false;

  //   console.log('Eter loadMap.');
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: 13.7676405,
  //         lng: 100.5708195
  //       },
  //       zoom: 17,
  //       tilt: 30
  //     }
  //   };

  //   this.map = GoogleMaps.create('map', mapOptions);

  //   // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY)
  //     .then(() => {

  //       let markLocation = function(map, lat, long) {
  //         console.log("currentMarker="+currentMarker+', createdMarker='+createdMarker);
  //         if (currentMarker === undefined) {
  //           let option = {
  //             'icon': 'red',
  //             'position': {
  //               'lat': lat,
  //               'lng': long
  //             }
  //           };
  //           map.addMarker(option)
  //             .then(marker => {
  //               if (currentMarker===undefined && createdMarker===false) {
  //                 createdMarker = true;
  //                 currentMarker = marker;
  //                 map.setCameraTarget(option.position);
  //                 console.log("created Marker");
  //               } else {
  //                 marker.remove();
  //               }
  //             })
  //             .catch(error=> {
  //               console.log('cannot add mark. reaseon='+JSON.stringify(error))
  //             });
  //         } else if (currentMarker!==undefined) {
  //           currentMarker.setPosition({
  //             'lat': lat,
  //             'lng': long
  //           })
  //         }

  //       };


  //       this.map.on(GoogleMapsEvent.CAMERA_MOVE)
  //         .subscribe(() => {
  //           markLocation(this.map, this.map.getCameraTarget().lat, this.map.getCameraTarget().lng);
  //         });

  //       this.map.getMyLocation()
  //         .then((location)=> {
  //           markLocation(this.map, location.latLng.lat, location.latLng.lng);
  //         })
  //         .catch((reason) => {
  //           console.warn("cannot get location reason=" + (<any>JSON).stringify(reason));
  //         });

  //       // Now you can use all methods safely.
  //       // this.map.addMarker({
  //       //     title: 'Ionic',
  //       //     icon: 'blue',
  //       //     animation: 'DROP',
  //       //     position: {
  //       //         lat: 43.0741904,
  //       //         lng: -89.3809802
  //       //     }
  //       // })
  //       //     .then(marker => {
  //       //         marker.on(GoogleMapsEvent.MARKER_CLICK)
  //       //             .subscribe(() => {
  //       //                 alert('clicked');
  //       //             });
  //       //     });

  //     })
  //     .catch((error) => {
  //       console.warn("Error"+JSON.stringify(error));
  //     });
  // }

  private latitude: number = 13.7676405;
  private longitude: number = 100.5708195;

  /**
   * ดึง map element
   */
  @ViewChild('map') private mapElement: ElementRef;

  /**
   * google map
   */
  private map: any;

  private fixedPin: boolean = false;

  constructor(private geolocation: Geolocation, private viewCtrl: ViewController) {

  }

  public ngAfterViewInit(): void {
    this.getLocation();
    this.setMap();
  }

  /** 
   * ดึงค่าตำแหน่งที่อยู่
   */
  private getLocation(): void {

    // ดึงพิกัดปัจจุบัน แบบละเอียดสูงสุด
    this.geolocation.getCurrentPosition({enableHighAccuracy:true}).then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      /** 
       * ระดับความแม่นยำ
       */
      let accuracy = resp.coords.accuracy;

      this.setMap();
    });
  }

  private setMap(): void {

    let latLng = new google.maps.LatLng(this.latitude, this.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    // https://developers.google.com/maps/documentation/javascript/examples/layer-traffic
    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);

    // move map
    if (this.map) {
      this.map.addListener('center_changed', () => {
        //let latLng = new google.maps.LatLng(this.map.getCenter().lat(), this.map.getCenter().lng());
        if (marker) {
          marker.setMap(null);
          this.fixedPin = true;
        }
        // marker.setPosition(this.map.getCenter()); 
        // marker = new google.maps.Marker({
        //   position: latLng,
        //   map: this.map
        // });
      });
    }
  }

  private saveMapModal(): void {

    let currentPosition = {
      'lat': this.map.getCenter().lat(),
      'lng': this.map.getCenter().lng()
    };

    this.viewCtrl.dismiss(currentPosition);
  }
     /**
   * ปิด modal
   */
  public close() {
    this.viewCtrl.dismiss();
  }
}
