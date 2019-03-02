const path = require('path');

module.exports = {
    entry: {
        popup: [path.join(__dirname, '/src/popup.jsx')],
        background: [path.join(__dirname, '/src/background.js')],
        options: [path.join(__dirname, '/src/options.jsx')],
        // background: [customPath, path.join(__dirname, '../chrome/extension/background')],
        // inject: [customPath, path.join(__dirname, '../chrome/extension/inject')]
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    // entry: './src/index.jsx',
    // output: {
    //     path: __dirname + '/dist',
    //     publicPath: '/',
    //     filename: 'bundle.js'
    // },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
};
