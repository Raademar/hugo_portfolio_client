import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import ImageGallery from 'react-image-gallery'
import styles from './Banner.module.scss'
import { useWindowSize } from '../../helpers/helpers'

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

	const size = useWindowSize()
	const IS_MOBILE = size && size.width < 767

	return (
		<div className={styles.container}>
			<ImageGallery
				items={bannerProjects}
				showThumbnails={false}
				showFullscreenButton={false}
				showPlayButton={false}
				showNav={!IS_MOBILE}
				onClick={(e: any) => console.log(e.target)}
				// getCurrentIndex
			/>
		</div>
	)
}
