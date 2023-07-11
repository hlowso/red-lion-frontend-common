import React from 'react'
import { ActivityRow } from 'common'
import { useUIContext } from '../../contexts'

interface Props {
  show: boolean
  activity?: ActivityRow
  close: () => void
  log: () => void
}

const ActivityModal = ({ show, activity, log, close }: Props) => {
  const { Modal, ModalHeader, Div, Button, P } = useUIContext()
  return (
    <Modal show={show} onHide={close}>
      <ModalHeader>{activity?.name}</ModalHeader>
      <Div>
        <P>{activity?.description}</P>
      </Div>
      <Div>
        <Button onClick={close} variant='secondary'>
          Close
        </Button>
        <Button onClick={log} variant='primary'>
          Log
        </Button>
      </Div>
    </Modal>
  )
}

export default ActivityModal
