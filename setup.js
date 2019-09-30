
// Declare possible values with defaults here

var ENV = {
    CORS_PROXY: process.env.CORS_PROXY || ""
};


// Writes to file
const data = `
export const ENV = ${JSON.stringify(ENV)};
`;
require("fs").writeFileSync('src/app/env.ts', data, 'utf-8');
