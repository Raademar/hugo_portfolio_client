import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import ImageGallery from 'react-image-gallery'
import Flickity from 'react-flickity-component'
import ReactPlayer from 'react-player'
import styles from './Banner.module.scss'
import { useWindowSize } from '../../helpers/helpers'

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
        vimeoURL
      }
      allSanityStills(filter: { title: { eq: "dua lipa 1" } }) {
        nodes {
          image {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  `)
  // const imageRef = useRef(null)
  // const bannerProjects = data.allSanityProject.nodes
  //   .filter((node: any) => node.featuredProject)
  //   .map((item: any, index: number) => {
  //     return {
  //       original: item.image.asset.fluid.src,
  //       url: item.slug && item.slug.current,
  //       index
  //     }
  //   })
  const size = useWindowSize()
  const IS_MOBILE = size && size.width < 767

  // const flickityOptions = {
  //   initialIndex: bannerProjects.length,
  //   prevNextButtons: false,
  //   pageDots: false,
  //   wrapAround: true,
  //   cellAlign: 'center'
  //   // adaptiveHeight: true,
  // }
  const { title, vimeoURL } = data.sanityBannerVideo
  const { fluid } = data.allSanityStills.nodes[0].image.asset

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
            fluid={fluid}
            style={{
              position: 'absolute',
              top: '-50px',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
          preload
        />
      </div>
    </div>
  )
}
