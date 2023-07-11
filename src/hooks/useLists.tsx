import { useQuery } from '@tanstack/react-query'
import { ListGetParams, ListRow } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'

const useLists = (params: ListGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<ListRow[]>({
    queryKey: [
      'games',
      params.gameId,
      'characters',
      params.characterId,
      'lists',
      params.id
    ],
    queryFn: () => Requests.getLists(params),
    enabled
  })
}

export default useLists
