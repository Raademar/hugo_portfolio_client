import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Layout } from '../components/Layout/Layout'
import { Video } from '../components/Video/Video'
import ReactPlayer from 'react-player'
import styles from './Project.module.scss'
import 'array-flat-polyfill'

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
    allSanityProject {
      nodes {
        vimeoSrc
        vimeoSrcPlayer
        title
        categories {
          title
        }
        slug {
          current
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

  const relatedProjects = data.allSanityProject.nodes
    .map((project: any) =>
      project.categories.map((projectCategory: any) => {
        if (projectCategory.title === categories[0]?.title) {
          return project
        }
      })
    )
    .flat()
    .filter((item: any) => item != undefined)

  const shuffled = relatedProjects.sort(() => 0.5 - Math.random())
  const randomSelectedRelatedProjects = shuffled.slice(0, 4)

  const timeStamp = `( 0${new Date(publishedAt || Date.now()).getMonth() +
    1} / ${new Date(publishedAt || Date.now()).getFullYear()} )`

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
        </div>
        <div className={styles.projectDescription}>
          <p>{_rawDescription && _rawDescription[0].children[0].text}</p>
          <p>Directed by: {director}</p>
          <p>Produced by: {producer}</p>
        </div>
        <div className={styles.projectStills}>
          {data.allSanityStills.nodes.map((item: any, index: number) => (
            <div className={styles.projectStillsImageContainer}>
              <Img fluid={item.image.asset.fluid} alt={item.id} />
            </div>
          ))}
        </div>
        <div className={styles.relatedProjectsContainer}>
          {randomSelectedRelatedProjects.map((project: any) => (
            <div>
              <Link to={project.slug.current}>
                <div className={styles.playerWrapper}>
                  <ReactPlayer
                    url={project.vimeoSrc}
                    className={styles.reactPlayer}
                    // playing={isPlaying && isLoaded}
                    controls={false}
                    width='100%'
                    height='100%'
                    // onReady={() => {
                    //   setIsLoaded(true)
                    // }}
                    volume={0}
                    muted
                    preload
                  />
                </div>
                <p>{project.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default project
