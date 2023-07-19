import React from 'react'
import { useUIContext, useVendorContext } from '../../contexts'
import ItemSlot from './ItemSlot'
import { Item } from 'common'

interface Props {
  rows: number
  columns: number
  canSpin?: boolean
  itemSlots: Array<
    Item & {
      count?: number
      open?: () => void
    }
  >
}

const ItemSlots = ({ rows, columns, itemSlots, canSpin = true }: Props) => {
  const ui = useUIContext()
  const { isPurchasing } = useVendorContext()

  const idx = (i: number, j: number) => i * columns + j
  const spin = (i: number, j: number) =>
    canSpin && isPurchasing && idx(i, j) === itemSlots.length

  return (
    <ui.Div>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <ui.Row key={i}>
            {Array(columns)
              .fill(0)
              .map((_, j) => (
                <ui.Col key={j}>
                  <ItemSlot item={itemSlots[idx(i, j)]} spin={spin(i, j)} />
                </ui.Col>
              ))}
          </ui.Row>
        ))}
    </ui.Div>
  )
}

export default ItemSlots
