var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'demo');
var APP_DIR = path.resolve(__dirname, '.');

var config = {
	entry : [  
		BUILD_DIR + '/demo_src.jsx',
		APP_DIR + '/chtr-form.css' 
		],
	    target : 'web',
	    output : {
		  path : BUILD_DIR,
		  filename : 'site.js',
		
	},
	devtool : '#inline-source-map',
	module : {
		loaders : [
				{
					test : /\.jsx?$/,
					loader : "babel-loader",
					query : {
						compact : true,
						presets : [ [ 'react' ], [ 'env', {} ], ],
						plugins : [ "babel-plugin-transform-react-jsx",
								"transform-class-properties" ]
				
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
	plugins : [new webpack.optimize.UglifyJsPlugin({
		  sourceMap : true,
		  warnings : true,
		  uglifyOptions : {
			compress : {
				dead_code : true,
			},
		},
	})],
};

module.exports = config;
