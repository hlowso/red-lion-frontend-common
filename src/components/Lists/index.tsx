import React, { useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { ListRow, ActivityRow } from 'common'
import { dueToday } from 'common/selectors'

interface Props {
  lists: ListRow[]
  activities: ActivityRow[]
  openListId: number
}

const Loading = () => {
  const { Div, Spinner } = useUIContext()
  return (
    <Div style={{ margin: '30vh auto', width: 'fit-content' }}>
      <Spinner />
    </Div>
  )
}

const Lists = ({ lists, activities, openListId }: Props) => {
  const queryClient = useQueryClient()
  const { Div } = useUIContext()
  const Requests = useContext(RequestsContext)
  const {
    gameId,
    characterId,
    isLoading: playContextLoading
  } = usePlayContext()

  const [isLogging, setIsLogging] = useState(false)
  const [openActivityId, setOpenActivityId] = useState<number>()
  const openActivity = activities?.find((a) => a.id === openActivityId)
  const isLoading = playContextLoading || isLogging
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
    <Div style={{ flexGrow: 1 }}>
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
