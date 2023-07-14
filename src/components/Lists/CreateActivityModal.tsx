import React, { useContext } from 'react'
import { useUIContext } from '../../contexts'
import { byKey } from 'common/util/tally'
import {
  ActivityCreationContext,
  ActivityCreationProvider
} from '../../contexts/ActivityCreationContext'
import useTallies from '../../hooks/useTallies'

interface Props {
  listId?: number
  show: boolean
  close: () => void
}

const CreateActivityModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const { data: tallies } = useTallies()
  const {
    name,
    onNameChange,
    tallyKey,
    onTallyChange,
    description,
    onDescriptionChange,
    direction,
    setDirection,
    significance,
    setSignificance,
    createActivity,
    isCreating
  } = useContext(ActivityCreationContext)

  const groupStyle = { margin: '0 0 10px' }
  const selectButtonStyle = { margin: '0 5px 0 0', opacity: 0.85 }

  const onCreate = () => {
    close()
    createActivity()
  }

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>New Activity</ui.ModalHeader>
      <ui.ModalBody>
        {isCreating ? (
          <ui.Spinner />
        ) : (
          <ui.Div>
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
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button
          variant='success'
          disabled={!name || isCreating}
          onClick={onCreate}
        >
          Create
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default (props: Props) => (
  <ActivityCreationProvider key={props.listId} listId={props.listId}>
    <CreateActivityModal {...props} />
  </ActivityCreationProvider>
)
