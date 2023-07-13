import React, { useEffect, useState } from 'react'
import { useUIContext } from '../../contexts'
import { ActivityPostParams, Delta, TallyRow } from 'common'
import { byKey } from 'common/util/tally'

interface Props {
  tallies: TallyRow[]
  isCreating: boolean
  show: boolean
  close: () => void
  createActivity: (params: Omit<ActivityPostParams, 'listId'>) => void
}

const CreateActivityModal = ({
  tallies,
  isCreating,
  show,
  close,
  createActivity
}: Props) => {
  const ui = useUIContext()
  const [tallyKey, setTallyKey] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [direction, setDirection] = useState<1 | -1>(1)
  const [significance, setSignificance] = useState<1 | 2 | 3>(1)

  useEffect(() => setTallyKey(tallies[0]?.key), [tallies.length])

  const groupStyle = { margin: '0 0 10px' }
  const selectButtonStyle = { margin: '0 5px 0 0', opacity: 0.85 }

  const onTallyChange = (ev: React.ChangeEvent<{ value: string }>) => {
    setTallyKey(ev.target.value)
  }

  const onNameChange = (ev: React.ChangeEvent<{ value: string }>) => {
    // TODO validate name
    setName(ev.target.value)
  }

  const onDescriptionChange = (ev: React.ChangeEvent<{ value: string }>) => {
    // TODO validate description
    setDescription(ev.target.value)
  }

  const onCreate = () => {
    const expression = `${direction} * randomInt(${significance}, ${significance} ^ 3)`
    const completionDelta: Delta = {
      tallies: {
        [tallyKey]: {
          expression,
          variables: []
        }
      }
    }
    createActivity({
      name,
      description,
      schedule: null,
      fields: null,
      count: null,
      fieldValues: null,
      completionDelta
    })
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
                {tallies.map((tally) => (
                  <ui.FormSelectOption key={tally.id} value={tally.key}>
                    {tally.name}
                  </ui.FormSelectOption>
                ))}
              </ui.FormSelect>
              <ui.InputGroupText>
                <ui.Icon name={byKey(tallies, tallyKey)?.icon || ''} />
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

export default CreateActivityModal
