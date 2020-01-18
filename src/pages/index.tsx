import React, { FunctionComponent } from 'react'
import { Header } from '../components/Header/Header'

type Props = {
  props: any
}

const Index: FunctionComponent = props => {
  return (
    <>
      <Header />
      <h1>Hey from gatsby</h1>
    </>
  )
}

export default Index
