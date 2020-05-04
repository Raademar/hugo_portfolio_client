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
      _rawBody
      _rawIntroText
    }
  }
`

const Index: FunctionComponent<Props> = ({ data }: any) => {
  const { _rawIntroText, _rawBody } = data.sanityStartPageText

  return (
    <>
      <Banner />
      <Layout>
        <TextBox
          texts={[
            _rawIntroText[0].children[0].text,
            _rawBody[0].children[0].text,
          ]}
        />
        <ProjectsContainer />
      </Layout>
    </>
  )
}

export default Index
