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
  const [direction, setDirection] = useState<'good' | 'bad'>('good')
  const [significance, setSignificance] = useState<
    'trivial' | 'minor' | 'major'
  >('trivial')

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
    const completionDelta: Delta = { tallies: {} }
    createActivity({
      name,
      description,
      schedule: null,
      fields: null,
      count: null,
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
                onClick={() => setDirection('good')}
                variant={direction === 'good' ? 'success' : 'outline-success'}
              >
                Good
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setDirection('bad')}
                variant={direction === 'bad' ? 'danger' : 'outline-danger'}
              >
                Bad
              </ui.Button>
            </ui.Div>
            <ui.Div style={groupStyle}>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance('trivial')}
                variant={
                  significance === 'trivial' ? 'primary' : 'outline-primary'
                }
              >
                Trivial
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance('minor')}
                variant={
                  significance === 'minor' ? 'primary' : 'outline-primary'
                }
              >
                Minor
              </ui.Button>
              <ui.Button
                style={selectButtonStyle}
                onClick={() => setSignificance('major')}
                variant={
                  significance === 'major' ? 'primary' : 'outline-primary'
                }
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
