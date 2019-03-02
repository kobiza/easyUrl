require('shelljs/global');
const path = require('path');

exports.cleanBuild = () => {
    rm('-rf', 'build');
    mkdir('build');
};

exports.copyViews = () => {
    cp('-R', 'src/views/.', 'build');
};

exports.copyManifest = () => {
    cp(`manifest.json`, `build/manifest.json`);
};

exports.copyAssets = () => {
    cp('-R', 'assets', 'build');
};