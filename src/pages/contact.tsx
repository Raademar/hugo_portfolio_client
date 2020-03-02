import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import { TextBox } from '../components/TextBox/TextBox'
import styles from '../styles/pages/contact.module.scss'

type Props = {
	props: any
}

export const query = graphql`
	{
		sanityContactPage {
			contactText {
				children {
					text
				}
			}
			email
			phone
		}
	}
`

const Contact: FunctionComponent<Props> = ({ data }: any) => {
	const { contactText, email, phone } = data.sanityContactPage

	return (
		<>
			<Layout>
				<div className={styles.contactContainer}>
					<TextBox texts={[contactText[0].children[0].text, email, phone]} />
				</div>
			</Layout>
		</>
	)
}

export default Contact
