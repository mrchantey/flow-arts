const path = require('path');

const outdir = path.resolve(__dirname, 'dist')


module.exports = {
	entry: './src/index.ts',
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
		contentBase: outdir,
		port: 8081
		// historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},
	output: {
		filename: 'main.js',
		path: outdir,
	},
};