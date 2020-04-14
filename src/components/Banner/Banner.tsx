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

  return (
    <div className={styles.container}>
      <div className={styles.playerWrapper}>
        <div className={styles.bannerProjectText}>
          <h1>Dua Lipa - Future Nostalgia album teaser</h1>
        </div>
        <ReactPlayer
          url='https://vimeo.com/402944168'
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
