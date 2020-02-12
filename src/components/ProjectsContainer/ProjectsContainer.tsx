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
							fluid {
								...GatsbySanityImageFluid
							}
						}
					}
				}
			}
		}
	`)
	// console.log(data.allSanityProject)
	// const [gridSorted, setGridSorted] = useState(false)
	// let sortedArr: any[] = []

	// if (data.allSanityProject.nodes && data.allSanityProject.nodes.length > 0) {
	// 	while (gridSorted === false) {
	// 		sortedArr = sortImageGrid(data.allSanityProject.nodes)
	// 		// console.log(sortedArr)
	// 		if (sortedArr.length === data.allSanityProject.nodes.length) {
	// 			setGridSorted(true)
	// 			return
	// 		}
	// 	}
	// }

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
	console.log(falsyValues)
	console.log(truthyValues)

	const sortedArr = zip(falsyValues, truthyValues)
	console.log(sortedArr)

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
