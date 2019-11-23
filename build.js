const fs = require('fs');
const pegjs = require('pegjs');

const grammar = fs.readFileSync('./src/parser.pegjs', { encoding: 'utf-8' });

const parserCode = pegjs.generate(grammar, { output: 'source' });

fs.appendFileSync('dist/index.js', `
const pegExports = ${parserCode};
exports.parse = pegExports.parse;
exports.SyntaxError = pegExports.SyntaxError;
`);

fs.appendFileSync('dist/index.d.ts', `
export declare class SyntaxError {
    message: any;
    expected: any;
    found: any;
    location: any
}
export declare function parse(text: string): ProgLin;
`);