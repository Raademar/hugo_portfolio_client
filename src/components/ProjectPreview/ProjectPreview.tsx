import React from 'react'
import styles from './ProjectPreview.module.scss'

const ProjectPreview = () => {
  return (
    <article className={styles.projectPreviewContainer}>
      <div className={styles.projectImageContainer}>
        <img src='../loading_page_image.png' alt='project_image' />
      </div>
      <div className={styles.linkContainer}>
        <h3>Christian Louboutin - Black Tie</h3>
      </div>
    </article>
  )
}

export default ProjectPreview
