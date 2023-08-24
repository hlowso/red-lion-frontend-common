import React from 'react'
import Nav from '../components/Nav'
import { useUIContext } from '../contexts'
import { AppProps } from '../App'
import { View } from '../contexts/ViewsContext'

const LandscapeApp = (props: AppProps) => {
  const ui = useUIContext()

  return (
    <ui.Div className='LandscapeApp'>
      <Nav />
      <View {...props} />
    </ui.Div>
  )
}

export default LandscapeApp
