const path = require('path');

module.exports = {
    entry: {
        popup: [path.join(__dirname, '/src/popup.jsx')],
        background: [path.join(__dirname, '/src/background.js')],
        content: [path.join(__dirname, '/src/content.js')]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
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
