import React from 'react'
import { ActivityRow } from 'common'
import { useUIContext } from '../../contexts'
import useCharacterActivityCounts from '../../hooks/characters/useCharacterActivityCounts'

interface Props {
  open: () => void
  activity: ActivityRow
}

const ActivityListItem = ({ activity, open }: Props) => {
  const ui = useUIContext()
  const { data: countToday } = useCharacterActivityCounts({
    activityId: activity.id
  })

  return (
    <ui.ListGroupItem onClick={open} style={{ cursor: 'pointer' }}>
      <ui.Div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ui.Span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {activity.name}
        </ui.Span>
        {Number.isInteger(countToday) ? (
          `${countToday}/${activity.count || 1}`
        ) : (
          <ui.Spinner small />
        )}
      </ui.Div>
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
