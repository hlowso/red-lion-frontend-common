import React from 'react'
import Nav from './components/Nav'
import Lists from './components/Lists'
import Possessions from './components/Possessions'
import { useEffect } from 'react'
import Notifications from './components/Notifications'
import Vendor from './components/Vendor'
import './App.css'
import { usePlayContext, useSocket, useUIContext } from './contexts'

const LandscapeApp = () => {
  const { Div } = useUIContext()
  const { userId } = usePlayContext()
  const socketEvents = useSocket()

  useEffect(() => {
    if (userId) {
      socketEvents?.identify({ userId })
    }
  }, [userId, socketEvents])

  return (
    <Div className='LandscapeApp'>
      <Nav />
      <Div>
        <Lists />
        <Possessions />
      </Div>
      <Vendor />
      <Notifications />
    </Div>
  )
}

export default LandscapeApp
