import React from 'react'
import { Activity } from 'common'
import { usePlayContext, useUIContext } from '../../contexts'
import { Util } from 'common'
import cronstrue from 'cronstrue'

interface Props {
  open: () => void
  edit: () => void
  activity: Activity
}

interface Schedule {
  late?: boolean
  display: string
}

const getScheduleInfo = (schedule?: string): Schedule | undefined => {
  if (!schedule) return undefined

  try {
    return { display: `Resets: ${cronstrue.toString(schedule)}` }
  } catch (e) {}

  const date = new Date(schedule)
  if (!Util.Date.isValid(date)) return undefined

  return {
    late: Util.Date.isLate(date),
    display: `Due: ${date.toDateString()}`
  }
}

const ActivityListItem = ({ activity, open, edit }: Props) => {
  const ui = useUIContext()
  const complete = Util.Activity.complete(activity)
  const scheduleInfo = getScheduleInfo(activity.schedule)
  const { isFetching } = usePlayContext()

  return (
    <ui.ListGroupItem>
      <ui.Div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ui.Div
          onClick={complete ? undefined : open}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            cursor: complete ? undefined : 'pointer'
          }}
        >
          <ui.Span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textDecoration: complete ? 'line-through' : undefined
            }}
          >
            {activity.name}
          </ui.Span>
          {scheduleInfo && (
            <ui.Span
              style={{
                fontSize: 'small',
                color: scheduleInfo.late && !complete ? '#DC3545' : undefined
              }}
            >
              {scheduleInfo.display}
            </ui.Span>
          )}
        </ui.Div>
        <ui.Button
          variant='outline-secondary'
          onClick={edit}
          style={{ padding: '4px 8px', margin: '0 10px 0' }}
        >
          <ui.Icon name='PencilSquare' />
        </ui.Button>
        <ui.Span
          style={{
            cursor: 'default',
            width: '40px',
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          {isFetching ? (
            <ui.Spinner small />
          ) : (
            `${activity.status?.countToday || 0} / ${activity.count || 1}`
          )}
        </ui.Span>
      </ui.Div>
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
