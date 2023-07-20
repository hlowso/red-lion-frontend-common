import React, { useState } from 'react'
import { useUIContext } from '../../contexts'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { ListRow, Activity } from 'common'
import { dueToday } from 'common/selectors'
import EditActivityModal from './EditActivityModal'

interface Props {
  lists: ListRow[]
  activities: Activity[]
  openListId: number
}

const Lists = ({ lists, activities, openListId }: Props) => {
  const ui = useUIContext()
  const [openActivityId, setOpenActivityId] = useState<number>()
  const [editActivityId, setEditActivityId] = useState<number>()
  const [editActivityModalOpen, setEditActivityModalOpen] = useState(false)
  const openActivity = activities?.find((a) => a.id === openActivityId)
  const openList = lists?.find((list) => list.id === openListId)
  const openListActivities =
    openListId === -1
      ? dueToday(activities || [])
      : activities?.filter((a) => a.listId === openListId)

  const openEditActivityModal = (id?: number) => {
    setEditActivityId(id)
    setEditActivityModalOpen(true)
  }
  const closeEditActivityModal = () => {
    setEditActivityId(undefined)
    setEditActivityModalOpen(false)
  }

  return (
    <ui.Div style={{ flexGrow: 1 }}>
      <ActivityList
        showAddButton={!!openListId && openListId > 0}
        listName={openList?.name || 'Today'}
        listDescription={openList?.description}
        activities={openListActivities || []}
        openActivityModal={setOpenActivityId}
        openEditActivityModal={openEditActivityModal}
      />
      <ActivityModal
        show={!!openActivity}
        activity={openActivity!}
        close={() => setOpenActivityId(undefined)}
      />
      <EditActivityModal
        listId={openListId}
        activityId={editActivityId}
        show={
          editActivityModalOpen &&
          (!!editActivityId || (!!openListId && openListId > 0))
        }
        close={closeEditActivityModal}
      />
    </ui.Div>
  )
}

export default Lists
