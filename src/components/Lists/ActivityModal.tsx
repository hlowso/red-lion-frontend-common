import React, { useContext } from 'react'
import { ActivityRow } from 'common'
import { useUIContext } from '../../contexts'
import {
  ActivityCompletionContext,
  ActivityCompletionProvider
} from '../../contexts/ActivityCompletionContext'
import ActivityFieldInputs from './ActivityFieldInputs'

interface Props {
  show: boolean
  activity?: ActivityRow
  close: () => void
}

const ActivityModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const { activity, logCompletion, canLog } = useContext(
    ActivityCompletionContext
  )
  const onLog = () => {
    close()
    logCompletion()
  }
  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>{activity?.name}</ui.ModalHeader>
      <ui.ModalBody>
        <ui.P>{activity?.description}</ui.P>
        {activity?.fields && <ActivityFieldInputs fields={activity.fields} />}
      </ui.ModalBody>
      <ui.ModalFooter>
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
