import React from 'react'
import { Activity } from 'common'
import { usePlayContext, useUIContext } from '../../contexts'
import { Util } from 'common'
import cronstrue from 'cronstrue'

interface Props {
  open: () => void
  edit: () => void
  activity: Activity
}

interface Schedule {
  late?: boolean
  display: string
}

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

const Streak = ({ id, streak }: { id: number; streak: number }) => {
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
      <ui.Div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 25px 0 0',
          cursor: 'default',
          width: '30px',
          height: '30px'
        }}
      >
        <ui.Icon name='Trophy' size={30} style={{ position: 'absolute' }} />
        <ui.Span style={{ fontSize: 'x-small', transform: 'translateY(-35%)' }}>
          {streak}
        </ui.Span>
      </ui.Div>
    </ui.OverlayTrigger>
  )
}

const ActivityListItem = ({ activity, open, edit }: Props) => {
  const ui = useUIContext()
  const complete = Util.Activity.complete(activity)
  const scheduleInfo = getScheduleInfo(activity.schedule)
  const { isFetching } = usePlayContext()

  return (
    <ui.ListGroupItem>
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
          <Streak id={activity.id} streak={activity.status.streak} />
        )}
        <ui.Button
          variant='outline-secondary'
          onClick={edit}
          style={{ padding: '4px 8px', margin: '0 10px 0' }}
        >
          <ui.Icon name='PencilSquare' />
        </ui.Button>
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
    </ui.ListGroupItem>
  )
}

export default ActivityListItem
