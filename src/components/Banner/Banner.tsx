import React, { FunctionComponent, useRef } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import ImageGallery from 'react-image-gallery'
import Flickity from 'react-flickity-component'
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
        index,
      }
    })

  // const navigateToImageUrl = (e: React.MouseEvent, index: number) => {
  // 	setCords({ x: e.screenX, y: e.screenY })
  // 	e.stopPropagation()
  // 	console.log(e.screenX, e.screenY)
  // 	const url: string = bannerProjects[index].url
  // 	navigate(url)
  // }

  // const mousePress = (e: React.MouseEvent) => {
  // 	e.stopPropagation()
  // 	console.log('down')

  // 	down = Date.now()
  // }

  // const mouseReleased = (index: number) => {
  // 	console.log('up')

  // 	timeTaken = Date.now() - down
  // 	console.log(timeTaken)
  // 	navigateToImageUrl(index)
  // }

  const size = useWindowSize()
  const IS_MOBILE = size && size.width < 767

  const flickityOptions = {
    initialIndex: bannerProjects.length,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    cellAlign: 'center',
    // adaptiveHeight: true,
  }

  return (
    <div className={styles.container}>
      <Flickity
        className={'carousel'}
        elementType={'div'}
        options={flickityOptions}
        flickityRef={(c) => imageRef}
      >
        {bannerProjects.map((image: any, index: number) => {
          return (
            <Link to={bannerProjects[index].url}>
              <div className='crop-height'>
                <img src={image.original} key={index} />
              </div>
            </Link>
          )
        })}
      </Flickity>
    </div>
  )
}
