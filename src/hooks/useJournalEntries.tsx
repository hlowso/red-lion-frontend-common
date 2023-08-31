import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { usePlayContext } from '../contexts'
import { RequestsContext } from '../contexts/RequestsContext'
import { JournalEntryRow } from 'common'

const useJournalEntries = (params: { journalId?: number }) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId, userId } = usePlayContext()

  const { data, ...fields } = useQuery<JournalEntryRow[]>({
    queryKey: [
      'users',
      userId,
      'games',
      gameId,
      'characters',
      characterId,
      'journals',
      params.journalId,
      'entries'
    ],
    queryFn: () => Requests.getJournalEntries({ ...params, characterId }),
    enabled: !!params.journalId && !!characterId
  })

  const withDate = (data || []).map((entry) => ({
    ...entry,
    writtenAt: new Date(entry.writtenAt)
  }))

  const reversed = withDate.reverse()

  return {
    data: reversed,
    ...fields
  }
}

export default useJournalEntries
