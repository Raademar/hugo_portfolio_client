import React, { useState, useEffect } from 'react'
import styles from './Lightbox.module.scss'
import { ChevronRight, ChevronLeft } from 'react-feather'
type Props = {
	images: { source: string; index: number }[]
	onClose: () => void
	startImage: any
}

export const Lightbox = ({ images, onClose, startImage }: Props) => {
	const [activeImage, setActiveImage] = useState(images[startImage])

	const cycleToNextImage = () => {
		if (activeImage.index + 1 === images.length) {
			setActiveImage(images[0])
			return
		}
		setActiveImage(images[activeImage.index + 1])
	}

	const cycleToPreviousImage = () => {
		if (activeImage.index === 0) {
			setActiveImage(images[images.length - 1])
			return
		}
		setActiveImage(images[activeImage.index - 1])
	}

	return (
		<div className={styles.lightboxContainer}>
			<div className={styles.lightboxContainerInner}>
				<span className={styles.close} onClick={onClose}>
					CLOSE
				</span>
				<span className={styles.nextImage} onClick={cycleToNextImage}>
					<ChevronRight />
				</span>
				<span className={styles.previousImage} onClick={cycleToPreviousImage}>
					<ChevronLeft />
				</span>
				<img src={activeImage.source} />
			</div>
		</div>
	)
}
