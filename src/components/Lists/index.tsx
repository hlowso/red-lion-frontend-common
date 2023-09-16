import React, { useContext, useState } from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import ActivityModal from './ActivityModal'
import ActivityList from './ActivityList'
import { ListRow, Activity, Util, ActivityRow } from 'common'
import { dueToday, withIdIn } from 'common/selectors'
import useCharacterLists from '../../hooks/characters/useCharacterLists'
import { EditingContext } from '../../contexts/EditingContext'
import { isCron } from 'common/util/date'

interface Props {
  lists: ListRow[]
  activities: Activity[]
  openListId: number
  style?: React.CSSProperties
}

const Lists = ({ lists, activities, openListId, style }: Props) => {
  const { data: characterLists } = useCharacterLists()
  const { commitmentActivityIds } = usePlayContext()
  const { edit, isEditing } = useContext(EditingContext)
  const ui = useUIContext()
  const [openActivityId, setOpenActivityId] = useState<number>()
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
    const activity = activities.find((a) => a.id === id)
    edit({
      formName: id ? 'Edit Activity' : 'New Activity',
      resource: 'activity',
      fields: [
        {
          name: 'name',
          kind: 'text',
          label: 'Name',
          value: activity?.name
        },
        {
          name: 'description',
          kind: 'textarea',
          label: 'Description',
          value: activity?.description
        },
        {
          name: 'count',
          kind: 'text',
          label: 'Count',
          value: activity?.count ? String(activity?.count) : undefined
        },
        {
          name: 'schedule-date',
          kind: 'date',
          label: 'Schedule',
          value: isCron(activity?.schedule!)
            ? undefined
            : (activity?.schedule as unknown as Date)
        },
        {
          name: 'schedule-cron',
          kind: 'text',
          label: 'Repeats',
          value: isCron(activity?.schedule!) ? activity!.schedule : undefined
        }
      ],
      base: {
        id,
        listId: openListId,
        completionDelta: {}
      } as Partial<ActivityRow>,
      isUpdate: !!id,
      fieldsToPayload: (fields) => {
        const payload = fields
          .filter((f) => !f.name.startsWith('schedule'))
          .reduce(
            (payload, field) => ({ ...payload, [field.name]: field.value }),
            {} as any
          )
        const date = fields.find((f) => f.name === 'schedule-date')
        const cron = fields.find((f) => f.name === 'schedule-cron')

        payload['schedule'] = cron?.value || date?.value
        return payload
      }
    })
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
    </ui.Div>
  )
}

export default Lists
