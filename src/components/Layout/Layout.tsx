import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"
import Headroom from "react-headroom"
import Helmet from "react-helmet"
import { Header } from "../Header/Header"
import { Menu } from "../Menu/Menu"
import { Footer } from "../Footer/Footer"
import styles from "./Layout.module.scss"
import { window, document, exists } from "browser-monads"

export const Layout = ({ children }: any) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const pathname = window.location.pathname

	return (
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
			render={(data) => (
				<div className={styles.wrapper}>
					<div>
						<Helmet
							title={"Hugo Carlier"}
							meta={[
								{
									name: "description",
									content: "cinematographer based in Paris",
								},
								{ name: "keywords", content: "Film Director, Cinematographer" },
							]}
						>
							<link
								rel='apple-touch-icon'
								sizes='180x180'
								href='/static/apple-touch-icon.png'
							/>
							<link
								rel='icon'
								type='image/png'
								sizes='32x32'
								href='/static/favicon-32x32.png'
							/>
							<link
								rel='icon'
								type='image/png'
								sizes='16x16'
								href='/static/favicon-16x16.png'
							/>
							<link rel='manifest' href='/static/site.webmanifest' />
						</Helmet>
						<Headroom disableInlineStyles>
							<Header
								menuItems={data.allSanityMenuItem}
								siteTitle={data.site.siteMetadata.title}
								isMenuOpen={isMenuOpen}
								setIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
							/>
						</Headroom>
						<Menu menuItems={data.allSanityMenuItem} isMenuOpen={isMenuOpen} />
						<>{children}</>
					</div>
					{pathname !== "/contact" ? <Footer /> : null}
				</div>
			)}
		/>
	)
}
