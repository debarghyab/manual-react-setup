
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require('webpack');

const srcDir = path.join(__dirname, 'src');

const env = process.env.NODE_ENV;

module.exports = {

	context: srcDir,

	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '',
		filename: 'iptracker.js',
		assetModuleFilename: 'images/[name][ext]'
	},

	entry: env === 'development' ? ['babel-polyfill', 'iptracker/index'] : 'iptracker/index',

	plugins: [],

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: [srcDir, 'node_modules'],
		alias: {}
	},

	module: {
		rules: []
	}
};

if (env !== 'production') {
	module.exports.mode = 'development';
	module.exports.target = 'browserslist';

	module.exports.module.rules.push(
		{
			test: /\.(tsx|ts)$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env',
							{
								targets: 'defaults'
							}],
						'@babel/preset-react'
					],
					compact: false,
					plugins: [
						['react-transform', {
							transforms: [{
								transform: 'react-transform-hmr',
								imports: ['react'],
								locals: ['module']
							}]
						}]
					]
				}
			},
				'ts-loader']
		},
		{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: 'defaults' }],
							'@babel/preset-react'
						],
						compact: false,
						plugins: [
							['react-transform', {
								transforms: [{
									transform: 'react-transform-hmr',
									imports: ['react'],
									locals: ['module']
								}]
							}]
						]
					}
				}
			]
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader']
		}
	)
}

if (env === 'production') {
	module.exports.mode = 'production';
	module.exports.target = 'node';

	module.exports.module.rules.push(
		{
			test: /\.(tsx|ts)$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env',
							{
								targets: 'defaults'
							}],
						'@babel/preset-react'
					]
				}
			},
				'ts-loader']
		},
		{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env',
								{
									targets: 'defaults'
								}],
							'@babel/preset-react'
						]
					}
				}
			]
		},
		{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader']
		},
		{
			test: /\.less$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
		}
	);

	module.exports.plugins.push(
		new MiniCssExtractPlugin({
			filename: 'iptracker.css'
		})
	);
}