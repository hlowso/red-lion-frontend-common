import { useQuery } from '@tanstack/react-query'
import { Log, LogGetParams } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../contexts/RequestsContext'

const useLogs = (params: LogGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)
  return useQuery<Log[]>({
    queryKey: [
      'games',
      params.gameId,
      'logs',
      params.subjectType,
      params.subjectId,
      params.verb,
      params.objectType,
      params.objectId,
      params.id,
      params.since
    ],
    queryFn: () => Requests.getLogs(params),
    enabled
  })
}

export default useLogs
