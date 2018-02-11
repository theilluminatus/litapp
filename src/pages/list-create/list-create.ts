import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { List } from '../../models/list';

@IonicPage()
@Component({
  selector: 'page-list-create',
  templateUrl: 'list-create.html'
})
export class ListCreatePage {

  isReadyToSave: boolean;
  list: List;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    fb: FormBuilder
  ) {

    this.list = navParams.get('list');
    this.form = fb.group({
      id: [this.list ? this.list.id : -1 , Validators.required],
      name: [this.list ? this.list.name : '', Validators.required],
      description: [this.list ? this.list.description : ''],
      visibility: [this.list ? this.list.visibility : null],
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) return;

    let isNewList = !this.list;
    if (isNewList) {
      this.list = new List({});
    }

    this.list.name = this.form.value.name;
    this.list.description = this.form.value.description;
    this.list.visibility = this.form.value.visibility;

    if (isNewList) {
      this.navCtrl.pop().then(() => {
        this.navParams.get('callback')(this.list);
      });
      return;
    }
      
    // TODO: persist new and edited lists to server
    this.viewCtrl.dismiss();
  }
}
