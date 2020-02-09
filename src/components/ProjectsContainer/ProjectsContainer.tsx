import React from 'react'
import { ProjectPreview } from '../ProjectPreview/ProjectPreview'
import styles from './ProjectsContainer.module.scss'

export const ProjectsContainer = () => {
	return (
		<section className={styles.container}>
			<ProjectPreview featuredProject={false} left />
			<ProjectPreview featuredProject={false} right />
			<ProjectPreview featuredProject={true} />
		</section>
	)
}
