import React, { useContext, useState } from 'react'
import { ActivityRow } from 'common'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import {
  ActivityCompletionContext,
  ActivityCompletionProvider
} from '../../contexts/ActivityCompletionContext'
import ActivityFieldInputs from './ActivityFieldInputs'
import { Util } from 'common'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  show: boolean
  activity?: ActivityRow
  close: () => void
}

const ActivityModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const queryClient = useQueryClient()
  const { gameId } = usePlayContext()
  const Requests = useContext(RequestsContext)
  const { activity, logCompletion, canLog } = useContext(
    ActivityCompletionContext
  )
  const [isLoading, setIsLoading] = useState(false)

  const onLog = () => {
    close()
    logCompletion()
  }

  const onToggleDueToday = async (dueToday: boolean) => {
    setIsLoading(true)
    await Requests.updateActivity({
      id: activity?.id!,
      schedule: dueToday ? Util.Date.dateString(new Date()) : ''
    })
    setIsLoading(false)
    queryClient.invalidateQueries(['games', gameId])
  }

  const canToggleDueToday =
    !!activity &&
    (!activity.schedule ||
      Util.Date.isValid(new Date(activity?.schedule || '')))

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>{activity?.name}</ui.ModalHeader>
      <ui.ModalBody>
        <ui.P>{activity?.description}</ui.P>
        {activity?.fields && <ActivityFieldInputs fields={activity.fields} />}
      </ui.ModalBody>
      <ui.ModalFooter
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {!activity || isLoading ? (
          <ui.Spinner />
        ) : canToggleDueToday ? (
          <ui.FormCheck
            label='Due Today'
            checked={Util.Activity.dueToday(activity)}
            onChange={() => onToggleDueToday(!Util.Activity.dueToday(activity))}
          />
        ) : null}
        <ui.Button disabled={!canLog} onClick={onLog} variant='primary'>
          Log
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default (props: Props) =>
  props.show ? (
    <ActivityCompletionProvider activity={props.activity}>
      <ActivityModal {...props} />
    </ActivityCompletionProvider>
  ) : null
