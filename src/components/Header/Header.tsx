import React from 'react'
import { Link, graphql } from 'gatsby'
import styles from './Header.module.scss'

export const Header = ({ menuItems, siteTitle }: any) => {
	console.log(menuItems, siteTitle)

	return (
		<header className={styles.header}>
			<div>
				<div>
					<Link to='/'>Hugo Carlier</Link>
				</div>
				<div className={styles.navMenu}>
					<nav>
						{menuItems.nodes.map(
							(item: { url: string; title: string; id: string }) => (
								<Link to={item.url} className={styles.listItem}>
									{item.title}
								</Link>
							)
						)}
					</nav>
				</div>
			</div>
		</header>
	)
}

export const query = graphql`
	query {
		allSanityMenuItem {
			nodes {
				title
				url
				id
			}
		}
	}
`
