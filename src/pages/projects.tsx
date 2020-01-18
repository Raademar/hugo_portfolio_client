import React, { FunctionComponent } from 'react'
import { Header } from '../components/Header/Header'
import ProjectPreview from '../components/ProjectPreview/ProjectPreview'

type Props = {
  props: any
}

const Projects: FunctionComponent = props => {
  return (
    <>
      <Header />
      <ProjectPreview />
    </>
  )
}

export default Projects
