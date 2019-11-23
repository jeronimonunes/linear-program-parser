const fs = require('fs');
const pegjs = require('pegjs');

const grammar = fs.readFileSync('./src/parser.pegjs', { encoding: 'utf-8' });

const parserCode = pegjs.generate(grammar, { output: 'source' });

fs.appendFileSync('dist/index.js', '\nconst pegExports = ' + parserCode + ';\n');
fs.appendFileSync('dist/index.js', 'exports.parse = pegExports.parse;\n');
fs.appendFileSync('dist/index.js', 'exports.SyntaxError = pegExports.SyntaxError;\n');

const types = `export declare class SyntaxError {
    message: any;
    expected: any;
    found: any;
    location: any
}

export declare function parse(text: string): ProgLin;`

fs.appendFileSync('dist/index.d.ts', types);