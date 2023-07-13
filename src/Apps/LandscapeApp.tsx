import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import { useUIContext, usePlayContext } from '../contexts'
import { interfaceLists } from 'common/selectors'
import { ActivityPostParams, ActivityRow, ListRow } from 'common'
import CreateActivityModal from '../components/Lists/CreateActivityModal'
import useL from '../hooks/useLists'
import useA from '../hooks/activities/useActivities'
import useT from '../hooks/useTallies'
import { Contexts } from '..'
import { useQueryClient } from '@tanstack/react-query'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'

const unplannedList = (lists: ListRow[]) =>
  lists.find((l) => l.name === 'Unplanned')

const listNavItems = (lists: ListRow[]) => [
  { id: -1, name: 'Today', icon: 'BrightnessLowFill' },
  ...interfaceLists(lists || []).map(({ id, name }) => ({
    id,
    name,
    icon: 'ListCheck'
  }))
]
const unplannedActivites = (lists: ListRow[], activities: ActivityRow[]) =>
  activities.filter((a) => a.listId === unplannedList(lists)?.id)

const LandscapeApp = () => {
  const Requests = useContext(Contexts.RequestsContext)
  const queryClient = useQueryClient()
  const { Div } = useUIContext()
  const { gameId, characterId, ...context } = usePlayContext()
  const { data: L } = useL({ gameId, characterId }, !context.isLoading)
  const { data: A } = useA({ gameId, characterId }, !context.isLoading)
  const { data: T } = useT({ gameId }, !context.isLoading)

  const [openListId, setOpenListId] = useState<number>(-1)
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)
  const [isLogging, setIsLogging] = useState(false)

  const onCreateUnplanned = async (
    params: Omit<ActivityPostParams, 'listId'>
  ) => {
    setIsLogging(true)
    setCreateUnplannedModalOpen(false)
    await Requests.createActivity({
      ...params,
      listId: unplannedList(L || [])?.id || -1,
      logCompletionOnCreate: {
        subjectId: characterId || -1,
        subjectType: 'character'
      }
    })
    setIsLogging(false)
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })
  }

  return (
    <Div className='LandscapeApp'>
      <Nav />
      <Div
        style={{
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          padding: '85px 20px 20px',
          top: 0
        }}
      >
        <ListNav
          lists={listNavItems(L || [])}
          openListId={openListId}
          openList={setOpenListId}
          openUnplannedModal={() =>
            unplannedActivites(L || [], A || []).length
              ? setSelectUnplannedModalOpen(true)
              : setCreateUnplannedModalOpen(true)
          }
        />
        <Lists lists={L || []} activities={A || []} openListId={openListId} />
      </Div>
      <Possessions />
      <Vendor />
      <Notifications />
      <SelectUnplannedActivityModal
        isLogging={isLogging}
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={unplannedActivites(L || [], A || [])}
        createNewActivity={() => {
          setSelectUnplannedModalOpen(false)
          setCreateUnplannedModalOpen(true)
        }}
      />
      <CreateActivityModal
        tallies={T || []}
        isCreating={isLogging}
        show={createUnplannedModalOpen}
        close={() => setCreateUnplannedModalOpen(false)}
        createActivity={onCreateUnplanned}
      />
    </Div>
  )
}

export default LandscapeApp
