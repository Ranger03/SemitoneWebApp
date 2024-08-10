const { JSDOM } = require('jsdom');
const fs = require('fs')
const html = fs.readFileSync( './index.html', 'utf8' );
const dom = new JSDOM( html );
global.window = dom.window;
global.document = dom.window.document;