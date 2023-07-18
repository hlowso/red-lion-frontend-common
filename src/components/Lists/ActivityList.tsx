import React, { useContext } from 'react'
import { Activity } from 'common'
import { complete, incomplete } from 'common/selectors'
import ActivityListItem from './ActivityListItem'
import { FrontendContext, useUIContext } from '../../contexts'

interface Props {
  openActivityModal: (activityId: number) => void
  openCreateActivityModal: () => void
  showAddButton: boolean
  listName: string
  activities: Activity[]
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
  const toDo = incomplete(activities)
  const done = complete(activities)

  return (
    <ui.Card
      style={{
        flexGrow: 1,
        margin: orientation === 'landscape' ? '0 0 0 15px' : 0,
        backgroundColor: 'rgba(0,0,0,0)',
        border: 'none'
      }}
    >
      <ui.CardHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#eee'
        }}
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
      <ui.Div
        style={{
          overflow: 'scroll',
          height: '90vh'
        }}
      >
        <ui.Div style={{ backgroundColor: '#eee' }}>
          <ui.ListGroup>
            {toDo.map((activity) => (
              <ActivityListItem
                key={activity.id}
                activity={activity}
                open={() => openActivityModal(activity.id)}
              />
            ))}
          </ui.ListGroup>
          <ui.ListGroup
            style={{
              margin: !!toDo.length && !!done.length ? '10px 0 0' : 0
            }}
          >
            {done.map((activity) => (
              <ActivityListItem
                key={activity.id}
                activity={activity}
                open={() => openActivityModal(activity.id)}
              />
            ))}
          </ui.ListGroup>
        </ui.Div>
        <ui.Div style={{ height: '400px', backgroundColor: 'rgba(0,0,0,0)' }} />
      </ui.Div>
    </ui.Card>
  )
}

export default ActivityList
