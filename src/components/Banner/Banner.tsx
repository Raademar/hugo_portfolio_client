import React, { FunctionComponent, useRef } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import ImageGallery from 'react-image-gallery'
import styles from './Banner.module.scss'

type Props = {
	history?: any
}

export const Banner: FunctionComponent<Props> = (props: Props) => {
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
	const bannerProjects = data.allSanityProject.nodes
		.filter((node: any) => node.featuredProject)
		.map((item: any, index: number) => {
			return {
				original: item.image.asset.fluid.src,
				url: item.slug && item.slug.current,
				index
			}
		})

	return (
		<div className={styles.container}>
			{/* <div className={styles.imageContainer}>
						<Img fluid={project.image.asset.fluid} />
					</div> */}
			<ImageGallery
				items={bannerProjects}
				showThumbnails={false}
				showFullscreenButton={false}
				showPlayButton={false}
				// renderLeftNav={renderLeftNav}
				onClick={(e: any) => console.log(e.target)}
				// getCurrentIndex
			/>
		</div>
	)
}
