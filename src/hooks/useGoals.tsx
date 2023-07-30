import { useQuery } from '@tanstack/react-query'
import { GoalRow } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'
import { usePlayContext } from '../contexts'

const useGoals = (params?: { id: number }) => {
  const Requests = useContext(RequestsContext)
  const { gameId } = usePlayContext()
  return useQuery<undefined, undefined, GoalRow[], any>({
    queryKey: ['games', gameId, 'goals', params?.id],
    queryFn: () => Requests.getGoals({ gameId, ...(params || {}) }),
    enabled: !!gameId && (!params || params.id)
  })
}

export default useGoals
