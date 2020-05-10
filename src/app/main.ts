declare const window: any;

// keep last 75 console logs for sending reports
window.consoleLog = [];
if (!!window.Proxy) {
  // not supported on Webview before Android 7
  console = new Proxy(console, {
    get: (obj, prop) => {
      const method = obj[prop];
      return (...args) => {
        const result = method.apply(this, args);
        try {
          window.consoleLog.push(JSON.parse(JSON.stringify({ prop, args })));
          if (window.consoleLog.length > 75) window.consoleLog.shift();
        } catch (e) {}
        return result;
      };
    },
  });
}

console.info('App started', new Date().getTime());

// start app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
