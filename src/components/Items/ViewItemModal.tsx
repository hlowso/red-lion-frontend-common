import React from 'react'
import { Item } from 'common'
import ItemImage from './ItemImage'
import { useUIContext } from '../../contexts'

interface Props {
  item?: Item
  close: () => void
  use?: () => void
  quantity: number
}

const ItemModal = ({ item, close, use }: Props) => {
  const {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Div,
    Button,
    Strong,
    Marked
  } = useUIContext()
  return !!item ? (
    <Modal show={!!item} onHide={close}>
      <ModalHeader>
        <Div style={{ display: 'flex' }}>
          <ItemImage src={item.imageUrl} scale={1.25} />
          <Div
            style={{
              paddingLeft: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Strong
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            >
              {item.name}
            </Strong>
          </Div>
        </Div>
      </ModalHeader>
      <ModalBody>
        <Marked>{item?.description || ''}</Marked>
      </ModalBody>
      <ModalFooter>
        <Button onClick={close} variant='secondary'>
          Close
        </Button>
        <Button onClick={use} variant='primary'>
          Use
        </Button>
      </ModalFooter>
    </Modal>
  ) : null
}

export default ItemModal
