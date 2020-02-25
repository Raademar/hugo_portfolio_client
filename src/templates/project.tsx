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
			director
			cinematographer
			producer
			publishedAt
			categories {
				title
			}
			featuredProject
			id
			image {
				asset {
					fluid(maxWidth: 1080) {
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
		allSanityStills(
			filter: { belongsTo: { elemMatch: { slug: { current: { eq: $slug } } } } }
		) {
			nodes {
				image {
					asset {
						fluid(maxWidth: 1080) {
							...GatsbySanityImageFluid
						}
					}
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
		director,
		cinematographer,
		producer,
		categories,
		publishedAt,
		vimeoSrc
	} = data.sanityProject

	const timeStamp = `( 0${new Date(publishedAt).getMonth() + 1} / ${new Date(
		publishedAt
	).getFullYear()} )`
	console.log(data)

	return (
		<Layout>
			<div className={styles.projectContainer}>
				<div className={styles.projectImageContainer}>
					{vimeoSrc ? (
						<Video videoSrcURL={vimeoSrc} />
					) : (
						<Img fluid={image.asset.fluid} alt={title} />
					)}
				</div>
				<div className={styles.title}>
					<p>{title}</p>
					<p>{timeStamp}</p>
				</div>
				<div className={styles.projectDescription}>
					{_rawDescription[0].children[0].text}
					<p>Directed by: {director}</p>
					<p>Cinematography by: {cinematographer}</p>
					<p>Produced by: {producer}</p>
				</div>
				<div className={styles.projectStills}>
					{data.allSanityStills.nodes.map((item: any, index: number) => (
						<div className={styles.projectStillsImageContainer}>
							<Img fluid={item.image.asset.fluid} alt={item.id} />
						</div>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default project
