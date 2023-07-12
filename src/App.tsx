import React from 'react'
import { PlayProvider, VendorProvider } from './contexts'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LandscapeApp from './Apps/LandscapeApp'
import PortraitApp from './Apps/PortraitApp'

interface Props {
  version: 'landscape' | 'portrait'
}

const queryClient = new QueryClient()

const App = ({ version }: Props) => {
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
