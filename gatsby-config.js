const path = require('path')
require('dotenv').config()

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: 'Hugo Carlier'
	},
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
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: path.join(__dirname, 'src', 'images')
			}
		},
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: process.env.SANITY_PROJECT_ID,
				dataset: process.env.SANITY_DATASET,
				token: process.env.SANITY_READ_TOKEN,
				watchMode: true,
				overlayDrafts: true
			}
		},
		'gatsby-plugin-sharp',
		'gatsby-plugin-typescript',
		'gatsby-transformer-sharp',
		'gatsby-plugin-react-helmet'
	]
}
