import React, { useState } from 'react'
import Nav from '../components/Nav'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import { useUIContext, usePlayContext } from '../contexts'
import { interfaceLists } from 'common/selectors'
import useLists from '../hooks/useLists'

const LandscapeApp = () => {
  const { Div } = useUIContext()
  const {
    gameId,
    characterId,
    isLoading: playContextLoading
  } = usePlayContext()
  const { data: lists } = useLists({ gameId, characterId }, !playContextLoading)
  const [openListId, setOpenListId] = useState<number>(-1)
  const listNavItems = [
    { id: -1, name: 'Today', icon: 'BrightnessLowFill' },
    ...interfaceLists(lists || []).map(({ id, name }) => ({
      id,
      name,
      icon: 'ListCheck'
    }))
  ]
  const [unplannedModalOpen, setUnplannedModalOpen] = useState(false)

  return (
    <Div className='LandscapeApp'>
      <Nav />
      <Div
        style={{
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          padding: '85px 20px 20px',
          top: 0
        }}
      >
        <ListNav
          lists={listNavItems}
          openListId={openListId}
          openList={setOpenListId}
          openUnplannedModal={() => setUnplannedModalOpen(true)}
        />
        <Lists lists={lists || []} openListId={openListId} />
      </Div>
      <Possessions />
      <Vendor />
      <Notifications />
    </Div>
  )
}

export default LandscapeApp
