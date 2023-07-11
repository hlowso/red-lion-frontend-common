import { useQuery } from '@tanstack/react-query'
import { GameGetParams, GameRow } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'

const useGames = (params: GameGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<GameRow[]>({
    queryKey: ['users', params.userId, 'games', params.id],
    queryFn: () => Requests.getGames(params),
    enabled
  })
}

export default useGames
