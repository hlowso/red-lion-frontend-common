import { useQuery } from '@tanstack/react-query'
import { ListGetParams, ListRow } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'
import { usePlayContext } from '../contexts'

const useLists = (params?: ListGetParams) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId } = usePlayContext()
  return useQuery<undefined, undefined, ListRow[], any>({
    queryKey: ['games', gameId, 'characters', characterId, 'lists', params?.id],
    queryFn: () =>
      Requests.getLists({ gameId, characterId, ...(params || {}) }),
    enabled: !!gameId && !!characterId && (!params || !!params.id)
  })
}

export default useLists
