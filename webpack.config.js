const path = require('path');

module.exports = {
	mode:  "production",
	entry: "./dist/ENSLoginSDK.js",
	output:
	{
		path:          path.resolve(__dirname, "public"),
		filename:      "ENSLoginSDK.js",
		library:       "ENSLoginSDK",
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
