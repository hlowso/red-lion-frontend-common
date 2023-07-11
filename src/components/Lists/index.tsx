import React, { useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { dueToday, interfaceLists } from 'common/selectors'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import useLists from '../../hooks/useLists'
import useActivities from '../../hooks/useActivities'

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
  const [openActivityId, setOpenActivityId] = useState<number>()

  const openActivity = activities?.find((a) => a.id === openActivityId)
  const isLoading = playContextLoading || isLoadingLists || isLogging

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
    <Div>
      {isLoading ? (
        <Loading />
      ) : (
        <Div style={{ display: 'flex' }}>
          {[
            ...interfaceLists(lists || []).map((list) => (
              <ActivityList
                key={list.id}
                listName={list.name}
                activities={
                  activities?.filter((a) => a.listId === list.id) || []
                }
                openActivityModal={setOpenActivityId}
              />
            )),
            <ActivityList
              key='today'
              listName='Today'
              activities={dueToday(activities || [])}
              openActivityModal={setOpenActivityId}
            />
          ]}
        </Div>
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
