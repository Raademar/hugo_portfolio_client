const sanityClient = require('@sanity/client')
const client = sanityClient({
	projectId: 'ezow1gim',
	dataset: 'production',
	token: `${process.env.HUGO_PORTFOLIO_SANITY_AUTH_KEY}`,
	useCdn: true
})

module.exports = client
