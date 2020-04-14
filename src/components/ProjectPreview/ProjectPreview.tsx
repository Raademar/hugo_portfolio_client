import React, { FunctionComponent, useState, useRef, useEffect } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import ReactPlayer from 'react-player'
import Img from 'gatsby-image'
import styles from './ProjectPreview.module.scss'

type Props = {
  featuredProject: boolean
  image: any
  title: string
  url: string
  vimeoSrc: string
  left?: boolean
  right?: boolean
  gridRow?: number
}

export const ProjectPreview: FunctionComponent<Props> = props => {
  const {
    featuredProject,
    image,
    title,
    url,
    left,
    right,
    gridRow,
    vimeoSrc
  } = props
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
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
          setIsPlaying(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPlaying(false)
        }}
      >
        <Link to={url}>
          <div className={styles.playerWrapper}>
            <div className={styles.bannerProjectText}>
              <p className={styles.bannerProjectTextP}>{title}</p>
            </div>
            <ReactPlayer
              url={vimeoSrc}
              className={styles.reactPlayer}
              playing={isPlaying && isLoaded}
              controls={false}
              loop={true}
              width='100%'
              height='100%'
              onReady={() => {
                setIsLoaded(true)
              }}
              volume={0}
              muted
              preload
            />
          </div>
        </Link>
      </div>
      {/* <div className={styles.linkContainer}>
        <h3>{title}</h3>
      </div> */}
    </article>
  )
}
