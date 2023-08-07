import React from 'react'
import Nav from '../components/Nav'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import { useUIContext } from '../contexts'
import EditActivityModal from '../components/Lists/EditActivityModal'
import useL from '../hooks/useLists'
import useA from '../hooks/activities/useActivities'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'
import TallyTargets from '../components/TallyTargets'
import Decorations from '../components/Decorations'
import { AppProps } from '../App'
import { Util } from 'common'
import { unplanned } from 'common/selectors'
import GoalList from '../components/Goals/GoalList'
import GoalModal from '../components/Goals/GoalModal'
import useCharacterGoals from '../hooks/characters/useCharacterGoals'
import EditingModal from '../components/EditingModal'

const LandscapeApp = ({
  openListId,
  openGoalId,
  setOpenListId,
  setOpenGoalId,
  createUnplannedModalOpen,
  selectUnplannedModalOpen,
  setCreateUnplannedModalOpen,
  setSelectUnplannedModalOpen
}: AppProps) => {
  const ui = useUIContext()
  const { data: L, isLoading: LLoading } = useL()
  const { data: A, isLoading: ALoading } = useA()
  const { data: CG } = useCharacterGoals()

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
          <Decorations openGoalModal={setOpenGoalId} />
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
              unplanned(L || [], A || []).length
                ? setSelectUnplannedModalOpen(true)
                : setCreateUnplannedModalOpen(true)
            }
          />
          <Lists
            lists={L || []}
            activities={A || []}
            openListId={openListId!}
          />
          <GoalList
            goals={CG || []}
            openGoalModal={setOpenGoalId}
            style={{ margin: '0 0 0 20px' }}
          />
        </ui.Div>
      </ui.Div>
      <Possessions />
      <Vendor />
      <Notifications />
      <SelectUnplannedActivityModal
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={unplanned(L || [], A || [])}
        createNewActivity={() => {
          setSelectUnplannedModalOpen(false)
          setCreateUnplannedModalOpen(true)
        }}
      />
      <EditingModal />
      <EditActivityModal
        show={createUnplannedModalOpen}
        close={() => setCreateUnplannedModalOpen(false)}
      />
      <GoalModal
        goal={(CG || []).find((g) => g.goalId === openGoalId)}
        close={() => setOpenGoalId(undefined)}
      />
    </ui.Div>
  )
}

export default LandscapeApp
