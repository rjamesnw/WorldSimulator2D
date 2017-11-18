/// <reference path="../../../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../../../node_modules/@types/express/index.d.ts" />

import http = require('express');

http.createServer((request, response) => {
    response.write('Hello from Node.js!');
    response.end();
}).listen(3000);