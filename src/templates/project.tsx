import React from 'react'
import { graphql } from 'gatsby'

const project = ({ data }: any) => {
	console.log(data)

	return (
		<div>
			<h1>project</h1>
		</div>
	)
}

export const query = graphql`
	query($slug: String) {
		sanityProject(slug: { current: { eq: $slug } }) {
			title
		}
	}
`

export default project
