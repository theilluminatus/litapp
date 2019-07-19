import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Globals } from './globals';

@Injectable()
export class Analytics {

  constructor(
    public g: Globals,
    public googleAnalytics: GoogleAnalytics,
  ) {

    Promise.all([
      // this.settings.load(),
      this.g.onReady(),
    ]).then(() => {
      
      try {
        // setup tracking
        Promise.all([
          this.googleAnalytics.startTrackerWithId('UA-142185587-2', 120),
          this.googleAnalytics.setAnonymizeIp(true),
          this.googleAnalytics.setAllowIDFACollection(false),
          this.googleAnalytics.setAppVersion(this.g.getVersion().toString()),
        ]).then(() => {
          this.track("Startup");

        }).catch(e => console.error('Error starting GoogleAnalytics', e));

      } catch(e) {
        console.error('Error starting GoogleAnalytics', e)
      }

    });

  }

  track(view: string) {
    this.googleAnalytics.trackView(view);
    console.log('Track', view);
  }

}
