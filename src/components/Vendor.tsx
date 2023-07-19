import React, { useContext, useState } from 'react'
import ItemSlots from './Items/ItemSlots'
import Backdrop from './Backdrop'
import PurchaseItemModal from './Items/PurchaseItemModal'
import { useUIContext, useVendorContext } from '../contexts'
import useItems from '../hooks/useItems'

const Vendor = () => {
  const ui = useUIContext()
  const { shopping, toggleShopping, openItemId, setOpenItemId, purchaseItem } =
    useVendorContext()
  const { data: items, isLoading: itemsLoading } = useItems()
  const openItem = (items || []).find((i) => i.id === openItemId)
  const itemSlots = (items || []).map((item) => ({
    ...item,
    open: () => setOpenItemId(item.id)
  }))

  const onPurchase = (quantity: number) => {
    purchaseItem(quantity)
    setOpenItemId()
  }

  return shopping ? (
    <ui.Div>
      <ui.Card className='vendor'>
        <ui.CardHeader>Vendor</ui.CardHeader>
        {itemsLoading ? (
          <ui.Spinner />
        ) : (
          <ui.CardBody>
            <ItemSlots
              rows={6}
              columns={5}
              itemSlots={itemSlots}
              canSpin={false}
            />
          </ui.CardBody>
        )}
      </ui.Card>
      <PurchaseItemModal
        item={openItem}
        purchase={onPurchase}
        close={() => setOpenItemId()}
      />
      <Backdrop onClick={toggleShopping} />
    </ui.Div>
  ) : null
}

export default Vendor
