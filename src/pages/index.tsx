import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout/Layout'
import { Banner } from '../components/Banner/Banner'
import { TextBox } from '../components/TextBox/TextBox'
import { ProjectsContainer } from '../components/ProjectsContainer/ProjectsContainer'

type Props = {
	props: any
}

export const query = graphql`
	{
		sanityStartPageText {
			introText {
				children {
					text
				}
			}
			body {
				children {
					text
				}
			}
		}
	}
`

const Index: FunctionComponent<Props> = ({ data }: any) => {
	const { introText, body } = data.sanityStartPageText

	return (
		<>
			<Layout>
				<Banner />
				<TextBox
					texts={[introText[0].children[0].text, body[0].children[0].text]}
				/>
				<ProjectsContainer />
			</Layout>
		</>
	)
}

export default Index
