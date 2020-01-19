// Declare possible values with defaults here

var ENV = {
  CORS_PROXY: process.env.CORS_PROXY || '',
  DEV: process.env.DEV === 'true' || false,
};

// Writes to file
const data = `
/* tslint:disable */
export const ENV = ${JSON.stringify(ENV)};
`;
require('fs').writeFileSync('src/app/env.ts', data, 'utf-8');
