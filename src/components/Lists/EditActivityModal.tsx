import React, { useContext } from 'react'
import { useUIContext } from '../../contexts'
import { byKey } from 'common/util/tally'
import {
  ActivityEditingContext,
  ActivityEditingProvider
} from '../../contexts/ActivityEditingContext'
import useTallies from '../../hooks/useTallies'
import useGoals from '../../hooks/useGoals'

interface Props {
  activityId?: number
  listId?: number
  show: boolean
  close: () => void
}

const EditActivityModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const { data: tallies } = useTallies()
  const { data: goals } = useGoals()
  const {
    edition,
    name,
    onNameChange,
    tallyKey,
    onTallyChange,
    description,
    onDescriptionChange,
    hasCount,
    setHasCount,
    count,
    onCountChange,
    schedule,
    onScheduleChange,
    direction,
    setDirection,
    significance,
    setSignificance,
    createActivity,
    updateActivity,
    toggleGoal,
    goalIds,
    isRequesting
  } = useContext(ActivityEditingContext)

  const groupStyle = { margin: '0 0 10px' }
  const selectButtonStyle = { margin: '0 5px 0 0', opacity: 0.85 }

  const onCreate = async () => {
    await createActivity()
    close()
  }

  const onUpdate = async () => {
    await updateActivity()
    close()
  }

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>
        {edition ? 'Edit Activity' : 'New Activity'}
      </ui.ModalHeader>
      <ui.ModalBody>
        {isRequesting ? (
          <ui.Div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <ui.Spinner />
          </ui.Div>
        ) : (
          <ui.Div>
            <ui.InputGroup style={groupStyle}>
              <ui.InputGroupText>Name</ui.InputGroupText>
              <ui.FormControl value={name} onChange={onNameChange} />
            </ui.InputGroup>
            <ui.InputGroup style={groupStyle}>
              <ui.InputGroupText>Description</ui.InputGroupText>
              <ui.FormControl
                as='textarea'
                value={description}
                onChange={onDescriptionChange}
              />
            </ui.InputGroup>
            <ui.InputGroup style={groupStyle}>
              <ui.InputGroupText>Impacted</ui.InputGroupText>
              <ui.FormSelect onChange={onTallyChange}>
                {(tallies || []).map((tally) => (
                  <ui.FormSelectOption key={tally.id} value={tally.key}>
                    {tally.name}
                  </ui.FormSelectOption>
                ))}
              </ui.FormSelect>
              <ui.InputGroupText>
                <ui.Icon
                  name={byKey(tallies || [], tallyKey || '')?.icon || ''}
                />
              </ui.InputGroupText>
            </ui.InputGroup>
            <ui.InputGroup style={groupStyle}>
              <ui.InputGroupText>Count</ui.InputGroupText>
              <ui.InputGroupText>
                <ui.FormCheck
                  checked={hasCount}
                  onChange={() => setHasCount(!hasCount)}
                  label=''
                />
              </ui.InputGroupText>
              <ui.FormControl
                disabled={!hasCount}
                value={count}
                onChange={onCountChange}
              />
            </ui.InputGroup>
            <ui.InputGroup style={groupStyle}>
              <ui.InputGroupText>Schedule</ui.InputGroupText>
              <ui.FormControl value={schedule} onChange={onScheduleChange} />
            </ui.InputGroup>
            <ui.Div style={groupStyle}>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setDirection(1)}
                variant={direction === 1 ? 'success' : 'outline-success'}
              >
                Good
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setDirection(-1)}
                variant={direction === -1 ? 'danger' : 'outline-danger'}
              >
                Bad
              </ui.Button>
            </ui.Div>
            <ui.Div style={groupStyle}>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance(1)}
                variant={significance === 1 ? 'primary' : 'outline-primary'}
              >
                Trivial
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance(2)}
                variant={significance === 2 ? 'primary' : 'outline-primary'}
              >
                Minor
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance(3)}
                variant={significance === 3 ? 'primary' : 'outline-primary'}
              >
                Major
              </ui.Button>
            </ui.Div>
            <ui.Div style={groupStyle}>
              {goals?.map((g) => (
                <ui.Button
                  key={g.id}
                  size='sm'
                  style={{ margin: '0 5px 5px 0' }}
                  onClick={() => toggleGoal(g.id)}
                  variant={
                    goalIds.includes(g.id) ? 'secondary' : 'outline-secondary'
                  }
                >
                  {g.name}
                </ui.Button>
              ))}
            </ui.Div>
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button
          variant='success'
          disabled={!name || isRequesting}
          onClick={edition ? onUpdate : onCreate}
        >
          {edition ? 'Save' : 'Create'}
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default ({ listId, activityId, ...props }: Props) => (
  <ActivityEditingProvider
    key={`${listId}:${activityId}`}
    listId={listId}
    activityId={activityId}
  >
    <EditActivityModal {...props} />
  </ActivityEditingProvider>
)
