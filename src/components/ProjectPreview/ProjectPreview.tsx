import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './ProjectPreview.module.scss'

type Props = {
	featuredProject: boolean
	image: any
	title: string
	url: string
	left?: boolean
	right?: boolean
}

export const ProjectPreview: FunctionComponent<Props> = props => {
	const { featuredProject, image, title, url, left, right } = props

	return (
		<article
			className={`${featuredProject ? styles.projectPreviewContainerFull : ''}`}
		>
			<div className={styles.projectImageContainer}>
				<Link to={`project/${url}`}>
					<Img fluid={image} alt={title} />
				</Link>
			</div>
			<div className={styles.linkContainer}>
				<h3>{title}</h3>
			</div>
		</article>
	)
}
