import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'
import { JournalRow } from 'common'

const useJournals = (params: { userId?: number; gameId?: number }) => {
  const Requests = useContext(RequestsContext)
  return useQuery<JournalRow[]>({
    queryKey: ['users', params.userId, 'games', params.gameId, 'journals'],
    queryFn: () => Requests.getJournals(params),
    enabled: !!params.userId && !!params.gameId
  })
}

export default useJournals
