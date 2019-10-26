import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Device } from '@ionic-native/device';

import { Globals, Api, Settings, User } from '../../providers/providers';
import { STARREDQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY, HISTORY_KEY, STORY_KEY } from '../../providers/db';
import { handleNoCordovaError } from '../../app/utils';

const exportDataIdentifier = 'Exported data for Litapp (com.illuminatus.litapp)';

declare const window: any;

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  options: any = {};
  settingsReady = false;
  form: FormGroup;

  translations;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public device: Device,
    public api: Api,
    public user: User,
    public g: Globals,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public storage: Storage,
    public file: File,
    public fileChooser: FileChooser,
    public filePath: FilePath,
  ) {}

  ionViewWillEnter() {
    this.translate
      .get(['SETTINGS_EXPORTSUCCESS', 'SETTINGS_IMPORTFAIL', 'SETTNGS_IMPORTSUCCESS', 'RELOAD', 'COPYPROMPT_MSG', 'PASTEPROMPT_MSG'])
      .subscribe(values => {
        this.translations = values;
      });

    // load settings
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      // add settings here & in html (defaults in app.module.ts)
      this.form = this.formBuilder.group({
        checkforfeedupdates: [this.options.checkforfeedupdates],
        checkforappupdates: [this.options.checkforappupdates],
        cachelists: [this.options.cachelists],
        amoledBlackTheme: [this.options.amoledBlackTheme],
        offlineMode: [this.options.offlineMode],
      });

      this.form.valueChanges.subscribe(v => {
        this.settings.merge(this.form.value);
      });
    });
  }

  exportData() {
    const data = {
      type: exportDataIdentifier,
      version: this.g.getVersion(),
      timestamp: new Date().toISOString(),
    };

    this.storage
      .forEach((value, key, i) => {
        if ([STARREDQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY].indexOf(key) > -1) {
          data[key] = value;
        } else if (key.indexOf(STORY_KEY) > -1 && value.downloaded) {
          data[key] = value;
          if (!data[HISTORY_KEY]) data[HISTORY_KEY] = [];
          data[HISTORY_KEY].push(value.id);
        }
      })
      .then(() => {
        const path = this.file.externalRootDirectory;
        // tslint:disable-next-line: prefer-template
        const filename = 'litapp-' + Math.round(new Date().getTime() / 1000) + '.json';

        this.file
          .writeFile(path, filename, JSON.stringify(data), { replace: true })
          .then(() => {
            this.api.showToast(`${this.translations.SETTINGS_EXPORTSUCCESS}: ${path}${filename}`);
          })
          .catch(err =>
            handleNoCordovaError(err, e => {
              prompt(this.translations.COPYPROMPT_MSG, JSON.stringify(data));
            }),
          );
      });
  }

  importData() {
    const handleData = (input: string) => {
      try {
        const data = JSON.parse(input);

        if (data.type !== exportDataIdentifier || data.version > this.g.getVersion() || !data.timestamp) {
          this.api.showToast(this.translations.SETTINGS_IMPORTFAIL);
          return;
        }

        for (const key in data) {
          if (data.hasOwnProperty(key) && key.indexOf('_') === 0) {
            const value = data[key];
            this.storage.set(key, value);
          }
        }

        this.api.showToast(this.translations.SETTNGS_IMPORTSUCCESS, 100000, this.translations.RELOAD).then(() => {
          window.location.hash = '';
          window.location.reload();
        });
      } catch (e) {
        console.error('settings.importData', [input], e);
      }
    };

    const promptForInputInstead = () => {
      const data = prompt(this.translations.PASTEPROMPT_MSG, '');
      if (data) {
        handleData(data);
      }
    };

    this.fileChooser
      .open()
      .then(uri => {
        this.filePath.resolveNativePath(uri).then(path => {
          const pathname = path.substring(0, path.lastIndexOf('/') + 1);
          const filename = path.substring(path.lastIndexOf('/') + 1);

          this.file
            .readAsText(pathname, filename)
            .then((text: any) => {
              handleData(text);
            })
            .catch(err => handleNoCordovaError(err, () => promptForInputInstead()));
        });
      })
      .catch(err => handleNoCordovaError(err, () => promptForInputInstead()));
  }

  saveErrorLog() {
    const path = this.file.externalRootDirectory;
    // tslint:disable-next-line: prefer-template
    const filename = 'litapp-errorlog-' + Math.round(new Date().getTime() / 1000) + '.json';

    // log some device data before saving to file
    console.info({
      unixTime: new Date().getTime(),
      deviceManufacturer: this.device.manufacturer,
      deviceModel: this.device.model,
      deviceActualVersion: this.device.version,
      deviceVersions: this.platform.versions(),
      devicePlatforms: this.platform.platforms(),
      deviceWidth: this.platform.width(),
      deviceHeight: this.platform.height(),
      deviceOrientation: this.platform.isLandscape() ? 'landscape' : 'portrait',
      deviceUuid: this.device.uuid,
      appLanguage: this.platform.lang(),
      appCordova: this.device.cordova,
      appVersion: this.g.getVersion(),
      apiKey: this.api.apikey,
      appId: this.api.appid,
      appSettings: this.settings.allSettings,
      userLoggedIn: this.user.isLoggedIn(),
    });

    const data = JSON.stringify(window.consoleLog);

    this.file
      .writeFile(path, filename, data, { replace: true })
      .then(() => {
        this.api.showToast(`${this.translations.SETTINGS_EXPORTSUCCESS}: ${path}${filename}`);
      })
      .catch(err =>
        handleNoCordovaError(err, e => {
          prompt(this.translations.COPYPROMPT_MSG, data);
        }),
      );
  }
}
