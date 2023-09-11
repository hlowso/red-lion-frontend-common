import React, { useContext, useEffect, useState } from 'react'
import {
  FrontendContext,
  PlayProvider,
  RequestsProvider,
  SocketProvider,
  UIProvider,
  VendorProvider,
  useUIContext
} from './contexts'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Nav from './components/Nav'
import { DndProvider } from 'react-dnd'
import { EditingProvider } from './contexts/EditingContext'
import useLists from './hooks/useLists'
import { ListRow, Activity, CharacterGoal } from 'common'
import useActivities from './hooks/activities/useActivities'
import useCharacterGoals from './hooks/characters/useCharacterGoals'
import { ViewsProvider, View } from './contexts/ViewsContext'
import { SettingsProvider } from './contexts/SettingsContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000
    }
  }
})

export interface AppProps {
  lists: ListRow[]
  activities: Activity[]
  characterGoals: CharacterGoal[]
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
  const ui = useUIContext()
  const { orientation } = useContext(FrontendContext)
  const { data: lists } = useLists()
  const { data: activities } = useActivities()
  const { data: characterGoals } = useCharacterGoals()
  const [openListId, setOpenListId] = useState<number | undefined>(-1)
  const [openGoalId, setOpenGoalId] = useState<number | undefined>()
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)

  useEffect(() => {
    setOpenListId((id) => (lists?.some((l) => l.id === id) ? id : -1))
  }, [lists?.length])

  return (
    <ui.Div
      className={orientation === 'landscape' ? 'LandscapeApp' : 'PortraitApp'}
    >
      <Nav />
      <View
        lists={lists || []}
        activities={activities || []}
        characterGoals={characterGoals || []}
        openListId={openListId}
        openGoalId={openGoalId}
        setOpenListId={setOpenListId}
        setOpenGoalId={setOpenGoalId}
        selectUnplannedModalOpen={selectUnplannedModalOpen}
        createUnplannedModalOpen={createUnplannedModalOpen}
        setSelectUnplannedModalOpen={setSelectUnplannedModalOpen}
        setCreateUnplannedModalOpen={setCreateUnplannedModalOpen}
      />
    </ui.Div>
  )
}

export default () => {
  const { serverUrl, apiBaseUrl, components, dndBackend } =
    useContext(FrontendContext)
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={dndBackend!}>
        <SettingsProvider>
          <UIProvider components={components!}>
            <SocketProvider serverUrl={serverUrl!}>
              <RequestsProvider apiBaseUrl={apiBaseUrl!}>
                <EditingProvider>
                  <PlayProvider>
                    <VendorProvider>
                      <ViewsProvider>
                        <App />
                      </ViewsProvider>
                    </VendorProvider>
                  </PlayProvider>
                </EditingProvider>
              </RequestsProvider>
            </SocketProvider>
          </UIProvider>
        </SettingsProvider>
      </DndProvider>
    </QueryClientProvider>
  )
}
