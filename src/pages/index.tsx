import React, { FunctionComponent } from 'react'
import { Layout } from '../components/Layout/Layout'
import { Banner } from '../components/Banner/Banner'
import { TextBox } from '../components/TextBox/TextBox'
import { ProjectsContainer } from '../components/ProjectsContainer/ProjectsContainer'

type Props = {
	props: any
}

const Index: FunctionComponent<Props> = props => {
	return (
		<>
			<Layout>
				<Banner />
				<TextBox />
				<ProjectsContainer />
			</Layout>
		</>
	)
}

export default Index
