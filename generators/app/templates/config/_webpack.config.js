var webpack = require('webpack');
module.exports = {
    entry: ['./index.js'],
    output: {
        path: './lib',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    }
};