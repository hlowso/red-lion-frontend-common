import React, { useContext, useState } from 'react'
import ItemSlots from '../Items/ItemSlots'
import ViewItemModal from '../Items/ViewItemModal'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import useItems from '../../hooks/useItems'

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
  const queryClient = useQueryClient()
  const { Div } = useUIContext()
  const Requests = useContext(RequestsContext)
  const {
    gameId,
    characterId,
    items: characterItems,
    isLoading: contextLoading
  } = usePlayContext()
  const { data: items, isLoading } = useItems({ gameId }, !!gameId)
  const [openItemId, setOpenItemId] = useState<number>()
  const [isUsing, setIsUsing] = useState(false)
  const openItem = (items || []).find((item) => item.id === openItemId)

  const onUse = async () => {
    // 1. Close modal
    setOpenItemId(undefined)

    // 2. Set using state
    setIsUsing(true)

    // 3. Request to use the item
    await Requests.utilizeItemAsCharacter({
      characterId: characterId!,
      itemId: openItemId!
    })

    // 4. Fetch updated records pertaining to current game
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })

    // 5. Done using
    setIsUsing(false)
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

  return isLoading || contextLoading ? (
    <Loading />
  ) : (
    <>
      <Div className='inventory'>
        <ItemSlots rows={4} columns={5} itemSlots={itemSlots} />
      </Div>
      <ViewItemModal
        item={openItem}
        use={openItem?.useDelta ? onUse : undefined}
        close={() => setOpenItemId(undefined)}
        quantity={characterItems![openItem?.key || ''] || 0}
      />
    </>
  )
}

export default Inventory
