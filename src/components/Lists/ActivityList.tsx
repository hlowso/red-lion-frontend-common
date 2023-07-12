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
  const { Card, ListGroup, CardHeader, Div } = useUIContext()
  return (
    <Card
      style={{
        flexGrow: 1,
        margin: '0 0 0 15px',
        height: 'fit-content'
      }}
    >
      <CardHeader>{listName}</CardHeader>
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
