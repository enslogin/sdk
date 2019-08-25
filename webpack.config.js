const path = require('path');

module.exports = {
	mode:  "production",
	entry: "./dist/enslogin.js",
	output:
	{
		path:          path.resolve(__dirname, "public"),
		filename:      "enslogin-bundle.js",
		library:       "enslogin",
		libraryTarget: "umd",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				// include: [ path.resolve(__dirname, "dist") ]
				// exclude: [ path.resolve(__dirname, "node_modules") ],
				loader: "babel-loader",
			},
		]
	}
};
