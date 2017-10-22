var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, '.');
const
ShakePlugin = require('webpack-common-shake').Plugin;

const
UglifyJSPlugin = require('uglifyjs-webpack-plugin')

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
	entry : [  APP_DIR + '/chtr-form.jsx',
			APP_DIR + '/chtr-form.css' ],
	target : 'web',
	output : {
		path : BUILD_DIR,
		filename : 'index.jsx',
		libraryTarget : 'commonjs2',
		//libraryTarget : 'umd',
		//library: 'ChtrForm',
		
	},
	devtool : sourcemap,
	module : {
		loaders : [
				{
					test : /\.jsx?$/,
					loader : "babel-loader",
                                        exclude: /node_modules/,
					query : {
						compact : true,
						presets : [ [ 'react' ], [ 'env', {} ], ],
						plugins : [ "babel-plugin-transform-react-jsx",
								"transform-class-properties","transform-react-inline-elements" ]
					}
				}, {
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
