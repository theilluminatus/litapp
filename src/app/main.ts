
// keep all console logs for sending reports
// @ts-ignore
window.consoleLog = [];
console = new Proxy(console, {
    get: (obj, prop) => {
        const method = obj[prop];
        return (...args) => {
            let result = method.apply(this, args);
            // @ts-ignore
            window.consoleLog.push(JSON.parse(JSON.stringify({ prop, args })));
            return result;
        };
    },
});

// start app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
