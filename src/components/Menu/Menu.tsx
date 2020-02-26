import React, { useState } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styles from './Menu.module.scss'

export const query = graphql`
	{
		allSanityMenuItem {
			nodes {
				categoryLink
				title
				url
				id
			}
		}
	}
`

const Link = ({
	children,
	to,
	activeClassName,
	partiallyActive,
	...other
}: any) => {
	const internal = /^\/(?!\/)/.test(to)
	if (internal) {
		return (
			<GatsbyLink
				to={to}
				activeClassName={activeClassName}
				partiallyActive={partiallyActive}
				{...other}
			>
				{children}
			</GatsbyLink>
		)
	}
	return (
		<a href={to} {...other}>
			{children}
		</a>
	)
}

export const Menu = ({ menuItems, isMenuOpen }: any) => {
	const categories =
		menuItems &&
		menuItems.nodes.filter((item: any) => {
			if (item.title !== 'Instagram' && item.title !== 'Contact') {
				return item
			}
		})
	const removed =
		menuItems &&
		menuItems.nodes.filter((item: any) => {
			if (item.title === 'Instagram' || item.title === 'Contact') {
				return item
			}
		})
	removed && removed.map((item: any) => categories.push(item))
	return (
		<div
			className={styles.navMenu}
			style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
		>
			<nav>
				{categories &&
					categories.map(
						(
							item: {
								url: string
								title: string
								id: string
								categoryLink: boolean
							},
							index: number
						) => {
							return item.url === 'https://www.instagram.com/igotvisions/' ? (
								<a className={styles.listItem} href={item.url}>
									{item.title}
								</a>
							) : (
								<Link
									to={`/${item.url}`}
									className={styles.listItem}
									key={index}
									state={item.categoryLink ? item.title : null}
								>
									{item.title}
								</Link>
							)
						}
					)}
			</nav>
		</div>
	)
}
