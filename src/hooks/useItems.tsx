import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Item } from 'common'
import { RequestsContext } from '../contexts/RequestsContext'
import { usePlayContext } from '../contexts'

const useItems = (query?: { id: number }) => {
  const Requests = useContext(RequestsContext)
  const { gameId } = usePlayContext()

  return useQuery<Item[]>({
    queryKey: ['games', gameId, 'items', query?.id],
    queryFn: () => Requests.getItems({ gameId, ...query }),
    enabled: !!gameId
  })
}

export default useItems
