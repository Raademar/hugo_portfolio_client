import React, { FunctionComponent } from 'react'
import { Header } from '../components/Header/Header'
import { Banner } from '../components/Banner/Banner'

type Props = {
  props: any
}

const Index: FunctionComponent = props => {
  return (
    <>
      <Header />
      <Banner />
    </>
  )
}

export default Index
