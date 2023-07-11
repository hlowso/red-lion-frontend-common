import React, { useContext, useState, useEffect } from 'react'
import { ActivityRow } from 'common'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'

interface Props {
  open: () => void
  activity: ActivityRow
}

const ActivityListItem = ({ activity, open }: Props) => {
  const { Div, Spinner, ListGroupItem, Span } = useUIContext()
  const Requests = useContext(RequestsContext)
  const { characterId } = usePlayContext()
  const [countToday, setCountToday] = useState<number>()

  useEffect(() => {
    if (characterId)
      Requests.getCharacterActivityCountToday({
        characterId,
        activityId: activity.id
      }).then(setCountToday)
  }, [characterId])

  return (
    <ListGroupItem onClick={open} style={{ cursor: 'pointer' }}>
      <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {activity.name}
        </Span>
        {Number.isInteger(countToday) ? (
          `${countToday}/${activity.count || 1}`
        ) : (
          <Spinner small />
        )}
      </Div>
    </ListGroupItem>
  )
}

export default ActivityListItem
