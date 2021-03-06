import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { zip } from '../../helpers/helpers'
import { ProjectPreview } from '../ProjectPreview/ProjectPreview'
import styles from './ProjectsContainer.module.scss'

export const ProjectsContainer = (props: any) => {
  const data = useStaticQuery(graphql`
    {
      allSanityProject {
        nodes {
          id
          title
          slug {
            current
          }
          featuredProject
          _rawDescription
          publishedAt
          vimeoSrc
          image {
            asset {
              fluid(maxWidth: 1200) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  `)

  let falsyValues = []
  let truthyValues = []
  for (let item of data.allSanityProject.nodes) {
    if (item.featuredProject) {
      truthyValues.push(item)
    } else {
      falsyValues.push(item)
    }
  }

  const sortedArr = zip(
    falsyValues.sort(
      (a: any, b: any) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    ),
    truthyValues
  ).filter((item: any) => item !== undefined)

  return (
    <section className={styles.container}>
      {sortedArr.length > 0 &&
        sortedArr.map((project: any, index: number) => {
          return (
            <ProjectPreview
              key={index}
              featuredProject={project?.featuredProject}
              left={index % 2 === 0 && !project?.featuredProject}
              right={index % 2 === 1 && !project?.featuredProject}
              image={project?.image && project?.image.asset.fluid}
              title={project?.title}
              url={project?.slug.current}
              gridRow={index + 1}
              vimeoSrc={project?.vimeoSrc}
              // description={project._rawDescription[0].children[0].text}
            />
          )
        })}
    </section>
  )
}
