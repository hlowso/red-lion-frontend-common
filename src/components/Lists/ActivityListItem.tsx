import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Util, Activity } from 'common'
import Streak from '../Streak'
import { usePlayContext, useUIContext } from '../../contexts'
import cronstrue from 'cronstrue'

interface Props {
  open: () => void
  edit: () => void
  hide?: () => void
  reorder: (aboveId: number, belowId: number) => void
  activity: Activity
  pseudoListId?: number
}

interface Schedule {
  late?: boolean
  display: string
}

const accept = 'ActivityListItem'

const getScheduleInfo = (schedule?: string): Schedule | undefined => {
  if (!schedule) return undefined

  try {
    return { display: `Resets: ${cronstrue.toString(schedule)}` }
  } catch (e) {}

  const date = new Date(schedule)
  if (!Util.Date.isValid(date)) return undefined

  return {
    late: Util.Date.isLate(date),
    display: `Due: ${date.toDateString()}`
  }
}

const ActivityStreak = ({ id, streak }: { id: number; streak: number }) => {
  const ui = useUIContext()
  const bonus =
    streak < 7 ? undefined : streak < 14 ? '25%' : streak < 30 ? '50%' : '75%'

  const tooltip = (props: any) => (
    <ui.Tooltip id={`streak-tooltip-${id}`} {...props}>
      <ui.Card bg='dark' style={{ color: 'white' }}>
        <ui.CardBody style={{ padding: '5px' }}>
          {bonus && `${bonus} delta bonus`}
        </ui.CardBody>
      </ui.Card>
    </ui.Tooltip>
  )

  return (
    <ui.OverlayTrigger overlay={tooltip} placement='left' disabled={!bonus}>
      <Streak streak={streak} />
    </ui.OverlayTrigger>
  )
}

const ActivityListItem = ({
  activity,
  open,
  edit,
  hide,
  reorder,
  pseudoListId
}: Props) => {
  const ref = useRef()
  const ui = useUIContext()
  const {
    isFetching,
    commitmentActivityIds,
    committed,
    toggleCommittingActivityId
  } = usePlayContext()
  const [isUpdating, setIsUpdating] = useState(false)
  const complete = Util.Activity.complete(activity)
  const scheduleInfo = getScheduleInfo(activity.schedule)
  const percentage =
    (activity.count || 1) > 1
      ? Math.floor(((activity.status.countToday || 0) * 100) / activity.count)
      : undefined
  const commitment = {
    show:
      pseudoListId !== -2 &&
      (!committed || commitmentActivityIds?.includes(activity.id)),
    icon: `${committed ? 'Lock' : 'Unlock'}${
      commitmentActivityIds?.includes(activity.id) ? 'Fill' : ''
    }`
  }

  const [{ isOver }, drop] = useDrop<Activity, {}, { isOver: boolean }>({
    accept,
    drop: async (item) => {
      setIsUpdating(true)
      await reorder(item.id, activity.id)
      setIsUpdating(false)
      return {}
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: accept,
    item: { id: activity.id },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))

  drag(drop(ref))

  return (
    <ui.ListGroupItem
      ref={ref}
      style={{
        background: percentage
          ? `linear-gradient(to right, #eee, #eee ${percentage}%, white ${percentage}%, white)`
          : undefined,
        borderTop: isOver ? 'solid 2px black' : undefined,
        opacity: isDragging ? 0.5 : undefined
      }}
    >
      {isUpdating ? (
        <ui.Spinner />
      ) : (
        <ui.Div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <ui.Div
            onClick={complete ? undefined : open}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              cursor: complete ? undefined : 'pointer'
            }}
          >
            <ui.Div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textDecoration: complete ? 'line-through' : undefined,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {activity.abstinenceDelta && (
                <ui.Badge
                  bg='secondary'
                  style={{
                    fontSize: 'x-small',
                    margin: '0 5px 0 0',
                    transform: 'translateY(10%)'
                  }}
                >
                  DON'T
                </ui.Badge>
              )}
              <ui.Span>{activity.name}</ui.Span>
            </ui.Div>
            {scheduleInfo && (
              <ui.Span
                style={{
                  fontSize: 'small',
                  color: scheduleInfo.late && !complete ? '#DC3545' : undefined
                }}
              >
                {scheduleInfo.display}
              </ui.Span>
            )}
          </ui.Div>
          {!!activity.status?.streak && (
            <ActivityStreak id={activity.id} streak={activity.status.streak} />
          )}
          {commitment.show && (
            <ui.Button
              onClick={() => toggleCommittingActivityId!(activity.id)}
              style={{
                margin: '0 10px 0 0',
                border: 'none',
                background: 'none',
                color: '#888'
              }}
              disabled={committed}
            >
              <ui.Icon name={commitment.icon} />
            </ui.Button>
          )}
          {!!hide && (
            <ui.Button
              onClick={hide}
              style={{
                margin: '0 10px 0 0',
                border: 'none',
                background: 'none',
                color: '#888'
              }}
            >
              <ui.Icon name='EyeSlash' />
            </ui.Button>
          )}
          {!pseudoListId && (
            <ui.Button
              variant='outline-secondary'
              onClick={edit}
              style={{
                padding: '4px 8px',
                margin: '0 10px 0 0',
                border: 'none',
                background: 'none',
                color: '#888'
              }}
            >
              <ui.Icon name='PencilSquare' />
            </ui.Button>
          )}
          <ui.Span
            style={{
              cursor: 'default',
              width: '40px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {isFetching ? (
              <ui.Spinner small />
            ) : activity!.abstinenceDelta ? (
              <ui.Icon name={complete ? 'X' : 'Check'} size={20} />
            ) : (
              `${activity.status?.countToday || 0} / ${activity.count || 1}`
            )}
          </ui.Span>
        </ui.Div>
      )}
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
