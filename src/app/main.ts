
declare const window: any;

// keep all console logs for sending reports
window.consoleLog = [];
console = new Proxy(console, {
    get: (obj, prop) => {
        const method = obj[prop];
        return (...args) => {
            let result = method.apply(this, args);
            try {
                window.consoleLog.push(JSON.parse(JSON.stringify({ prop, args })));
                if (window.consoleLog.length > 50) window.consoleLog.shift();
            } catch (e) {}
            return result;
        };
    },
});

// start app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
