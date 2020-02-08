import React, { FunctionComponent } from 'react'
import { Layout } from '../components/Layout/Layout'
import { Banner } from '../components/Banner/Banner'

type Props = {
	props: any
}

const Index: FunctionComponent = props => {
	return (
		<>
			<Layout>
				<Banner />
			</Layout>
		</>
	)
}

export default Index
