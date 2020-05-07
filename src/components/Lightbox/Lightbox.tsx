import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useOutsideClick } from '../../helpers/helpers'
import styles from './Lightbox.module.scss'

type Props = {
  images: { source: string; index: number }[]
  onClose: () => void
  startImage: any
  clickOutsideImage: () => void
  style?: any
  ref: any
}

export const Lightbox = ({
  images,
  onClose,
  startImage,
  clickOutsideImage,
  style,
}: Props) => {
  const [activeImage, setActiveImage] = useState(images[startImage])
  const [currentKeyDown, setCurrentKeyDown] = useState(0)

  // TODO: After a couple of presses the site starts lagging.
  // document.addEventListener('keydown', (e: any) => handleKeyDown(e))

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

  const handleKeyDown = (e: any) => {
    // setCurrentKeyDown(e.keyCode)
    if (e.keyCode === 37) {
      cycleToPreviousImage()
    } else if (e.keyCode === 39) {
      cycleToNextImage()
    } else {
      return
    }
  }

  const image = useRef(null)
  const nextImage = useRef(null)
  const previousImage = useRef(null)
  useOutsideClick([image, nextImage, previousImage], () => clickOutsideImage())

  return (
    <div className={styles.lightboxContainer} style={style}>
      <div className={styles.lightboxContainerInner}>
        <span className={styles.close} onClick={onClose}>
          CLOSE
        </span>
        <span
          className={styles.nextImage}
          ref={nextImage}
          onClick={cycleToNextImage}
        >
          <ChevronRight />
        </span>
        <span
          className={styles.previousImage}
          onClick={cycleToPreviousImage}
          ref={previousImage}
        >
          <ChevronLeft />
        </span>
        <img src={activeImage.source} ref={image} />
      </div>
    </div>
  )
}
