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
  const ui = useUIContext()
  const [openActivityId, setOpenActivityId] = useState<number>()
  const openActivity = activities?.find((a) => a.id === openActivityId)
  const openListName =
    lists?.find((list) => list.id === openListId)?.name || 'Today'
  const openListActivities =
    openListId === -1
      ? dueToday(activities || [])
      : activities?.filter((a) => a.listId === openListId)

  return (
    <ui.Div style={{ flexGrow: 1 }}>
      <ActivityList
        listName={openListName}
        activities={openListActivities || []}
        openActivityModal={setOpenActivityId}
      />
      <ActivityModal
        show={!!openActivity}
        activity={openActivity!}
        close={() => setOpenActivityId(undefined)}
      />
    </ui.Div>
  )
}

export default Lists
