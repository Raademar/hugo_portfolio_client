/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	// plugins: ['gatsby-plugin-typescript', 'gatsby-plugin-sass']
	plugins: [
		{
			resolve: 'gatsby-plugin-scss-typescript',
			options: {
				cssLoaderOptions: {
					importLoaders: 1,
					localIdentName: '[name]_[local]___[hash:base64:5]_[emoji:1]'
				},
				sassLoaderOptions: {
					// includePaths: [path.resolve(__dirname, './src/*/*/module.scss')]
				},
				cssMinifyOptions: {
					assetNameRegExp: /\.optimize\.css$/g,
					canPrint: true
				},
				cssExtractOptions: {
					filename: '[name].css',
					chunkFilename: '[id].css'
				}
			}
		},
		'gatsby-plugin-typescript'
	]
}
