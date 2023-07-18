import React from 'react'
import { Activity } from 'common'
import { useUIContext } from '../../contexts'
import { isValid } from 'common/util/date'
import cronstrue from 'cronstrue'

interface Props {
  open: () => void
  activity: Activity
}

interface Schedule {
  late?: boolean
  display: string
}

const getScheduleInfo = (schedule?: string): Schedule | undefined => {
  if (!schedule) return undefined

  const date = new Date(schedule)
  if (isValid(date)) {
    return {
      late: date.getTime() < new Date().getTime(),
      display: `Due: ${date.toDateString()}`
    }
  }

  try {
    return { display: `Resets: ${cronstrue.toString(schedule)}` }
  } catch (e) {
    return undefined
  }
}

const ActivityListItem = ({ activity, open }: Props) => {
  const ui = useUIContext()
  const complete = (activity.countToday || 0) >= (activity.count || 1)
  const scheduleInfo = getScheduleInfo(activity.schedule)

  return (
    <ui.ListGroupItem
      onClick={complete ? undefined : open}
      style={{ cursor: complete ? undefined : 'pointer' }}
    >
      <ui.Div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ui.Div style={{ display: 'flex', flexDirection: 'column' }}>
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
                color: scheduleInfo.late ? '#DC3545' : undefined
              }}
            >
              {scheduleInfo.display}
            </ui.Span>
          )}
        </ui.Div>
        <ui.Span>
          {activity.countToday} / {activity.count || 1}
        </ui.Span>
      </ui.Div>
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
