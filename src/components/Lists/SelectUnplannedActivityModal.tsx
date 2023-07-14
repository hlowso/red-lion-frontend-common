import React, { useContext } from 'react'
import { useUIContext } from '../../contexts'
import { ActivityRow } from 'common'
import ActivityFieldInputs from './ActivityFieldInputs'
import {
  ActivityCompletionProvider,
  ActivityCompletionContext
} from '../../contexts/ActivityCompletionContext'

interface Props {
  show: boolean
  close: () => void
  activities: ActivityRow[]
  createNewActivity: () => void
}

const SelectUnplannedActivityModal = ({
  show,
  close,
  activities,
  createNewActivity
}: Props) => {
  const ui = useUIContext()
  const {
    setActivityId: setSelectedActivityId,
    activity: selectedActivity,
    isLogging,
    logCompletion
  } = useContext(ActivityCompletionContext)

  const onLog = () => {
    close()
    logCompletion()
  }

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>Previous Activities</ui.ModalHeader>
      <ui.ModalBody>
        {isLogging ? (
          <ui.Spinner />
        ) : (
          <ui.Div>
            <ui.Div style={{ margin: '0 0 10px' }}>
              {activities.map((a) => (
                <ui.Button
                  key={a.id}
                  size='sm'
                  style={{ margin: '0 5px 5px 0' }}
                  onClick={() => setSelectedActivityId(a.id)}
                  variant={
                    a.id === selectedActivity?.id
                      ? 'secondary'
                      : 'outline-secondary'
                  }
                >
                  {a.name}
                </ui.Button>
              ))}
            </ui.Div>
            {selectedActivity?.fields && (
              <ActivityFieldInputs fields={selectedActivity.fields} />
            )}
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button
          variant='success'
          onClick={createNewActivity}
          disabled={isLogging}
        >
          New Activity
        </ui.Button>
        <ui.Button
          disabled={!selectedActivity?.id || isLogging}
          variant='primary'
          onClick={onLog}
        >
          Log
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default (props: Props) =>
  props.show ? (
    <ActivityCompletionProvider>
      <SelectUnplannedActivityModal {...props} />
    </ActivityCompletionProvider>
  ) : null
