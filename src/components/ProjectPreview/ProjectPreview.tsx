import React, { FunctionComponent, useState, useRef } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import ReactPlayer from 'react-player'
import Img from 'gatsby-image'
import styles from './ProjectPreview.module.scss'

type Props = {
	featuredProject: boolean
	image: any
	title: string
	url: string
	left?: boolean
	right?: boolean
	gridRow?: number
}

export const ProjectPreview: FunctionComponent<Props> = props => {
	const { featuredProject, image, title, url, left, right, gridRow } = props
	const [isHovered, setIsHovered] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const imageRef = useRef(null)

	return (
		<article
			className={`${
				featuredProject
					? styles.projectPreviewContainerFull
					: styles.projectPreviewContainer
			}`}
		>
			<div
				className={styles.projectImageContainer}
				onMouseEnter={() => {
					setIsHovered(true)
					setIsPlaying(true)
				}}
				onMouseLeave={() => {
					setIsPlaying(false)
					setIsHovered(false)
				}}
			>
				<Link to={url}>
					{isHovered ? (
						<div className={styles.playerWrapper}>
							<ReactPlayer
								url='https://vimeo.com/310379413'
								className={styles.reactPlayer}
								playing={isPlaying}
								controls={false}
								width='100%'
								height='100%'
								wrapper='div'
							/>
						</div>
					) : (
						<Img fluid={image} alt={title} ref={imageRef} />
					)}
				</Link>
			</div>
			<div className={styles.linkContainer}>
				<h3>{title}</h3>
			</div>
		</article>
	)
}
