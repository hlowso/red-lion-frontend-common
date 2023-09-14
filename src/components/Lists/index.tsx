import React, { useState } from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { ListRow, Activity, Util } from 'common'
import { dueToday, withIdIn } from 'common/selectors'
import EditActivityModal from './EditActivityModal'
import useCharacterLists from '../../hooks/characters/useCharacterLists'

interface Props {
  lists: ListRow[]
  activities: Activity[]
  openListId: number
  style?: React.CSSProperties
}

const Lists = ({ lists, activities, openListId, style }: Props) => {
  const { data: characterLists } = useCharacterLists()
  const { commitmentActivityIds } = usePlayContext()
  const ui = useUIContext()
  const [openActivityId, setOpenActivityId] = useState<number>()
  const [editActivityId, setEditActivityId] = useState<number>()
  const [editActivityModalOpen, setEditActivityModalOpen] = useState(false)
  const characterList = (characterLists || []).find(
    (cl) => cl.listId === openListId || cl.pseudoListId === openListId
  )
  const openActivity = activities?.find((a) => a.id === openActivityId)
  const openList = lists?.find((list) => list.id === openListId)
  const openListName =
    openList?.name || openListId === -1 ? 'Today' : 'Commitment'
  const openListActivities = (
    openListId === -1
      ? dueToday(activities || [])
      : openListId === -2
      ? withIdIn(activities || [], commitmentActivityIds!)
      : activities?.filter((a) => a.listId === openListId)
  ).sort(Util.Activity.sort(characterList?.order || ''))

  const openEditActivityModal = (id?: number) => {
    setEditActivityId(id)
    setEditActivityModalOpen(true)
  }
  const closeEditActivityModal = () => {
    setEditActivityId(undefined)
    setEditActivityModalOpen(false)
  }

  return (
    <ui.Div style={{ ...style, flexGrow: 1 }}>
      <ActivityList
        listId={openListId}
        showAddButton={!!openListId && openListId > 0}
        listName={openListName}
        listDescription={openList?.description}
        activities={openListActivities}
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
