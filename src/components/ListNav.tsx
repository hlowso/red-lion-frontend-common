import React from 'react'
import { useUIContext } from '../contexts'

interface ListNavItem {
  id: number
  icon: string
  name: string
}

interface Props {
  lists: ListNavItem[]
  openListId: number
  openList: (listId: number) => void
  openUnplannedModal: () => void
}

const Loading = () => {
  const { Div, Spinner } = useUIContext()
  return (
    <Div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Spinner />
    </Div>
  )
}

const ListNav = ({
  lists,
  openListId,
  openList,
  openUnplannedModal
}: Props) => {
  const { ListGroup, ListGroupItem, Icon, Strong, Span, Div } = useUIContext()
  return (
    <ListGroup className='list-nav' style={{ backgroundColor: '#eee' }}>
      {lists.length === 0 ? (
        <Loading />
      ) : (
        [
          ...lists.map(({ id, icon, name }) => (
            <ListGroupItem
              key={id}
              className='list'
              onClick={() => openList(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: id === openListId ? '#ccc' : '#eee'
              }}
            >
              <Icon name={icon} style={{ marginRight: '10px' }} />
              <Strong style={{ cursor: 'default' }}>{name}</Strong>
            </ListGroupItem>
          )),
          <Div key='divider' style={{ width: '100%', height: '2px' }} />,
          <ListGroupItem
            key={'unplanned'}
            onClick={openUnplannedModal}
            style={{ backgroundColor: '#eee', cursor: 'pointer' }}
          >
            <Icon name='PencilFill' style={{ marginRight: '10px' }} />
            <Span>Log Unplanned</Span>
          </ListGroupItem>
        ]
      )}
    </ListGroup>
  )
}

export default ListNav
