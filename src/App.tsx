import React, { useEffect } from 'react'
import {
  PlayProvider,
  VendorProvider,
  usePlayContext,
  useSocket
} from './contexts'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LandscapeApp from './Apps/LandscapeApp'
import PortraitApp from './Apps/PortraitApp'

interface Props {
  version: 'landscape' | 'portrait'
}

const queryClient = new QueryClient()

const App = ({ version }: Props) => {
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
          {version === 'landscape' ? <LandscapeApp /> : <PortraitApp />}
        </VendorProvider>
      </PlayProvider>
    </QueryClientProvider>
  )
}

export default App
