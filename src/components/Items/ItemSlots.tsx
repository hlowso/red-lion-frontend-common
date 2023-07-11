import React from 'react'
import { useUIContext } from '../../contexts'
import ItemSlot from './ItemSlot'
import { Item } from 'common'

interface Props {
  rows: number
  columns: number
  itemSlots: Array<
    Item & {
      count?: number
      open?: () => void
    }
  >
}

const ItemSlots = ({ rows, columns, itemSlots }: Props) => {
  const { Div, Row, Col } = useUIContext()
  const idx = (i: number, j: number) => i * columns + j
  return (
    <Div>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <Row key={i}>
            {Array(columns)
              .fill(0)
              .map((_, j) => (
                <Col key={j}>
                  <ItemSlot item={itemSlots[idx(i, j)]} />
                </Col>
              ))}
          </Row>
        ))}
    </Div>
  )
}

export default ItemSlots
