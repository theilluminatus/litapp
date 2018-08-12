import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileChooser  } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';


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
    public fileChooser: FileChooser,
    public filePath: FilePath,
  ) { }

  ionViewWillEnter() {

    this.translate.get(['SETTINGS_EXPORTSUCCESS','SETTINGS_IMPORTFAIL','SETTNGS_IMPORTSUCCESS','RELOAD']).subscribe((values) => {
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

  exportData() {
      let data = {
        type: exportDataIdentifier,
        version: this.g.getVersion(),
        timestamp: new Date().toISOString()
      };

      this.storage.forEach((value, key, i) => {
        
        if ([STARREDQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY].indexOf(key) > -1) {
          data[key] = value;
        } else if (key.indexOf(STORY_KEY) > -1 && value.downloaded) {
          data[key] = value;
          if (!data[HISTORY_KEY]) data[HISTORY_KEY] = [];
          data[HISTORY_KEY].push(value.id);
        }
        
      }).then(() => {

      let path = this.file.externalRootDirectory;
        let filename = "litapp-"+Math.round(new Date().getTime() / 1000)+".json"
        console.log( "writing", data, path + filename );

        this.file.writeFile(path, filename, JSON.stringify(data), {replace: true}).then(() => {
          this.api.showToast(this.translations.SETTINGS_EXPORTSUCCESS+": "+path+filename);

        }).catch((err) => {
          console.error(err);
        });
      });
  }

  importData() {
    
    this.fileChooser.open().then(uri => {
      console.log( "parsing", uri );
      this.filePath.resolveNativePath(uri).then(path => {
        let pathname = path.substring(0,path.lastIndexOf("/")+1)
        let filename = path.substring(path.lastIndexOf("/")+1)
        console.log( "reading", pathname, filename );
        
        this.file.readAsText(pathname, filename).then((text: any) => {
          let data = JSON.parse(text);
          console.log( "loading", data );
    
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
          
          this.api.showToast(this.translations.SETTNGS_IMPORTSUCCESS, 100000, this.translations.RELOAD).then(() => {
            window.location.hash = "";
            window.location.reload();
          })
          
        }).catch((error) => {
          console.error(error);
        });

      });
    }).catch(err => console.error(err));
  }

}
