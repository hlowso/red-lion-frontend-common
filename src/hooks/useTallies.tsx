import { useQuery } from '@tanstack/react-query'
import { TallyRow, TallyGetParams } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'

const useTallies = (params: TallyGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<TallyRow[]>({
    queryKey: ['games', params.gameId, 'tallies', params.id],
    queryFn: () => Requests.getTallies(params),
    enabled
  })
}

export default useTallies
