import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
	mode: 'production',
	entry: './src/index.ts',   // <------- the entry file

	// output bundle
	output: {
    	    path: path.resolve(__dirname, 'dist'),      // <------- bundles location
    	    filename: 'main.bundle.js'     // <------------- setup bundle  file
	},

	// file resolutions
	resolve: {
    	    extensions: [ '.ts', '.js' ],
    },

	// ts-loader will enter through ./index.ts, load all .ts and .tsx files
	module: {
    	    rules: [
        	        {
            	            test: /\.tsx?/,
            	            use: 'ts-loader',
            	            exclude: /node_modules/,
        	       }
    	    ]
	},

	// for template index and copy specific file
	plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
          }),
    ],

	// for webpack-dev-server
	// devtool: "source-map",  // <---- Enable sourcemaps for debugging webpack's output.
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};

export default config;
