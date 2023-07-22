import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext } from '../contexts/RequestsContext'
import { usePlayContext } from '../contexts/PlayContext'

interface Context {
  shopping: boolean
  toggleShopping: () => void
  isPurchasing: boolean
  openItemId?: number
  setOpenItemId: (id?: number) => void
  purchaseItem: (quantity: number) => Promise<void>
}

const VendorContext = createContext<Context>({
  shopping: false,
  toggleShopping: () => {},
  isPurchasing: false,
  setOpenItemId: () => {},
  purchaseItem: async () => {}
})

export const useVendorContext = () => useContext(VendorContext)
export const VendorProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const Requests = useContext(RequestsContext)
  const [shopping, setShopping] = useState(false)
  const toggleShopping = () => setShopping(!shopping)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [openItemId, setOpenItemId] = useState<number>()
  const { gameId, userId, characterId } = usePlayContext()

  const purchaseItem = async (quantity: number) => {
    // 1. Set purchasing state
    setIsPurchasing(true)

    // 2. Request to purchase the item
    await Requests.purchaseItemAsCharacter(
      {
        characterId: characterId!,
        itemId: openItemId!
      },
      { quantity }
    )

    // 3. Done purchasing
    setIsPurchasing(false)

    // 4. Fetch updated records pertaining to current game
    queryClient.invalidateQueries({
      queryKey: ['games', gameId, 'users', userId, 'characters']
    })
  }

  const value: Context = {
    shopping,
    toggleShopping,
    isPurchasing,
    openItemId,
    setOpenItemId,
    purchaseItem
  }
  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  )
}
