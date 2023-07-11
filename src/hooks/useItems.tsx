import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Item, ItemGetQuery } from 'common'
import { RequestsContext } from '../contexts/RequestsContext'

const useItems = (query: ItemGetQuery, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<Item[]>({
    queryKey: ['games', query.gameId, 'items', query.id],
    queryFn: () => Requests.getItems(query),
    enabled
  })
}

export default useItems
