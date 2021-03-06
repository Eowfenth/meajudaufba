var dotenv = require('dotenv').config({silent: true});
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const PORT = process.env.PORT || 5080;
const WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 5090;
const NODE_ENV = process.env.NODE_ENV || 'development';

var APP_DIR = path.resolve(__dirname, 'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/build');

var config = {
    entry: APP_DIR + '/main.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
	module: {
	    loaders: [{
	        test: /\.jsx?/,
	        include: APP_DIR,
	        loader: 'babel-loader'
	    }]
	},
    plugins: [
    	new HtmlWebpackPlugin({
            template: APP_DIR + '/index.html',
            chunksSortMode: 'dependency'
        })
    ]
};

if (NODE_ENV == 'development') {
	config = webpackMerge(config, {
		devServer: {
	        port: WEBPACK_DEV_SERVER_PORT,
	        host: 'localhost',
	        historyApiFallback: true,
	        watchOptions: {
	            aggregateTimeout: 300,
	            poll: 1000
	        },
	        proxy: {
	            '/api': {
	                target: {
	                    host: 'localhost',
	                    port: PORT
	                }
	            }
	        }
	    }
	});
}

console.log(config);

module.exports = config;
