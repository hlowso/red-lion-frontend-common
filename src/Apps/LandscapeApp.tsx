import React from 'react'
import Nav from '../components/Nav'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import { useUIContext } from '../contexts'
import CreateActivityModal from '../components/Lists/CreateActivityModal'
import useL from '../hooks/useLists'
import useA from '../hooks/activities/useActivities'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'
import TallyTargets from '../components/TallyTargets'
import { AppProps } from '../App'
import { Util } from 'common'

const LandscapeApp = ({
  openListId,
  setOpenListId,
  createUnplannedModalOpen,
  selectUnplannedModalOpen,
  setCreateUnplannedModalOpen,
  setSelectUnplannedModalOpen
}: AppProps) => {
  const ui = useUIContext()
  const { data: L, isLoading: LLoading } = useL()
  const { data: A, isLoading: ALoading } = useA()

  return LLoading || ALoading ? (
    <ui.Div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        display: 'flex'
      }}
    >
      <ui.Spinner style={{ margin: 'auto' }} />
    </ui.Div>
  ) : (
    <ui.Div className='LandscapeApp'>
      <Nav />
      <ui.Div
        style={{
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          padding: '85px 20px 20px',
          top: 0
        }}
      >
        <ui.Div>
          <TallyTargets />
        </ui.Div>
        <ui.Div
          style={{
            width: '100%',
            display: 'flex',
            margin: '15px 0 0'
          }}
        >
          <ListNav
            lists={Util.List.listNavItems(L || [])}
            openListId={openListId!}
            openList={setOpenListId}
            openUnplannedModal={() =>
              Util.Activity.unplannedActivites(L || [], A || []).length
                ? setSelectUnplannedModalOpen(true)
                : setCreateUnplannedModalOpen(true)
            }
          />
          <Lists
            lists={L || []}
            activities={A || []}
            openListId={openListId!}
          />
        </ui.Div>
      </ui.Div>
      <Possessions />
      <Vendor />
      <Notifications />
      <SelectUnplannedActivityModal
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={Util.Activity.unplannedActivites(L || [], A || [])}
        createNewActivity={() => {
          setSelectUnplannedModalOpen(false)
          setCreateUnplannedModalOpen(true)
        }}
      />
      <CreateActivityModal
        show={createUnplannedModalOpen}
        close={() => setCreateUnplannedModalOpen(false)}
      />
    </ui.Div>
  )
}

export default LandscapeApp
