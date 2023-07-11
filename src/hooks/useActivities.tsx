import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityGetParams, ActivityRow } from 'common'
import { RequestsContext } from '../contexts/RequestsContext'

const useActivities = (params: ActivityGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<ActivityRow[]>({
    queryKey: [
      'games',
      params.gameId,
      'lists',
      params.listId,
      'characters',
      params.characterId,
      'activities',
      params.id
    ],
    queryFn: () => Requests.getActivities(params),
    enabled
  })
}

export default useActivities
