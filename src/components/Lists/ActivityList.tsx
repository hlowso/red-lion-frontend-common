import React, { useContext } from 'react'
import { ActivityRow } from 'common'
import ActivityListItem from './ActivityListItem'
import { FrontendContext, useUIContext } from '../../contexts'

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
  const { orientation } = useContext(FrontendContext)
  const ui = useUIContext()
  return (
    <ui.Card
      style={{
        flexGrow: 1,
        margin: orientation === 'landscape' ? '0 0 0 15px' : 0,
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
