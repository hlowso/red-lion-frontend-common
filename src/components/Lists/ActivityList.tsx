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
  const ui = useUIContext()
  return (
    <ui.Card
      style={{
        flexGrow: 1,
        margin: '0 0 0 15px',
        height: 'fit-content'
      }}
    >
      <ui.CardHeader>
        <ui.Strong>{listName}</ui.Strong>
      </ui.CardHeader>
      <ui.Div>
        <ui.ListGroup>
          {activities.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              open={() => openActivityModal(activity.id)}
            />
          ))}
        </ui.ListGroup>
      </ui.Div>
    </ui.Card>
  )
}

export default ActivityList
