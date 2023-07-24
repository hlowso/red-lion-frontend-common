import React, { useContext, useEffect } from 'react'
import { ActivityRow } from 'common'
import { usePlayContext, useUIContext } from '../../contexts'
import {
  ActivityCompletionContext,
  ActivityCompletionProvider
} from '../../contexts/ActivityCompletionContext'
import ActivityFieldInputs from './ActivityFieldInputs'
import { Util } from 'common'
import {
  ActivityEditingContext,
  ActivityEditingProvider
} from '../../contexts/ActivityEditingContext'
import useLists from '../../hooks/useLists'
import Delta from '../Delta'

interface Props {
  show: boolean
  activity?: ActivityRow
  close: () => void
}

const ActivityModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const { isFetching: contextFetching } = usePlayContext()
  const { data: lists } = useLists()
  const { activity, logCompletion, canLog, isLogging } = useContext(
    ActivityCompletionContext
  )
  const { updateActivity, isRequesting, setSchedule, setListId, listId } =
    useContext(ActivityEditingContext)
  const spin = !activity || isLogging || contextFetching || isRequesting
  const canToggleDueToday =
    !!activity &&
    (!activity.schedule ||
      Util.Date.isValid(new Date(activity?.schedule || '')))
  const moveLists = lists
    ?.filter((l) => l.id !== activity?.listId)
    .map((l) => ({ id: String(l.id), label: l.name }))

  useEffect(() => {}, [!!lists?.length])

  const onLog = async () => {
    await logCompletion()
    close()
  }

  const onToggleDueToday = (dueToday: boolean) => {
    const midnight = new Date()
    midnight.setHours(0, 0, 0, 0)
    updateActivity({
      schedule: dueToday ? midnight.toISOString() : ''
    })
  }

  const onMove = async (listId: string) => {
    await updateActivity({ listId: Number(listId) })
    close()
  }

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>{activity?.name}</ui.ModalHeader>
      <ui.ModalBody>
        {spin ? (
          <ui.Div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <ui.Spinner />
          </ui.Div>
        ) : (
          <ui.Div>
            <ui.Marked>{activity?.description || ''}</ui.Marked>
            {activity?.fields && (
              <ActivityFieldInputs fields={activity.fields} />
            )}
            <Delta
              delta={activity?.completionDelta || {}}
              style={{ margin: '10px 0 0' }}
            />
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {canToggleDueToday ? (
          <ui.FormCheck
            label='Due Today'
            checked={Util.Activity.dueToday(activity)}
            onChange={() => onToggleDueToday(!Util.Activity.dueToday(activity))}
            disabled={spin}
          />
        ) : null}
        <ui.Div style={{ display: 'flex' }}>
          <ui.Dropdown
            style={{ margin: '0 10px 0 0' }}
            label='Move'
            items={moveLists || []}
            action={onMove}
          />
          <ui.Button disabled={!canLog} onClick={onLog} variant='primary'>
            Log
          </ui.Button>
        </ui.Div>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default (props: Props) =>
  props.show ? (
    <ActivityCompletionProvider activity={props.activity}>
      <ActivityEditingProvider
        key={props.activity?.id}
        listId={props.activity?.listId}
        activityId={props.activity?.id}
      >
        <ActivityModal {...props} />
      </ActivityEditingProvider>
    </ActivityCompletionProvider>
  ) : null
