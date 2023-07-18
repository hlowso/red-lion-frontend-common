import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityGetParams, Activity } from 'common'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useActivities = (params?: ActivityGetParams) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId } = usePlayContext()
  return useQuery<Activity[]>({
    queryKey: [
      'games',
      gameId,
      'lists',
      params?.listId,
      'characters',
      characterId,
      'activities',
      params?.id
    ],
    queryFn: () =>
      Requests.getActivities({ gameId, characterId, ...(params || {}) }),
    enabled: !!gameId && !!characterId
  })
}

export default useActivities
