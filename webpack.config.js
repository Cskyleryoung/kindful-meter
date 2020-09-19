const path = require('path');

// include the js minification plugin
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: ['./kindful-meter.js'],
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: true, // Note `mangle.properties` is `false` by default.
                },
            })
        ]
    },
    output: {
        filename: './js/kindful-meter.min.js',
        path: path.resolve(__dirname)
    }
};