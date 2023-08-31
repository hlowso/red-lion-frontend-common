import React from 'react'
import { JournalEntryRow, JournalRow } from 'common'
import useJournalEntries from '../../hooks/useJournalEntries'
import JournalEntry from './JournalEntry'
import { useUIContext } from '../../contexts'

interface Props {
  journal?: JournalRow
  editing: boolean
}

const Entries = ({ entries }: { entries: JournalEntryRow[] }) => {
  const ui = useUIContext()
  return (
    <ui.Div>{...entries.map((entry) => <JournalEntry entry={entry} />)}</ui.Div>
  )
}

const JournalEntries = ({ journal, editing }: Props) => {
  const { data: journalEntries } = useJournalEntries({ journalId: journal?.id })
  const E = journalEntries || []
  const ui = useUIContext()

  return (
    <ui.Div style={{ margin: '0 15px 0 0' }}>
      {E.length === 0 && !editing ? (
        <ui.Strong>This journal has no entries</ui.Strong>
      ) : (
        <Entries entries={E} />
      )}
    </ui.Div>
  )
}

export default JournalEntries
