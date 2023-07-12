import React, { useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { dueToday, interfaceLists } from 'common/selectors'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import useLists from '../../hooks/useLists'
import useActivities from '../../hooks/useActivities'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import ListNav from './ListNav'

const Loading = () => {
  const { Div, Spinner } = useUIContext()
  return (
    <Div style={{ margin: '30vh auto', width: 'fit-content' }}>
      <Spinner />
    </Div>
  )
}

const Lists = () => {
  const queryClient = useQueryClient()
  const { Div } = useUIContext()
  const Requests = useContext(RequestsContext)
  const {
    gameId,
    characterId,
    isLoading: playContextLoading
  } = usePlayContext()
  const [isLogging, setIsLogging] = useState(false)
  const { data: lists, isLoading: isLoadingLists } = useLists(
    { gameId, characterId },
    !!gameId && !!characterId
  )
  const { data: activities } = useActivities(
    { gameId, characterId },
    !!gameId && !!characterId
  )
  const [openListId, setOpenListId] = useState<number>(-1)
  const [openActivityId, setOpenActivityId] = useState<number>()
  const openActivity = activities?.find((a) => a.id === openActivityId)
  const isLoading = playContextLoading || isLoadingLists || isLogging
  const listNavItems = [
    { id: -1, name: 'Today', icon: 'BrightnessLowFill' },
    ...interfaceLists(lists || []).map(({ id, name }) => ({
      id,
      name,
      icon: 'ListCheck'
    }))
  ]
  const openListName =
    lists?.find((list) => list.id === openListId)?.name || 'Today'
  const openListActivities =
    openListId === -1
      ? dueToday(activities || [])
      : activities?.filter((a) => a.listId === openListId)

  const onLog = async () => {
    // 1. Close modal
    setOpenActivityId(undefined)

    // 2. Set logging state
    setIsLogging(true)

    // 3. Create the log record
    await Requests.completeActivityAsCharacter({
      characterId: characterId!,
      activityId: openActivityId!
    })

    // 4. Fetch updated records pertaining to current game
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })

    // 5. Done logging
    setIsLogging(false)
  }

  return (
    <Div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        padding: '0 20px'
      }}
    >
      <ListNav
        lists={listNavItems}
        openListId={openListId}
        openList={setOpenListId}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ActivityList
          listName={openListName}
          activities={openListActivities || []}
          openActivityModal={setOpenActivityId}
        />
      )}
      <ActivityModal
        show={!!openActivity}
        activity={openActivity!}
        log={onLog}
        close={() => setOpenActivityId(undefined)}
      />
    </Div>
  )
}

export default Lists
