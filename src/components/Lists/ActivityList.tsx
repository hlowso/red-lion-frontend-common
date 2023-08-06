import React, { useContext } from 'react'
import { Activity } from 'common'
import { complete, incomplete } from 'common/selectors'
import ActivityListItem from './ActivityListItem'
import {
  FrontendContext,
  RequestsContext,
  usePlayContext,
  useUIContext
} from '../../contexts'
import useLocal from '../../hooks/useLocal'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  listId: number
  openActivityModal: (activityId: number) => void
  openEditActivityModal: (activityId?: number) => void
  showAddButton: boolean
  listName: string
  listDescription?: string
  activities: Activity[]
}

const ActivityList = ({
  listId,
  showAddButton,
  listName,
  listDescription,
  activities,
  openActivityModal,
  openEditActivityModal
}: Props) => {
  const { orientation } = useContext(FrontendContext)
  const { characterId } = usePlayContext()
  const { reorderCharacterActivities } = useContext(RequestsContext)
  const queryClient = useQueryClient()
  const { value: hiddenIds, set: setHiddenIds } = useLocal('hidden-activities')
  const ui = useUIContext()

  const hidden = activities.filter((a) => hiddenIds.includes(a.id))
  const showing = activities.filter((a) => !hiddenIds.includes(a.id))
  const toDo = incomplete(showing)
  const done = complete(showing)

  const reorder = async (aboveId: number, belowId: number) => {
    const ids: number[] = []
    for (let activity of activities) {
      if (activity.id === belowId) ids.push(aboveId, belowId)
      else if (activity.id !== aboveId) ids.push(activity.id)
    }
    await reorderCharacterActivities(characterId!, listId, ids)
    queryClient.invalidateQueries()
  }

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
          {!!hidden.length && (
            <ui.Button
              onClick={() =>
                setHiddenIds(
                  hiddenIds.filter(
                    (id) => !activities.map((a) => a.id).includes(id)
                  )
                )
              }
              style={{
                margin: '0 10px 0 0',
                padding: 0,
                border: 'none',
                background: 'none',
                color: '#222'
              }}
            >
              <ui.Icon name='EyeFill' />
            </ui.Button>
          )}
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
                hide={() => setHiddenIds([...hiddenIds, activity.id])}
                reorder={reorder}
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
                reorder={reorder}
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
