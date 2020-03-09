import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import { TextBox } from '../components/TextBox/TextBox'
import styles from '../styles/pages/stills.module.scss'
import Img from 'gatsby-image'

type Props = {
	props: any
}

export const query = graphql`
	{
		allSanityStills {
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
	}
`

const Contact: FunctionComponent<Props> = ({ data }: any) => {
	const { nodes } = data.allSanityStills
	console.log(nodes)

	return (
		<>
			<Layout>
				<div className={styles.stillsContainer}>
					{nodes.map((item: any, index: number) => (
						<Img fluid={item.image.asset.fluid} />
					))}
				</div>
			</Layout>
		</>
	)
}

export default Contact
