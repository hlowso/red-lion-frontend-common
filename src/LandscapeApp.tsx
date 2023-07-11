import React from 'react'
import Nav from './components/Nav'
import Lists from './components/Lists'
import Possessions from './components/Possessions'
import { useEffect } from 'react'
import Notifications from './components/Notifications'
import Vendor from './components/Vendor'
import {
  PlayProvider,
  VendorProvider,
  usePlayContext,
  useSocket,
  useUIContext
} from './contexts'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <PlayProvider>
        <VendorProvider>
          <Div className='LandscapeApp'>
            <Nav />
            <Div>
              <Lists />
              <Possessions />
            </Div>
            <Vendor />
            <Notifications />
          </Div>
        </VendorProvider>
      </PlayProvider>
    </QueryClientProvider>
  )
}

export default LandscapeApp
