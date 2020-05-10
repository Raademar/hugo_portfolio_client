import { graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent } from 'react'
import styles from './Footer.module.scss'

export const Footer: FunctionComponent = () => {
  return (
    <div className={styles.footerContainer}>
      <p>Ad Lucem</p>
    </div>
  )
}
