// Based on cors-escape/server.js

const corsProxy = require('./cors-escape');
const debug = require('debug')('./cors-escape');
const { parseEnvVarAsList } = require('./cors-escape/lib/helpers');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8101;
const fixedTargetWhiteList = [
    'https://literotica.com',
    'https://search.literotica.com',
    'https://www.literotica.com',
    'https://raw.githubusercontent.com/theilluminatus/litapp',
    'https://literotica.com',
];
const fixedOriginWhiteList = [
    'https://theilluminatus.github.io',
];

const originWhitelist = fixedOriginWhiteList.concat(parseEnvVarAsList(process.env.CORSESCAPE_ORIGIN_WHITELIST));
const targetWhitelist = fixedTargetWhiteList.concat(parseEnvVarAsList(process.env.CORSESCAPE_TARGET_WHITELIST));
const checkRateLimit = require('./cors-escape/lib/rate-limit')(process.env.CORSESCAPE_RATELIMIT);

corsProxy.createServer({
    originWhitelist,
    targetWhitelist,
    requireHeaders: ['origin'],
    checkRateLimit,
    removeHeaders: [
        // Strip Heroku-specific headers
        'x-heroku-queue-wait-time',
        'x-heroku-queue-depth',
        'x-heroku-dynos-in-use',
        'x-request-start',
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
        // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
        xfwd: false,
    },
    spoofOrigin: true
}).listen(port, host, () => {
    console.log('Running CORS Escape on ' + host + ':' + port);
});
