import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Globals } from './globals';
import { handleNoCordovaError } from '../app/utils';
import { Settings } from './settings';

declare global {
  const gtag: Function;
}

@Injectable()
export class Analytics {
  private type: 'android' | 'web' = 'android';

  constructor(public g: Globals, public settings: Settings, public googleAnalytics: GoogleAnalytics) {
    Promise.all([this.settings.load(), this.g.onReady()]).then(() => {
      if (this.settings.allSettings.offlineMode) return;

      const webAlternative = () => {
        if ((window as any).gtag) {
          this.type = 'web';
          gtag('js', new Date());
          gtag('config', 'UA-142185587-3', { send_page_view: true, anonymize_ip: true });
        }
      };

      try {
        // setup tracking
        Promise.all([
          this.googleAnalytics.startTrackerWithId('UA-142185587-2', 120),
          this.googleAnalytics.setAnonymizeIp(true),
          this.googleAnalytics.setAllowIDFACollection(false),
          this.googleAnalytics.setAppVersion(this.g.getVersion().toString()),
        ])
          .then(() => {
            this.track('Startup');
          })
          .catch(e => handleNoCordovaError(e, webAlternative));
      } catch (e) {
        handleNoCordovaError(e, webAlternative);
      }
    });
  }

  track(view: string) {
    console.info('Track', view);
    if (this.settings.allSettings.offlineMode) return;

    if (this.type === 'android') {
      this.googleAnalytics.trackView(view).catch(e => handleNoCordovaError(e));
    } else if (this.type === 'web') {
      gtag('event', 'screem_view', {
        app_name: this.g.getVersion().toString(),
        screen_name: view,
      });
    }
  }
}
