import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import { ProjectPreview } from '../components/ProjectPreview/ProjectPreview'
import styles from './Category.module.scss'

type Props = {
  props: any
}

export const data = graphql`
  query($slug: String) {
    allSanityProject(
      filter: {
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
    ) {
      nodes {
        slug {
          current
        }
        title
        vimeoSrc
        image {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
        categories {
          slug {
            current
          }
          title
        }
      }
    }
  }
`

const category: FunctionComponent<Props> = ({ data }: any) => {
  const projects = data.allSanityProject.nodes

  return (
    <>
      <Layout>
        <div className={styles.projectGrid}>
          {projects.map((project: any, index: number) => (
            <ProjectPreview
              key={index}
              featuredProject={false}
              image={project.image.asset.fluid}
              title={project.title}
              url={project.slug.current}
              vimeoSrc={project.vimeoSrc}
            />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default category
