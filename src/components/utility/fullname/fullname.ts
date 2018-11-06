import { Component, OnInit } from "@angular/core";

import { ViewController, NavParams } from "ionic-angular";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertDirective } from "../../../directives/extends/alert/alert";

/**
 * Generated class for the FullnameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "fullname",
  templateUrl: "fullname.html"
})
export class FullnameComponent implements OnInit {
  private fullnamePopupForm: FormGroup;
  private title: string = "";
  private age: number = 0;
  private prefix: string = "";
  private birthDate: string;

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
    private fb: FormBuilder,
    private alertCtrl: AlertDirective
  ) {}

  ngOnInit() {
    const {
      data: { info: infoUser }
    } = this.params;
    console.log("options-modal -> ", infoUser);
    console.log("this.params : ", this.params);

    this.birthDate = this.params.data.birthDate;

    this.title = (infoUser && infoUser['title']) ? infoUser['title']: '';
    this.age = (infoUser && infoUser['age']) ? Number(infoUser['age']): 0;
    this.prefix = (infoUser && infoUser["prefix"]) ? infoUser["prefix"] : "";
    
    this.fullnamePopupForm = this.fb.group({
      prefix: [(infoUser && infoUser["prefix"]) ? infoUser["prefix"] : "", Validators.required],
      firstName: [(infoUser && infoUser["firstName"]) ? infoUser["firstName"] : "", Validators.required],
      lastName: [(infoUser && infoUser["lastName"]) ? infoUser["lastName"] : "", Validators.required]
    });
  }

  private submit() {
    console.log("popup -> ",this.fullnamePopupForm);
    if (this.fullnamePopupForm.invalid) {
      Object.keys(this.fullnamePopupForm.controls).forEach(key => {
        console.log('key of appSign Page : ', key);
        this.fullnamePopupForm.get(key).markAsDirty();
      });
      this.alertCtrl.warning("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      
      return;
    }
    // this.viewCtrl.dismiss(0);
    this.viewCtrl.dismiss(this.fullnamePopupForm);
  }

  public close() {
    this.viewCtrl.dismiss();
  }
}
