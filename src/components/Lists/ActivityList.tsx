import React, { useContext } from 'react'
import { ActivityRow } from 'common'
import { todayComplete, todayIncomplete } from 'common/selectors'
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
  const incomplete = todayIncomplete(activities)
  const complete = todayComplete(activities)

  return (
    <ui.Card
      style={{
        flexGrow: 1,
        margin: orientation === 'landscape' ? '0 0 0 15px' : 0,
        height: 'fit-content',
        backgroundColor: '#eee'
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
      <ui.Div>
        <ui.ListGroup>
          {incomplete.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              open={() => openActivityModal(activity.id)}
            />
          ))}
        </ui.ListGroup>
        <ui.ListGroup
          style={{
            margin: !!incomplete.length && !!complete.length ? '10px 0 0' : 0
          }}
        >
          {complete.map((activity) => (
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
