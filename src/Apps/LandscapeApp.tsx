import React, { useState } from 'react'
import Nav from '../components/Nav'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import { useUIContext } from '../contexts'
import { interfaceLists } from 'common/selectors'
import { ActivityRow, ListRow } from 'common'
import CreateActivityModal from '../components/Lists/CreateActivityModal'
import useL from '../hooks/useLists'
import useA from '../hooks/activities/useActivities'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'
import TallyTargets from '../components/TallyTargets'
import { Util } from 'common'

const listNavItems = (lists: ListRow[]) => [
  { id: -1, name: 'Today', icon: 'BrightnessLowFill' },
  ...interfaceLists(lists || []).map(({ id, name }) => ({
    id,
    name,
    icon: 'ListCheck'
  }))
]
const unplannedActivites = (lists: ListRow[], activities: ActivityRow[]) =>
  activities.filter((a) => a.listId === Util.List.unplannedList(lists)?.id)

const LandscapeApp = () => {
  const ui = useUIContext()
  const { data: L, isLoading: LLoading } = useL()
  const { data: A, isLoading: ALoading } = useA()
  const [openListId, setOpenListId] = useState<number>(-1)
  const [selectUnplannedModalOpen, setSelectUnplannedModalOpen] =
    useState(false)
  const [createUnplannedModalOpen, setCreateUnplannedModalOpen] =
    useState(false)

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
            lists={listNavItems(L || [])}
            openListId={openListId}
            openList={setOpenListId}
            openUnplannedModal={() =>
              unplannedActivites(L || [], A || []).length
                ? setSelectUnplannedModalOpen(true)
                : setCreateUnplannedModalOpen(true)
            }
          />
          <Lists lists={L || []} activities={A || []} openListId={openListId} />
        </ui.Div>
      </ui.Div>
      <Possessions />
      <Vendor />
      <Notifications />
      <SelectUnplannedActivityModal
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={unplannedActivites(L || [], A || [])}
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
