import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout/Layout"
import { TextBox } from "../components/TextBox/TextBox"
import styles from "../styles/pages/contact.module.scss"

type Props = {
	props: any
}

export const query = graphql`
	{
		sanityContactPage {
			_rawContactText
			email
			phone
		}
	}
`

const Contact: FunctionComponent<Props> = ({ data }: any) => {
	const { _rawContactText, email, phone } = data.sanityContactPage

	return (
		<>
			<Layout>
				<div className={styles.contactContainer}>
					<TextBox texts={[_rawContactText[0].children[0].text]} />
					<section className={styles.contactInfoContainer}>
						<div className={styles.emailPhoneInsta}>
							<p>{email}</p>
							<p>{phone}</p>
							<a href='https://instagram.com/igotvisions' target='_blank'>
								Instagram
							</a>
						</div>
					</section>
				</div>
			</Layout>
		</>
	)
}

export default Contact
