const tasks = require('./tasks');

console.log('[Webpack Build]');
console.log('-'.repeat(80));
exec('webpack -p --color');