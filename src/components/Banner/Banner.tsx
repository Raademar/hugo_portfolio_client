import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useWindowSize } from '../../helpers/helpers'
import styles from './Banner.module.scss'

type Props = {
  history?: any
}

export const Banner: FunctionComponent<Props> = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    setIsPlaying(true)
  }, [isLoaded])
  const data = useStaticQuery(graphql`
    query {
      sanityBannerVideo {
        title
        vimeoURL,
        loadingImage {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  `)
  const size = useWindowSize()
  const IS_MOBILE = size && size.width < 767

  const { title, vimeoURL, loadingImage } = data.sanityBannerVideo

  return (
    <div className={styles.container}>
      <div className={styles.playerWrapper}>
        <div className={styles.bannerProjectText}>
          <h1
            className={isLoaded ? 'bannerProjectTextP bannerProjectText' : ''}
            style={{ opacity: isLoaded ? 0 : 1 }}
          >
            {title}
          </h1>
        </div>
        {!isLoaded && (
          <Img
            fluid={loadingImage.asset.fluid}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              // zIndex: 1,
            }}
          />
        )}
        <ReactPlayer
          url={vimeoURL}
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
        />
      </div>
    </div>
  )
}
