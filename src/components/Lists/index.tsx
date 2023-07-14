import React, { useState } from 'react'
import { useUIContext } from '../../contexts'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { ListRow, ActivityRow } from 'common'
import { dueToday } from 'common/selectors'
import CreateActivityModal from './CreateActivityModal'

interface Props {
  lists: ListRow[]
  activities: ActivityRow[]
  openListId: number
}

const Lists = ({ lists, activities, openListId }: Props) => {
  const ui = useUIContext()
  const [openActivityId, setOpenActivityId] = useState<number>()
  const [createActivityModalOpen, setCreateActivityModalOpen] = useState(false)
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
        showAddButton={openListId}
        listName={openListName}
        activities={openListActivities || []}
        openActivityModal={setOpenActivityId}
        openCreateActivityModal={() => setCreateActivityModalOpen(true)}
      />
      <ActivityModal
        show={!!openActivity}
        activity={openActivity!}
        close={() => setOpenActivityId(undefined)}
      />
      <CreateActivityModal
        listId={openListId}
        show={!openListId && openListId > 0 && createActivityModalOpen}
        close={() => setCreateActivityModalOpen(false)}
      />
    </ui.Div>
  )
}

export default Lists
