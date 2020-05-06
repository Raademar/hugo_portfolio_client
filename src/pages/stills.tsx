import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { FunctionComponent, useState } from 'react'
import { Layout } from '../components/Layout/Layout'
import { Lightbox } from '../components/Lightbox/Lightbox'
import styles from '../styles/pages/stills.module.scss'

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

  return (
    <>
      {modalIsOpen && (
        <Lightbox
          images={images}
          startImage={stillsImage}
          onClose={() => setModalIsOpen(false)}
          clickOutsideImage={() => setModalIsOpen(false)}
        />
      )}
      <Layout>
        <div
          className={styles.stillsContainer}
          onClick={() => {
            setModalIsOpen(true)
          }}
        >
          {nodes.length > 0 ? (
            nodes.map((item: any, index: number) => (
              <div key={index} onClick={() => setStillsImage(index)}>
                <Img fluid={item.image.asset.fluid} />
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
              <h3>Something went wrong when we tried to get the images...</h3>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Contact
