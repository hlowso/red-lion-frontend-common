import React from 'react'
import { useUIContext } from '../../contexts'
import { CharacterGoal } from 'common'

interface Props {
  goal?: CharacterGoal
  close: () => void
}

const GoalModal = ({ goal, close }: Props) => {
  const ui = useUIContext()

  return (
    <ui.Modal show={!!goal} onHide={close}>
      <ui.ModalHeader>
        <ui.Div style={{ display: 'flex' }}>
          <ui.Div
            style={{
              paddingLeft: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ui.Strong
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            >
              {goal?.name}
            </ui.Strong>
          </ui.Div>
        </ui.Div>
      </ui.ModalHeader>
      <ui.ModalBody>
        <ui.Marked>{goal?.description || ''}</ui.Marked>
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button onClick={close} variant='secondary'>
          Close
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default GoalModal
