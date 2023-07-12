import React, { useState } from 'react'
import { useUIContext } from '../../contexts'
import { ActivityRow } from 'common'

interface Props {
  isLogging: boolean
  show: boolean
  close: () => void
  activities: ActivityRow[]
  logCompletion: (activityId: number) => void
  createNewActivity: () => void
}

const SelectUnplannedActivityModal = ({
  isLogging,
  show,
  close,
  activities,
  createNewActivity,
  logCompletion
}: Props) => {
  const { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } =
    useUIContext()
  const [selectedActivityId, setSelectedActivityId] = useState<number>()

  return (
    <Modal show={show} onHide={close}>
      <ModalHeader>Previous Activities</ModalHeader>
      <ModalBody>
        {isLogging ? (
          <Spinner />
        ) : (
          activities.map((a) => (
            <Button
              key={a.id}
              size='sm'
              style={{ margin: '0 5px 5px 0' }}
              onClick={() => setSelectedActivityId(a.id)}
              variant={
                a.id === selectedActivityId ? 'secondary' : 'outline-secondary'
              }
            >
              {a.name}
            </Button>
          ))
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          variant='success'
          onClick={createNewActivity}
          disabled={isLogging}
        >
          New Activity
        </Button>
        <Button
          disabled={!selectedActivityId || isLogging}
          variant='primary'
          onClick={() => logCompletion(selectedActivityId!)}
        >
          Log
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SelectUnplannedActivityModal
