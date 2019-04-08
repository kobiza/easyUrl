const tasks = require('./tasks');

console.log('[Clean]');
console.log('-'.repeat(80));
tasks.cleanBuild();

console.log('[copyViews]');
console.log('-'.repeat(80));
tasks.copyViews();

console.log('[copyManifest]');
console.log('-'.repeat(80));
tasks.copyManifest();

console.log('[copyAssets]');
console.log('-'.repeat(80));
tasks.copyAssets();

console.log('[Webpack Build]');
console.log('-'.repeat(80));
exec('webpack -p --color');