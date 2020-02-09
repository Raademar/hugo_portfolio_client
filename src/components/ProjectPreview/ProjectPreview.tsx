import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './ProjectPreview.module.scss'

type Props = {
	featuredProject: boolean
	left: boolean
	right: boolean
}

export const ProjectPreview: FunctionComponent<Props> = props => {
	const data = useStaticQuery(graphql`
		query($slug: String) {
			sanityProject(slug: { current: { eq: $slug } }) {
				title
				image {
					asset {
						fluid {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	`)
	const { featuredProject, left, right } = props
	return (
		<article
			className={`${
				featuredProject ? styles.projectPreviewContainerFull : ''
			} ${
				left
					? styles.projectPreviewContainerHalfFirst
					: styles.projectPreviewContainerHalfSecond
			}`}
		>
			<div className={styles.projectImageContainer}>
				<Img
					fluid={data.sanityProject.image.asset.fluid}
					alt={data.sanityProject.title}
				/>
			</div>
			<div className={styles.linkContainer}>
				<h3>Christian Louboutin - Black Tie</h3>
			</div>
		</article>
	)
}
