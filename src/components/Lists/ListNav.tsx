import React from 'react'
import { useUIContext } from '../../contexts'

interface ListNavItem {
  id: number
  icon: string
  name: string
}

interface Props {
  lists: ListNavItem[]
  openListId: number
  openList: (listId: number) => void
}

const Loading = () => {
  const { Div, Spinner } = useUIContext()
  return (
    <Div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Spinner />
    </Div>
  )
}

const ListNav = ({ lists, openListId, openList }: Props) => {
  const { ListGroup, ListGroupItem, Icon, Strong } = useUIContext()
  return (
    <ListGroup className='list-nav'>
      {lists.length === 0 ? (
        <Loading />
      ) : (
        lists.map(({ id, icon, name }) => (
          <ListGroupItem
            onClick={() => openList(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: id === openListId ? '#ccc' : '#eee'
            }}
          >
            <Icon name={icon} style={{ marginRight: '10px' }} />
            <Strong>{name}</Strong>
          </ListGroupItem>
        ))
      )}
    </ListGroup>
  )
}

export default ListNav
