import { JournalEntryRow } from 'common'
import { HTTPRequests } from '.'

const JournalEntries = ({ GET, POST }: HTTPRequests) => {
  const getJournalEntries = (params: { characterId?: number }) =>
    GET(`/characters/${params.characterId}/journal-entries`)

  const createJournalEntry = (
    params: Omit<JournalEntryRow, 'id' | 'writtenAt'>
  ) => POST(`/characters/${params.characterId}/journal-entries`, params)

  return {
    getJournalEntries,
    createJournalEntry
  }
}

export default JournalEntries
