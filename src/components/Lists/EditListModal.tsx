import React, { useContext } from 'react'
import { useUIContext } from '../../contexts'
import {
  ListEditingContext,
  ListEditingProvider
} from '../../contexts/ListEditingContext'

interface Props {
  show: boolean
  close: () => void
}

const EditListModal = ({ show, close }: Props) => {
  const ui = useUIContext()
  const {
    name,
    description,
    onNameChange,
    onDescriptionChange,
    create,
    isRequesting,
    canCreate
  } = useContext(ListEditingContext)

  const groupStyle = { margin: '0 0 10px' }

  const onCreate = async () => {
    await create()
    close()
  }

  return (
    <ui.Modal show={show} onHide={close}>
      <ui.ModalHeader>New List</ui.ModalHeader>
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
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button variant='success' disabled={!canCreate} onClick={onCreate}>
          Create
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default (props: Props) => (
  <ListEditingProvider>
    <EditListModal {...props} />
  </ListEditingProvider>
)
