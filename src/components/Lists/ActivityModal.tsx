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
  const { Modal, ModalHeader, ModalFooter, ModalBody, Button, P } =
    useUIContext()
  return (
    <Modal show={show} onHide={close}>
      <ModalHeader>{activity?.name}</ModalHeader>
      <ModalBody>
        <P>{activity?.description}</P>
      </ModalBody>
      <ModalFooter>
        <Button onClick={close} variant='secondary'>
          Close
        </Button>
        <Button onClick={log} variant='primary'>
          Log
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ActivityModal
