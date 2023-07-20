import React, { useContext } from 'react'
import { Activity } from 'common'
import { complete, incomplete } from 'common/selectors'
import ActivityListItem from './ActivityListItem'
import { FrontendContext, useUIContext } from '../../contexts'

interface Props {
  openActivityModal: (activityId: number) => void
  openEditActivityModal: (activityId?: number) => void
  showAddButton: boolean
  listName: string
  listDescription?: string
  activities: Activity[]
}

const ActivityList = ({
  showAddButton,
  listName,
  listDescription,
  activities,
  openActivityModal,
  openEditActivityModal
}: Props) => {
  const { orientation } = useContext(FrontendContext)
  const ui = useUIContext()
  const toDo = incomplete(activities)
  const done = complete(activities)

  const titleTooltip = (props: any) => (
    <ui.Tooltip id={`header-tooltip-${listName}`} {...props}>
      <ui.Card bg='dark'>
        <ui.CardBody style={{ color: 'white', padding: '3px' }}>
          {listDescription}
        </ui.CardBody>
      </ui.Card>
    </ui.Tooltip>
  )

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
        <ui.OverlayTrigger
          placement='left'
          disabled={!listDescription}
          overlay={titleTooltip}
        >
          <ui.Strong style={{ cursor: 'default' }}>{listName}</ui.Strong>
        </ui.OverlayTrigger>
        <ui.Div>
          {showAddButton && (
            <ui.Button
              variant='outline-secondary'
              onClick={() => openEditActivityModal()}
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
                edit={() => openEditActivityModal(activity.id)}
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
                edit={() => openEditActivityModal(activity.id)}
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
