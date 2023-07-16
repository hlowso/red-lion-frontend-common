import React, { useContext, useState } from 'react'
import ItemSlots from './Items/ItemSlots'
import Backdrop from './Backdrop'
import PurchaseItemModal from './Items/PurchaseItemModal'
import { useQueryClient } from '@tanstack/react-query'
import {
  RequestsContext,
  usePlayContext,
  useUIContext,
  useVendorContext
} from '../contexts'
import useItems from '../hooks/useItems'

const Vendor = () => {
  const queryClient = useQueryClient()
  const ui = useUIContext()
  const Requests = useContext(RequestsContext)
  const { gameId, characterId, isLoading: contextLoading } = usePlayContext()
  const { shopping, toggleShopping } = useVendorContext()
  const { data: items, isLoading: itemsLoading } = useItems()
  const [openItemId, setOpenItemId] = useState<number>()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const openItem = (items || []).find((i) => i.id === openItemId)
  const itemSlots = (items || []).map((item) => ({
    ...item,
    open: () => setOpenItemId(item.id)
  }))

  const onPurchase = async (quantity: number) => {
    // 1. Close modal
    setOpenItemId(undefined)

    // 2. Set purchasing state
    setIsPurchasing(true)

    // 3. Request to purchase the item
    await Requests.purchaseItemAsCharacter(
      {
        characterId: characterId!,
        itemId: openItemId!
      },
      { quantity }
    )

    // 4. Fetch updated records pertaining to current game
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })

    // 5. Done purchasing
    setIsPurchasing(false)
  }

  return shopping ? (
    <ui.Div>
      <ui.Card className='vendor'>
        <ui.CardHeader>Vendor</ui.CardHeader>
        {contextLoading || itemsLoading || isPurchasing ? (
          <ui.Spinner />
        ) : (
          <ui.CardBody>
            <ItemSlots rows={6} columns={5} itemSlots={itemSlots} />
          </ui.CardBody>
        )}
      </ui.Card>
      <PurchaseItemModal
        item={openItem}
        purchase={onPurchase}
        close={() => setOpenItemId(undefined)}
      />
      <Backdrop onClick={toggleShopping} />
    </ui.Div>
  ) : null
}

export default Vendor
