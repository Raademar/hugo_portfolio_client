import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Layout } from '../components/Layout/Layout'
import { Video } from '../components/Video/Video'
import styles from './Project.module.scss'

export const query = graphql`
	query($slug: String) {
		sanityProject(slug: { current: { eq: $slug } }) {
			_rawDescription
			categories {
				title
			}
			featuredProject
			id
			image {
				asset {
					fluid {
						...GatsbySanityImageFluid
					}
				}
			}
			title
			vimeoSrc
			postVideo {
				asset {
					playbackId
				}
			}
		}
	}
`

const project = ({ data }: any) => {
	const {
		image,
		title,
		_rawDescription,
		categories,
		vimeoSrc
	} = data.sanityProject
	console.log(data.sanityProject)

	return (
		<Layout>
			<div className={styles.projectImageContainer}>
				{vimeoSrc ? (
					<Video videoSrcURL={vimeoSrc} />
				) : (
					<Img fluid={image.asset.fluid} alt={title} />
				)}
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.projectDescription}>
				{_rawDescription[0].children[0].text}
			</div>
		</Layout>
	)
}

export default project
