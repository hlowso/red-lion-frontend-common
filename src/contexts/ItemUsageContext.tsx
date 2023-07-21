import React, {
  useContext,
  createContext,
  useState,
  PropsWithChildren
} from 'react'
import { RequestsContext } from './RequestsContext'
import { useQueryClient } from '@tanstack/react-query'
import { usePlayContext } from './PlayContext'

interface Context {
  use: (id: number) => Promise<void>
  isUsing: boolean
}

export const ItemUsageContext = createContext<Context>({
  use: async () => {},
  isUsing: false
})

export const ItemUsageProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const Requests = useContext(RequestsContext)
  const { gameId, characterId } = usePlayContext()
  const [isUsing, setIsUsing] = useState(false)

  const use = async (itemId: number) => {
    // 1. Set using state
    setIsUsing(true)

    // 2. Request to use the item
    await Requests.utilizeItemAsCharacter({
      characterId: characterId!,
      itemId
    })

    // 3. Done using
    setIsUsing(false)

    // 4. Fetch updated records pertaining to current game
    queryClient.invalidateQueries({ queryKey: ['games', gameId] })
  }

  const value = {
    use,
    isUsing
  }

  return (
    <ItemUsageContext.Provider value={value}>
      {children}
    </ItemUsageContext.Provider>
  )
}
