const path = require('path')
const utils = require('./utils')
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.release.assetsPublicPath : config.build.assetsPublicPath
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "lodash",
            "window._": "lodash",
            "Log": 'log'
        }),
        new webpack.DefinePlugin({
            _PROJECTNAME: JSON.stringify(require('../package.json').name)

        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'css': path.resolve(__dirname, '../src/css'),
            'less': path.resolve(__dirname, '../src/less'),
            'plugins': path.resolve(__dirname, '../src/plugins'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'api': path.resolve(__dirname, '../src/api'),
            'store': path.resolve(__dirname, '../src/store'),
            'router': path.resolve(__dirname, '../src/router'),
            'static': path.resolve(__dirname, '../static'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                publicPath: '../'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                publicPath: '../'
            }
        }]
    }
}
