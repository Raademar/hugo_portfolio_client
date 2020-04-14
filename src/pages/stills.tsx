import React, { FunctionComponent, useState, useRef } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import { TextBox } from '../components/TextBox/TextBox'
import { Lightbox } from '../components/Lightbox/Lightbox'
import Flickity from 'react-flickity-component'
import styles from '../styles/pages/stills.module.scss'
import Img from 'gatsby-image'

type Props = {
  props: any
}

export const query = graphql`
  {
    allSanityStills {
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
`

const Contact: FunctionComponent<Props> = ({ data }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [stillsImage, setStillsImage] = useState(0)

  const { nodes } = data.allSanityStills

  const images = nodes.map((item: any, index: number) => {
    return { source: item.image.asset.fluid.src, index }
  })

  const flickityOptions = {
    initialIndex: images.length,
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true,
    cellAlign: 'center',
    autoPlay: true
    // adaptiveHeight: true,
  }

  return (
    <>
      {modalIsOpen && (
        <Lightbox
          images={images}
          startImage={stillsImage}
          onClose={() => setModalIsOpen(false)}
          clickOutsideImage={() => setModalIsOpen(false)}
        />
        // TODO: Implement Flickity as stills viewer
        // <Flickity
        //   className={'carousel'}
        //   elementType={'div'}
        //   options={flickityOptions}
        // >
        //   {images.map((image: any, index: number) => {
        //     return <img src={image.source} key={index} />
        //   })}
        // </Flickity>
      )}
      <Layout>
        <div
          className={styles.stillsContainer}
          onClick={() => {
            setModalIsOpen(true)
          }}
        >
          {nodes.map((item: any, index: number) => (
            <div key={index} onClick={() => setStillsImage(index)}>
              <Img fluid={item.image.asset.fluid} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Contact
