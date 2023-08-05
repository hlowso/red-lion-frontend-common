import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActivityGetParams, Activity, Util } from 'common'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useActivities = (params?: ActivityGetParams) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId } = usePlayContext()
  const result = useQuery<Activity[]>({
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
  return { ...result, data: result.data?.sort(Util.Activity.sort) }
}

export default useActivities
