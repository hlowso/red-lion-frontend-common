import React, { useContext, useEffect } from 'react'
import { useUIContext } from '../../contexts'
import { CharacterGoal } from 'common'
import { EditingContext } from '../../contexts/EditingContext'

interface Props {
  goal: CharacterGoal
  close: () => void
}

const GoalModal = ({ goal, close }: Props) => {
  const ui = useUIContext()
  const { edit, resource, isSubmitting } = useContext(EditingContext)

  useEffect(() => {
    if (resource === 'characterGoal' && isSubmitting) close()
  }, [resource, isSubmitting])

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
        {goal?.targetDate && (
          <ui.Span
            style={{
              margin: '0 0 10px',
              color: '#555',
              cursor: 'default',
              fontSize: 'small',
              display: 'block'
            }}
          >
            {goal?.targetDate.toLocaleString('default', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </ui.Span>
        )}
        <ui.Marked>{goal?.description || ''}</ui.Marked>
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button
          onClick={() =>
            edit(
              'Edit Goal',
              'characterGoal',
              [
                { name: 'name', kind: 'text', label: 'Name', value: goal.name },
                {
                  name: 'description',
                  kind: 'textarea',
                  label: 'Description',
                  value: goal.description
                },
                { name: 'icon', kind: 'text', label: 'Icon', value: goal.icon },
                {
                  name: 'targetDate',
                  kind: 'date',
                  label: 'Target Date',
                  value: goal.targetDate
                }
              ],
              {
                characterId: goal.characterId,
                goalId: goal.goalId
              },
              true
            )
          }
        >
          <ui.Icon name='Pencil' />
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default GoalModal
