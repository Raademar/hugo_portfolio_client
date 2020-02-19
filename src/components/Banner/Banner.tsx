import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import styles from './Banner.module.scss'

export const Banner: FunctionComponent = props => {
	const data = useStaticQuery(graphql`
		query {
			allSanityProject {
				nodes {
					featuredProject
					image {
						asset {
							fluid(maxWidth: 1600) {
								...GatsbySanityImageFluid
							}
						}
					}
				}
			}
		}
	`)
	const bannerProjects = data.allSanityProject.nodes.filter(
		(node: any) => node.featuredProject
	)
	console.log(bannerProjects)
	return (
		<div className={styles.container}>
			{bannerProjects.map((project: any) => (
				<Img fluid={project.image.asset.fluid} />
			))}
		</div>
	)
}
