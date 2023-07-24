import React from 'react'
import { useUIContext } from '../contexts'
import useActivities from '../hooks/activities/useActivities'

interface ListNavItem {
  id: number
  icon: string
  name: string
}

interface Props {
  lists: ListNavItem[]
  openListId?: number
  openList: (listId: number) => void
  openUnplannedModal: () => void
  openCreateListModal: () => void
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
  openUnplannedModal,
  openCreateListModal
}: Props) => {
  const ui = useUIContext()
  const { data: A, isLoading: ALoading } = useActivities()
  return (
    <ui.ListGroup className='list-nav' style={{ backgroundColor: '#eee' }}>
      {lists.length === 0 ? (
        <Loading />
      ) : (
        [
          ...lists.map(({ id, icon, name }) => (
            <ui.ListGroupItem
              key={id}
              className='list'
              onClick={() => openList(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: id === openListId ? '#ccc' : '#eee'
              }}
            >
              <ui.Icon name={icon} style={{ marginRight: '10px' }} />
              <ui.Strong style={{ cursor: 'default', flexGrow: 1 }}>
                {name}
              </ui.Strong>
              <ui.Span style={{ fontSize: 'small' }}>
                {ALoading ? (
                  <ui.Spinner small />
                ) : (
                  id > -1 && A?.filter((a) => a.listId === id)?.length
                )}
              </ui.Span>
            </ui.ListGroupItem>
          )),
          <ui.Div key='divider' style={{ width: '100%', height: '2px' }} />,
          <ui.ListGroupItem
            key={'new-list'}
            onClick={openCreateListModal}
            style={{ backgroundColor: '#eee', cursor: 'pointer' }}
          >
            <ui.Icon name='Plus' style={{ marginRight: '10px' }} />
            <ui.Span>New List</ui.Span>
          </ui.ListGroupItem>,
          <ui.ListGroupItem
            key={'unplanned'}
            onClick={openUnplannedModal}
            style={{ backgroundColor: '#eee', cursor: 'pointer' }}
          >
            <ui.Icon name='PencilFill' style={{ marginRight: '10px' }} />
            <ui.Span>Log Unplanned</ui.Span>
          </ui.ListGroupItem>
        ]
      )}
    </ui.ListGroup>
  )
}

export default ListNav
