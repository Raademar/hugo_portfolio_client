import React, { FunctionComponent, useRef, useEffect } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
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
					slug {
						current
					}
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
	const imageRef = useRef(null)
	const bannerProjects = data.allSanityProject.nodes
		.filter((node: any) => node.featuredProject)
		.map((item: any, index: number) => {
			return {
				original: item.image.asset.fluid.src,
				url: item.slug && item.slug.current,
				index
			}
		})

	const navigateToImageUrl = (index: number) => {
		const url: string = bannerProjects[index].url
		navigate(url)
	}

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
				onClick={(e: any) =>
					// @ts-ignore
					navigateToImageUrl(imageRef.current.state.currentIndex)
				}
				ref={imageRef}
				// getCurrentIndex
			/>
		</div>
	)
}
