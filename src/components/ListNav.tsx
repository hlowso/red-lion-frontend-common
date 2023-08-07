import React, { useContext } from 'react'
import { usePlayContext, useUIContext } from '../contexts'
import useActivities from '../hooks/activities/useActivities'
import { incomplete, dueToday, inList, toComplete } from 'common/selectors'
import { EditingContext } from '../contexts/EditingContext'

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
  const ui = useUIContext()
  const { gameId } = usePlayContext()
  const { edit } = useContext(EditingContext)
  const { data: A, isLoading: ALoading } = useActivities()
  const todo = incomplete(toComplete(A || []))

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
              <ui.Icon
                name={icon}
                style={{ minWidth: '20px', marginRight: '10px' }}
              />
              <ui.Strong
                title={name}
                style={{
                  cursor: 'default',
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: '15px'
                }}
              >
                {name}
              </ui.Strong>
              <ui.Span style={{ fontSize: 'small' }}>
                {ALoading ? (
                  <ui.Spinner small />
                ) : id === -1 ? (
                  dueToday(todo || []).length
                ) : (
                  inList(id, todo || []).length
                )}
              </ui.Span>
            </ui.ListGroupItem>
          )),
          <ui.Div key='divider' style={{ width: '100%', height: '2px' }} />,
          <ui.ListGroupItem
            key={'new-list'}
            onClick={() =>
              edit(
                'New List',
                'list',
                [
                  { name: 'name', kind: 'text', label: 'Name' },
                  {
                    name: 'description',
                    kind: 'textarea',
                    label: 'Description'
                  }
                ],
                { gameId }
              )
            }
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
