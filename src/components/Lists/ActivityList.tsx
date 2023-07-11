import React from 'react'
import { ActivityRow } from 'common'
import ActivityListItem from './ActivityListItem'
import { useUIContext } from '../../contexts'

interface Props {
  openActivityModal: (activityId: number) => void
  listName: string
  activities: ActivityRow[]
}

const ActivityList = ({ listName, activities, openActivityModal }: Props) => {
  const { Card, ListGroup, Span, Div } = useUIContext()
  return (
    <Card style={{ width: '95vw', maxWidth: '600px', margin: '30px 10px' }}>
      <Span>{listName}</Span>
      <Div>
        <ListGroup>
          {activities.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              open={() => openActivityModal(activity.id)}
            />
          ))}
        </ListGroup>
      </Div>
    </Card>
  )
}

export default ActivityList
