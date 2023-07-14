import React, { useContext } from 'react'
import {
  FrontendContext,
  PlayProvider,
  RequestsProvider,
  SocketProvider,
  UIProvider,
  VendorProvider
} from './contexts'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LandscapeApp from './Apps/LandscapeApp'
import PortraitApp from './Apps/PortraitApp'

interface Props {
  version: 'landscape' | 'portrait'
}

const queryClient = new QueryClient()

const App = ({ version }: Props) => {
  const { serverUrl, apiBaseUrl, components } = useContext(FrontendContext)
  return (
    <UIProvider components={components!}>
      <RequestsProvider apiBaseUrl={apiBaseUrl!}>
        <QueryClientProvider client={queryClient}>
          <SocketProvider serverUrl={serverUrl!}>
            <PlayProvider>
              <VendorProvider>
                {version === 'landscape' ? <LandscapeApp /> : <PortraitApp />}
              </VendorProvider>
            </PlayProvider>
          </SocketProvider>
        </QueryClientProvider>
      </RequestsProvider>
    </UIProvider>
  )
}

export default App
