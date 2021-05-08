import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { FunctionComponent, useState, useRef } from 'react'
import { window } from 'browser-monads'
import { Layout } from '../components/Layout/Layout'
import { Lightbox } from '../components/Lightbox/Lightbox'
import styles from '../styles/pages/stills.module.scss'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

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
        belongsTo {
          title
        }
      }
    }
  }
`

const Contact: FunctionComponent<Props> = ({ data }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [stillsImage, setStillsImage] = useState(0)

  const { nodes } = data.allSanityStills
  const images = nodes.filter((filterItem: any) => filterItem.belongsTo.length === 0).map((item: any, index: number) => {
    return { source: item.image.asset.fluid, index }
  })
  console.log('nodes', nodes);
  console.log('images', images);

  // const nodes: any[] = []

  const fromTop = window.pageYOffset
  const targetRef = useRef()

  if (modalIsOpen && targetRef != null) {
    //@ts-ignore
    disableBodyScroll(targetRef.current)
  } else {
    clearAllBodyScrollLocks()
  }
  return (
    <>
      {modalIsOpen && (
        <Lightbox
          images={images}
          startImage={stillsImage}
          onClose={() => setModalIsOpen(false)}
          clickOutsideImage={() => setModalIsOpen(false)}
          style={{ top: `${fromTop}px` }}
          ref={targetRef}
        />
      )}
      <Layout>
        <div
          className={styles.stillsContainer}
          onClick={() => {
            setModalIsOpen(true)
          }}
        >
          {images.length > 0 ? (
            images.map((item: any, index: number) => (
              <div key={index} onClick={() => setStillsImage(index)}>
                <Img fluid={item.source} key={index} />
              </div>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                gridColumn: '1 / -1',
                justifyContent: 'center',
              }}
            >
              <h3>No stills posted yet.</h3>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Contact
