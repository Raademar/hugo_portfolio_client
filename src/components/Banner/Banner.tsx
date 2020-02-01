import React, { FunctionComponent } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './Banner.module.scss'

export const Banner: FunctionComponent = props => {
  const data = useStaticQuery(graphql`
    query {
      adidasCommercial: file(relativePath: { eq: "adidas_commercial.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div className={styles.container}>
      <Img fluid={data.adidasCommercial.childImageSharp.fluid} />
    </div>
  )
}
