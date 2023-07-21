import React, { useContext, useState } from 'react'
import ItemSlots from '../Items/ItemSlots'
import ViewItemModal from '../Items/ViewItemModal'
import { usePlayContext, useUIContext, useVendorContext } from '../../contexts'
import useItems from '../../hooks/useItems'
import { ItemUsageContext } from '../../contexts/ItemUsageContext'

const Loading = () => {
  const { Div, Spinner } = useUIContext()
  return (
    <Div
      style={{
        margin: '25px auto',
        width: 'fit-content'
      }}
    >
      <Spinner />
    </Div>
  )
}

const Inventory = () => {
  const ui = useUIContext()

  const {
    items: characterItems,
    isLoading: contextLoading,
    isFetching: contextFetching
  } = usePlayContext()

  const { isPurchasing } = useVendorContext()
  const { isUsing, use } = useContext(ItemUsageContext)

  const {
    data: items,
    isLoading: itemsLoading,
    isFetching: itemsFetching
  } = useItems()
  const [openItemId, setOpenItemId] = useState<number>()
  const openItem = (items || []).find((item) => item.id === openItemId)
  const spin =
    !isPurchasing &&
    (itemsLoading ||
      itemsFetching ||
      contextLoading ||
      contextFetching ||
      isUsing)

  const onUse = async () => {
    await use(openItemId!)
    setOpenItemId(undefined)
  }

  const itemSlots = Object.entries(characterItems || {})
    .map(([itemKey, count]) => ({
      item: items?.find((i) => i.key === itemKey)!,
      count
    }))
    .filter(({ count }) => !!count)
    .map(({ item, count }) => ({
      ...item,
      count,
      open: () => setOpenItemId(item.id)
    }))

  return spin ? (
    <Loading />
  ) : (
    <ui.Div>
      <ui.Div className='inventory'>
        <ItemSlots rows={4} columns={5} itemSlots={itemSlots} />
      </ui.Div>
      <ViewItemModal
        item={openItem}
        use={openItem?.useDelta ? onUse : undefined}
        close={() => setOpenItemId(undefined)}
        quantity={characterItems![openItem?.key || ''] || 0}
      />
    </ui.Div>
  )
}

export default Inventory
