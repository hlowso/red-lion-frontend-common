import React from 'react'
import { JournalRow } from 'common'
import { useUIContext } from '../../contexts'

interface Props {
  journals: JournalRow[]
  openJournalId?: number
  setOpenJournalId: (id: number) => void
}

const JournalNav = ({ journals, openJournalId, setOpenJournalId }: Props) => {
  const ui = useUIContext()
  return (
    <ui.ListGroup style={{ maxWidth: '200px', margin: '0 15px 0 0' }}>
      {...journals.map(({ id, name }) => (
        <ui.ListGroupItem
          key={id}
          className='journal'
          onClick={() => setOpenJournalId(id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: id === openJournalId ? '#ccc' : '#eee'
          }}
        >
          <ui.Icon name='Book' />
          <ui.Strong
            title={name}
            style={{
              cursor: 'default',
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              paddingRight: '15px',
              paddingLeft: '10px'
            }}
          >
            {name}
          </ui.Strong>
        </ui.ListGroupItem>
      ))}
      <ui.ListGroupItem
        key={'new-journal'}
        className='journal'
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#eee'
        }}
      >
        <ui.Icon name='Plus' />
        <ui.Span
          style={{
            cursor: 'default',
            flexGrow: 1,
            paddingRight: '15px',
            paddingLeft: '10px'
          }}
        >
          New Journal
        </ui.Span>
      </ui.ListGroupItem>
    </ui.ListGroup>
  )
}

export default JournalNav
