import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Device } from '@ionic-native/device';

import { Globals, Api, UX, Settings, User, Files } from '../../providers/providers';
import {
  STARREDQUERIES_KEY,
  STORYSTYLEOPTIONS_KEY,
  FEED_KEY,
  HISTORY_KEY,
  STORY_KEY,
  RECENTQUERIES_KEY,
  SETTINGS_KEY,
} from '../../providers/db';
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
  languages;
  requireReloadSettings = ['offlineMode', 'amoledBlackTheme', 'forceNormalList'];

  private prevOptions: any = {};

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public device: Device,
    public api: Api,
    public ux: UX,
    public user: User,
    public g: Globals,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public storage: Storage,
    public file: File,
    public files: Files,
    public fileChooser: FileChooser,
    public filePath: FilePath,
  ) {}

  ionViewWillEnter() {
    this.translate.get(['PASTEPROMPT_MSG']).subscribe(values => {
      this.translations = values;
    });

    // load settings
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;
      this.prevOptions = this.settings.allSettings;

      // add settings here & in html (defaults in app.module.ts)
      this.form = this.formBuilder.group({
        checkforfeedupdates: [this.options.checkforfeedupdates],
        checkforappupdates: [this.options.checkforappupdates],
        cachelists: [this.options.cachelists],
        amoledBlackTheme: [this.options.amoledBlackTheme],
        offlineMode: [this.options.offlineMode],
        enableLock: [this.options.enableLock],
        forceNormalList: [this.options.forceNormalList],
        alternatePagination: [this.options.alternatePagination],
        onlyShowStoriesInFeed: [this.options.onlyShowStoriesInFeed],
        navigateWithVolumeRocker: [this.options.navigateWithVolumeRocker],
        defaultLanguage: [this.options.defaultLanguage],
        enableImmersiveReading: [this.options.enableImmersiveReading],
      });

      this.form.valueChanges.subscribe(v => {
        // check which setting changed and reload if necessary
        const diff = Object.keys(v).filter(key => {
          if (this.prevOptions.hasOwnProperty(key) && this.prevOptions[key] === v[key]) return false;
          return true;
        });

        // save settings
        this.settings.merge(this.form.value).then(() => {
          this.prevOptions = v;
          if (diff.filter(setting => this.requireReloadSettings.indexOf(setting) >= 0).length) {
            window.location.reload();
          }
        });
      });
    });

    this.g.onReady().then(() => (this.languages = this.g.getSearchableLanguages()));
  }

  exportData() {
    const data = {
      type: exportDataIdentifier,
      version: this.g.getVersion(),
      timestamp: new Date().toISOString(),
    };

    this.storage
      .forEach((value, key, i) => {
        if ([STARREDQUERIES_KEY, RECENTQUERIES_KEY, STORYSTYLEOPTIONS_KEY, FEED_KEY, SETTINGS_KEY, HISTORY_KEY].indexOf(key) > -1) {
          data[key] = value;
        } else if (key.indexOf(STORY_KEY) > -1 && (value.downloaded || data[HISTORY_KEY].indexOf(value.id) > -1)) {
          // add stories that are either downloaded or in history
          data[key] = value;
        }
      })
      .then(() => {
        try {
          const filename = `litapp-${Math.round(new Date().getTime() / 1000)}.json`;
          const textData = JSON.stringify(data);
          this.files.save(filename, textData, 'application/json');
          // in case json stringify crashes
        } catch (error) {
          this.ux.showToast('ERROR', 'FILE_EXPORT_FAIL');
          console.error('settings.exportData', [data], error);
        }
      });
  }

  importData() {
    const handleData = (input: string) => {
      try {
        const data = JSON.parse(input);

        if (data.type !== exportDataIdentifier || data.version > this.g.getVersion() || !data.timestamp) {
          this.ux.showToast('ERROR', 'SETTINGS_IMPORTFAIL');
          return;
        }

        for (const key in data) {
          if (data.hasOwnProperty(key) && key.indexOf('_') === 0) {
            const value = data[key];
            this.storage.set(key, value);
          }
        }

        this.ux.showToast('INFO', 'SETTINGS_IMPORTSUCCESS', 100000, 'RELOAD').then(() => {
          window.location.hash = '';
          window.location.reload();
        });
      } catch (e) {
        console.error('settings.importData', [input], e);
        this.ux.showToast('ERROR', 'SETTINGS_IMPORTFAIL');
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
    // tslint:disable-next-line: prefer-template
    const filename = 'litapp-errorlog-' + Math.round(new Date().getTime() / 1000) + '.json';

    // log some device data before saving to file
    const runtimeData = {
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
      appWebApp: !this.platform.is('cordova'),
      appIsDev: this.g.isDev(),
      appSettings: this.settings.allSettings,
      userLoggedIn: this.user.isLoggedIn(),
    };

    const data = JSON.stringify({ runtime: runtimeData, console: window.consoleLog });
    this.files.save(filename, data, 'application/json');
  }
}
