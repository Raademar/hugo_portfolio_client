import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Layout } from '../components/Layout/Layout'
import { Video } from '../components/Video/Video'
import styles from './Project.module.scss'

export const query = graphql`
  query($slug: String) {
    sanityProject(slug: { current: { eq: $slug } }) {
      _rawDescription
      director
      cinematographer
      producer
      publishedAt
      categories {
        title
      }
      featuredProject
      id
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      vimeoSrc
      vimeoSrcPlayer
    }
    allSanityStills(
      filter: { belongsTo: { elemMatch: { slug: { current: { eq: $slug } } } } }
    ) {
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

const project = ({ data }: any) => {
  const {
    image,
    title,
    _rawDescription,
    director,
    cinematographer,
    producer,
    categories,
    publishedAt,
    vimeoSrc,
    vimeoSrcPlayer
  } = data.sanityProject

  const timeStamp = `( 0${new Date(publishedAt).getMonth() + 1} / ${new Date(
    publishedAt
  ).getFullYear()} )`
  console.log(data)

  return (
    <Layout>
      <div className={styles.projectContainer}>
        <div className={styles.projectImageContainer}>
          {vimeoSrcPlayer ? (
            <Video videoSrcURL={vimeoSrcPlayer} />
          ) : (
            <Img fluid={image.asset.fluid} alt={title} />
          )}
        </div>
        <div className={styles.title}>
          <p>{title}</p>
          <p>{timeStamp}</p>
        </div>
        <div className={styles.projectDescription}>
          <p>{_rawDescription[0].children[0].text}</p>
          <p>Directed by: {director}</p>
          <p>Cinematography by: {cinematographer}</p>
          <p>Produced by: {producer}</p>
        </div>
        <div className={styles.projectStills}>
          {data.allSanityStills.nodes.map((item: any, index: number) => (
            <div className={styles.projectStillsImageContainer}>
              <Img fluid={item.image.asset.fluid} alt={item.id} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default project
