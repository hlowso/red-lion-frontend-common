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
  createListModalOpen: boolean
  setSelectUnplannedModalOpen: (open: boolean) => void
  setCreateUnplannedModalOpen: (open: boolean) => void
  setCreateListModalOpen: (open: boolean) => void
}

const App = () => {
  const { serverUrl, apiBaseUrl, components, orientation } =
    useContext(FrontendContext)
  const [openListId, setOpenListId] = useState<number | undefined>(-1)
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)
  const [createListModalOpen, setCreateListModalOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider components={components!}>
        <SocketProvider serverUrl={serverUrl!}>
          <RequestsProvider apiBaseUrl={apiBaseUrl!}>
            <PlayProvider>
              <VendorProvider>
                {orientation === 'landscape' ? (
                  <LandscapeApp
                    openListId={openListId}
                    setOpenListId={setOpenListId}
                    selectUnplannedModalOpen={selectUnplannedModalOpen}
                    createUnplannedModalOpen={createUnplannedModalOpen}
                    createListModalOpen={createListModalOpen}
                    setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
                    setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
                    setCreateListModalOpen={setCreateListModalOpen}
                  />
                ) : (
                  <PortraitApp
                    openListId={openListId}
                    setOpenListId={setOpenListId}
                    selectUnplannedModalOpen={selectUnplannedModalOpen}
                    createUnplannedModalOpen={createUnplannedModalOpen}
                    createListModalOpen={createListModalOpen}
                    setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
                    setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
                    setCreateListModalOpen={setCreateListModalOpen}
                  />
                )}
              </VendorProvider>
            </PlayProvider>
          </RequestsProvider>
        </SocketProvider>
      </UIProvider>
    </QueryClientProvider>
  )
}

export default App
