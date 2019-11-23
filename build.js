const fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('src/parser.d.ts', 'dist/parser.d.ts', (err) => {
  if (err) throw err;
});