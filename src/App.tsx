import React, { useContext, useEffect, useState } from 'react'
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
import { DndProvider } from 'react-dnd'
import { EditingProvider } from './contexts/EditingContext'
import useLists from './hooks/useLists'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000
    }
  }
})

export interface AppProps {
  openListId?: number
  openGoalId?: number
  setOpenListId: (id?: number) => void
  setOpenGoalId: (id?: number) => void
  selectUnplannedModalOpen: boolean
  createUnplannedModalOpen: boolean
  setSelectUnplannedModalOpen: (open: boolean) => void
  setCreateUnplannedModalOpen: (open: boolean) => void
}

const App = () => {
  const { orientation } = useContext(FrontendContext)
  const { data: lists } = useLists()
  const [openListId, setOpenListId] = useState<number | undefined>(-1)
  const [openGoalId, setOpenGoalId] = useState<number | undefined>()
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)

  useEffect(() => {
    setOpenListId((id) => (lists?.some((l) => l.id === id) ? id : -1))
  }, [lists?.length])

  return orientation === 'landscape' ? (
    <LandscapeApp
      openListId={openListId}
      openGoalId={openGoalId}
      setOpenListId={setOpenListId}
      setOpenGoalId={setOpenGoalId}
      selectUnplannedModalOpen={selectUnplannedModalOpen}
      createUnplannedModalOpen={createUnplannedModalOpen}
      setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
      setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
    />
  ) : (
    <PortraitApp
      openListId={openListId}
      openGoalId={openGoalId}
      setOpenListId={setOpenListId}
      setOpenGoalId={setOpenGoalId}
      selectUnplannedModalOpen={selectUnplannedModalOpen}
      createUnplannedModalOpen={createUnplannedModalOpen}
      setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
      setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
    />
  )
}

export default () => {
  const { serverUrl, apiBaseUrl, components, dndBackend } =
    useContext(FrontendContext)
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={dndBackend!}>
        <UIProvider components={components!}>
          <SocketProvider serverUrl={serverUrl!}>
            <RequestsProvider apiBaseUrl={apiBaseUrl!}>
              <EditingProvider>
                <PlayProvider>
                  <VendorProvider>
                    <App />
                  </VendorProvider>
                </PlayProvider>
              </EditingProvider>
            </RequestsProvider>
          </SocketProvider>
        </UIProvider>
      </DndProvider>
    </QueryClientProvider>
  )
}
