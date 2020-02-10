import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ProjectPreview } from '../ProjectPreview/ProjectPreview'
import styles from './ProjectsContainer.module.scss'

export const ProjectsContainer = () => {
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
	console.log(data.allSanityProject)

	return (
		<section className={styles.container}>
			{data.allSanityProject.nodes &&
				data.allSanityProject.nodes.map((project: any, index: number) => {
					return (
						<ProjectPreview
							key={index}
							featuredProject={project.featuredProject}
							left={index % 2 === 0 && !project.featuredProject}
							right={index % 2 === 1 && !project.featuredProject}
							image={project.image.asset.fluid}
							title={project.title}
							url={project.slug.current}
							// description={project._rawDescription[0].children[0].text}
						/>
					)
				})}
		</section>
	)
}
