import React from 'react'
import { Activity } from 'common'
import { useUIContext } from '../../contexts'

interface Props {
  open: () => void
  activity: Activity
}

const ActivityListItem = ({ activity, open }: Props) => {
  const ui = useUIContext()
  const complete = (activity.countToday || 0) >= (activity.count || 1)

  return (
    <ui.ListGroupItem
      onClick={complete ? undefined : open}
      style={{ cursor: complete ? undefined : 'pointer' }}
    >
      <ui.Div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        {activity.countToday} / {activity.count || 1}
      </ui.Div>
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
