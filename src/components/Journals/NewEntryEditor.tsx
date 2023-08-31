import React, { ChangeEvent, useContext, useState } from 'react'
import { RequestsContext, usePlayContext, useUIContext } from '../../contexts'
import JournalEntry from './JournalEntry'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  journalId: number
  editing: boolean
  setEditing: (editing: boolean) => void
}

const NewEntryEditor = ({ journalId, setEditing, editing }: Props) => {
  const queryClient = useQueryClient()
  const ui = useUIContext()
  const R = useContext(RequestsContext)
  const { userId, gameId, characterId } = usePlayContext()
  const [draft, setDraft] = useState<string>('')

  const onDraftChange = (e: ChangeEvent<{ value: string }>) =>
    setDraft(e.target.value)

  const submit = async () => {
    if (!characterId) return

    await R.createJournalEntry({ journalId, characterId, text: draft })
    queryClient.invalidateQueries(['users', userId, 'games', gameId])
    setEditing(false)
  }

  if (!characterId) {
    return <ui.Spinner />
  }

  return !editing ? null : (
    <ui.Div style={{ display: 'flex' }}>
      <JournalEntry
        entry={{ journalId, characterId, text: draft, writtenAt: new Date() }}
        header='New Entry'
      />
      <ui.Div style={{ margin: '0 0 0 10px' }}>
        <ui.FormControl
          as='textarea'
          value={draft}
          onChange={onDraftChange}
          style={{ margin: '0 0 10px', width: '500px' }}
        />
        <ui.Div>
          <ui.Button
            variant='success'
            onClick={submit}
            style={{ margin: '0 10px 0 0' }}
          >
            Submit
          </ui.Button>
          <ui.Button variant='danger' onClick={() => setEditing(false)}>
            Cancel
          </ui.Button>
        </ui.Div>
      </ui.Div>
    </ui.Div>
  )
}

export default NewEntryEditor
