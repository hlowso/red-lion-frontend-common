import { useQuery } from '@tanstack/react-query'
import { TallyRow, TallyGetParams } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'
import { usePlayContext } from '../contexts'

const useTallies = (params?: TallyGetParams) => {
  const Requests = useContext(RequestsContext)
  const { gameId } = usePlayContext()
  return useQuery<undefined, undefined, TallyRow[], any>({
    queryKey: ['games', gameId, 'tallies', params?.id],
    queryFn: () => Requests.getTallies({ gameId, ...(params || {}) }),
    enabled: !!gameId && (!params || params.id)
  })
}

export default useTallies
