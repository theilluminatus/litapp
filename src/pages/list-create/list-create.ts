import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { List } from '../../models/list';
import { Lists } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-create',
  templateUrl: 'list-create.html',
})
export class ListCreatePage {
  isReadyToSave: boolean;
  form: FormGroup;
  isNew: boolean = true;
  callback;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public l: Lists,
    fb: FormBuilder,
  ) {
    this.callback = navParams.get('callback');

    const list = navParams.get('list');
    if (list) {
      this.isNew = false;
    }

    this.form = fb.group({
      id: [list ? list.id : ''],
      name: [list ? list.name : '', Validators.required],
      description: [list ? list.description : '', Validators.required],
      visibility: [list ? `'${list.visibility}'` : "'true'"],
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) return;

    const templist = new List({
      id: this.form.value.id,
      name: this.form.value.name,
      description: this.form.value.description,
      visibility: this.form.value.visibility === "'true'" ? true : false,
    });

    if (this.isNew) {
      this.l.add(templist).subscribe(d => {
        if (d) {
          if (this.callback) this.callback();
          this.viewCtrl.dismiss();
        }
      });
    } else {
      this.l.edit(templist).subscribe(d => {
        if (d) {
          this.viewCtrl.dismiss();
        }
      });
    }
  }
}
