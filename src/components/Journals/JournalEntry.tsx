import React from 'react'
import { useUIContext } from '../../contexts'
import { JournalEntryRow } from 'common'
import { Util } from 'common'

interface Props {
  entry: Omit<JournalEntryRow, 'id'>
  header?: string
}

const JournalEntry = ({ entry, header }: Props) => {
  const ui = useUIContext()

  return (
    <ui.Card style={{ width: '500px', margin: '0 0 20px' }}>
      <ui.CardHeader>
        {header || Util.Date.dateString(entry.writtenAt)}
      </ui.CardHeader>
      <ui.CardBody>
        <ui.Marked>{entry.text}</ui.Marked>
      </ui.CardBody>
    </ui.Card>
  )
}

export default JournalEntry
