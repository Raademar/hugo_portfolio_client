import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ProjectPreview } from '../ProjectPreview/ProjectPreview'
import styles from './ProjectsContainer.module.scss'
import { sortImageGrid, zip } from '../../helpers/helpers'

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
							fluid(maxWidth: 1200) {
								...GatsbySanityImageFluid
							}
						}
					}
				}
			}
		}
	`)
	console.log(data.allSanityProject.nodes)

	let falsyValues = []
	let truthyValues = []
	for (let item of data.allSanityProject.nodes) {
		if (item.featuredProject) {
			truthyValues.push(item)
		} else {
			falsyValues.push(item)
		}
	}

	const sortedArr = zip(falsyValues, truthyValues)

	return (
		<section className={styles.container}>
			{sortedArr.length > 0 &&
				sortedArr.map((project: any, index: number) => {
					return (
						<ProjectPreview
							key={index}
							featuredProject={project.featuredProject}
							left={index % 2 === 0 && !project.featuredProject}
							right={index % 2 === 1 && !project.featuredProject}
							image={project.image.asset.fluid}
							title={project.title}
							url={project.slug.current}
							gridRow={index + 1}
							// description={project._rawDescription[0].children[0].text}
						/>
					)
				})}
		</section>
	)
}
