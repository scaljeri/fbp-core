const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin')
const path = require('path')
var glob = require('glob')
// var _ = require('lodash')

// import * as EsmWebpackPlugin from '@purtuga/esm-webpack-plugin';
// import * as path from 'path';
// import * as glob from 'glob';
// import * as _ from 'lodash';


// var nodeExternals = require('webpack-node-externals')

module.exports = {
	mode: 'production',
	entry: glob.sync('./src/**/*.ts').reduce((acc, path) => {
		if (path.match(/^\.\/src\/(nodes|web)\//) && !path.match(/abstract-node\.ts/)) {
		const entry = path.replace(/\/([^\/]+).ts$/, '')
		acc[`bundled/${RegExp.$1}`] = path //[path] = path
		}
		return acc
	}, {}),
	output: {
		// filename: '[name].[chunkhash].js',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		library: 'LIB',
		libraryTarget: 'var'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [new EsmWebpackPlugin()],
	// externals: [nodeExternals()],
	// resolve: {
	// 	modules: [process.env.NODE_PATH || 'node_modules', './src/utils']
	// }
	resolve: {
		extensions: ['.wasm', '.mjs', '.js', '.json', '.ts']
	}
}
