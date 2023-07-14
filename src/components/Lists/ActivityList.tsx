import React from 'react'
import { ActivityRow } from 'common'
import ActivityListItem from './ActivityListItem'
import { useUIContext } from '../../contexts'

interface Props {
  openActivityModal: (activityId: number) => void
  openCreateActivityModal: () => void
  showAddButton: boolean
  listName: string
  activities: ActivityRow[]
}

const ActivityList = ({
  showAddButton,
  listName,
  activities,
  openActivityModal,
  openCreateActivityModal
}: Props) => {
  const ui = useUIContext()
  return (
    <ui.Card
      style={{
        flexGrow: 1,
        margin: '0 0 0 15px',
        height: 'fit-content'
      }}
    >
      <ui.CardHeader
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <ui.Strong>{listName}</ui.Strong>
        <ui.Div>
          {showAddButton && (
            <ui.Button
              variant='outline-secondary'
              onClick={openCreateActivityModal}
              size='sm'
            >
              <ui.Icon name='PlusLg' />
            </ui.Button>
          )}
        </ui.Div>
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
