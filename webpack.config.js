var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, '.');
const ShakePlugin = require('webpack-common-shake').Plugin;

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
/*
var babel_config = {
	env : {
		development : {
			compact : false,
			presets : [ [ 'react' ],
			// 'es2015'
			[ 'env', {
				include : [],
				loose : true,
				modules : false,
				"useBuiltIns" : true,
				"browserslist" : [ "> 5%", "last 2 versions" ]
			} ], ],
			plugins : [ "transform-react-jsx", "transform-class-properties",
					"transform-async-to-generator", ]
		},
		production : {
			compact : true,
			presets : [ [ 'react' ], [ 'env', {
				include : [],
				loose : true,
				modules : false,
				"useBuiltIns" : true,
				"browserslist" : [ "> 5%", "last 2 versions" ]
			} ],
			// [ "minify", {} ],
			],
			plugins : [ "babel-plugin-transform-react-jsx",
					"transform-class-properties",
					"transform-async-to-generator",
					[ "minify-dead-code-elimination", {
						"optimizeRawSize" : true
					} ] ]
		}
	}
};
*/

var babel_loader = {
	test : /\.jsx?$/,
	loader : "babel-loader",
	query :  {
			compact : true,
			presets : [ [ 'react' ], [ 'env', {} ],
			],
			plugins : [ "babel-plugin-transform-react-jsx",
					"transform-class-properties",
			]
		}
};

var plugins = [];

var sourcemap = '#inline-source-map';
plugins.unshift(new ShakePlugin(), new webpack.optimize.UglifyJsPlugin({
	sourceMap : true,
	warnings : true,
	uglifyOptions : {
		compress : {
			dead_code : true,
		},
	},
}), new webpack.DefinePlugin({
	process : {
		env : {
			NODE_ENV : JSON.stringify('production'),
			BABLE_ENV : JSON.stringify('production'),
		}
	}
}), new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.AggressiveMergingPlugin());

var config = {
	entry : [ 'babel-polyfill', APP_DIR + '/chtr-form.jsx',
			APP_DIR + '/chtr-form.css' ],
	target : 'web',
	output : {
		path : BUILD_DIR,
		filename : 'index.jsx',
		libraryTarget : 'commonjs2'
	},
	devtool : sourcemap,
	module : {
		loaders : [ babel_loader, {
			test : /\.css$/,
			loaders : [ "style-loader", "css-loader" ],
		}, {
			test : /\.(jpe?g|png|gif)$/i,
			loader : "file-loader",
			query : {
				name : '[name].[ext]',
				outputPath : 'images/'
			}
		}, ],
	},
	plugins : plugins,
};

module.exports = config;
