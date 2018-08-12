import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';


import { Globals, Api } from '../../providers/providers';
import { Settings } from '../../providers/providers';
import { STARREDQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY, HISTORY_KEY, STORY_KEY } from '../../providers/db';

const exportDataIdentifier = "Exported data for Litapp (com.illuminatus.litapp)";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  options: any;
  settingsReady = false;
  form: FormGroup;

  translations;

  constructor(public navCtrl: NavController,
    public api: Api,
    public g: Globals,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public storage: Storage,
    public file: File,
  ) { }

  ionViewWillEnter() {

    this.translate.get(['SETTINGS_EXPORTSUCCESS','SETTINGS_IMPORTFAIL']).subscribe((values) => {
      this.translations = values;
    });

    // load settings
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      // add settings here & in html
      this.form = this.formBuilder.group({
        checkforfeedupdates: [this.options.checkforfeedupdates],
        checkforappupdates: [this.options.checkforappupdates],
        loadalllistsonstart: [this.options.loadalllistsonstart]
      });

      this.form.valueChanges.subscribe((v) => {
        this.settings.merge(this.form.value);
      });

    });
  }

  // TODO: Add location picker

  exportData() {
    let data = {
      type: exportDataIdentifier,
      version: this.g.getVersion(),
      timestamp: new Date().toISOString()
    };
    this.storage.forEach((value, key) => {
      if ([STARREDQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY].indexOf(key) > -1) {
        data[key] = value;
      } else if (key.indexOf(STORY_KEY) > -1 && value.downloaded) {
        data[key] = value;
        if (!data[HISTORY_KEY]) data[HISTORY_KEY] = [];
        data[HISTORY_KEY].push(value.id);
      }
    }).then(() => {
      console.log( data );
      let path = this.file.dataDirectory;
      this.file.writeFile(path, "litapp.json", JSON.stringify(data));
      this.api.showToast(this.translations.SETTINGS_EXPORTSUCCESS+": "+path+"/litapp.json");
    });
  }

  importData() {
    let path = this.file.dataDirectory;
    this.file.readAsText(path, "litapp.json").then((text: any) => {
      let data = JSON.parse(text);

      if (data.type != exportDataIdentifier || data.version > this.g.getVersion() || !data.timestamp) {
        this.api.showToast(this.translations.SETTINGS_IMPORTFAIL);
        return;
      }

      for (const key in data) {
        if (data.hasOwnProperty(key) && key.indexOf("_") == 0) {
          const value = data[key];
          this.storage.set(key, value);
        }
      }
  
      window.location.reload();
      
    }).catch((error) => {
      this.api.showToast(error);
    });
  }

}
