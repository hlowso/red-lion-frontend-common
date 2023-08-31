import React, { useState } from 'react'
import JournalNav from './JournalNav'
import { JournalRow } from 'common'
import { useUIContext } from '../../contexts'
import NewEntryEditor from './NewEntryEditor'
import JournalEntries from './JournalEntries'
import AddEntryButton from './AddEntryButton'

interface Props {
  journals: JournalRow[]
}

const Journals = ({ journals }: Props) => {
  const ui = useUIContext()
  const [openJournalId, setOpenJournalId] = useState<number>()
  const [editing, setEditing] = useState(false)
  const openJournal = journals.find((j) => j.id === openJournalId)

  return (
    <ui.Div style={{ display: 'flex' }}>
      <JournalNav
        journals={journals}
        openJournalId={openJournalId}
        setOpenJournalId={setOpenJournalId}
      />
      <ui.Div>
        <NewEntryEditor
          journalId={openJournalId!}
          editing={editing}
          setEditing={setEditing}
        />
        <JournalEntries journal={openJournal} editing={editing} />
      </ui.Div>
      {openJournal && (
        <AddEntryButton editing={editing} edit={() => setEditing(true)} />
      )}
    </ui.Div>
  )
}

export default Journals
