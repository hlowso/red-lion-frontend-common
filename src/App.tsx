import React, { useContext, useState } from 'react'
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

const queryClient = new QueryClient()

export interface AppProps {
  openListId?: number
  setOpenListId: (id?: number) => void
  selectUnplannedModalOpen: boolean
  createUnplannedModalOpen: boolean
  setSelectUnplannedModalOpen: (open: boolean) => void
  setCreateUnplannedModalOpen: (open: boolean) => void
}

const App = () => {
  const { serverUrl, apiBaseUrl, components, orientation } =
    useContext(FrontendContext)
  const [openListId, setOpenListId] = useState<number | undefined>(-1)
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)

  return (
    <UIProvider components={components!}>
      <RequestsProvider apiBaseUrl={apiBaseUrl!}>
        <QueryClientProvider client={queryClient}>
          <SocketProvider serverUrl={serverUrl!}>
            <PlayProvider>
              <VendorProvider>
                {orientation === 'landscape' ? (
                  <LandscapeApp
                    openListId={openListId}
                    setOpenListId={setOpenListId}
                    selectUnplannedModalOpen={selectUnplannedModalOpen}
                    createUnplannedModalOpen={createUnplannedModalOpen}
                    setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
                    setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
                  />
                ) : (
                  <PortraitApp
                    openListId={openListId}
                    setOpenListId={setOpenListId}
                    selectUnplannedModalOpen={selectUnplannedModalOpen}
                    createUnplannedModalOpen={createUnplannedModalOpen}
                    setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
                    setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
                  />
                )}
              </VendorProvider>
            </PlayProvider>
          </SocketProvider>
        </QueryClientProvider>
      </RequestsProvider>
    </UIProvider>
  )
}

export default App
