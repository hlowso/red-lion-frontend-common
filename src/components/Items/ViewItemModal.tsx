import React from 'react'
import { Item } from 'common'
import Marked from '../Marked'
import ItemImage from './ItemImage'
import { useUIContext } from '../../contexts'

interface Props {
  item?: Item
  close: () => void
  use?: () => void
  quantity: number
}

const ItemModal = ({ item, close, use }: Props) => {
  const { Modal, ModalHeader, Div, Button, Strong } = useUIContext()
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
      <Div>
        <Marked markdown={item?.description || ''} />
      </Div>
      <Div>
        <Button onClick={close} variant='secondary'>
          Close
        </Button>
        <Button onClick={use} variant='primary'>
          Use
        </Button>
      </Div>
    </Modal>
  ) : null
}

export default ItemModal
