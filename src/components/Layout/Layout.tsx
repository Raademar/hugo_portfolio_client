import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import { Header } from '../Header/Header'

export const Layout = ({ children }: any) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
					}
				}
				allSanityMenuItem {
					nodes {
						title
						url
						id
					}
				}
			}
		`}
		render={data => (
			<React.Fragment>
				<Helmet
					title={'Hugo Carlier'}
					meta={[
						{ name: 'description', content: 'Sample' },
						{ name: 'keywords', content: 'sample, something' }
					]}
				></Helmet>
				<Header
					menuItems={data.allSanityMenuItem}
					siteTitle={data.site.siteMetadata.title}
				/>
				<>{children}</>
			</React.Fragment>
		)}
	/>
)