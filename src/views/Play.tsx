import React from 'react'
import { useUIContext } from '../contexts'
import TallyTargets from '../components/TallyTargets'
import Decorations from '../components/Decorations'
import Vendor from '../components/Vendor'
import ListNav from '../components/ListNav'
import GoalList from '../components/Goals/GoalList'
import GoalModal from '../components/Goals/GoalModal'
import Lists from '../components/Lists'
import Possessions from '../components/Possessions'
import Notifications from '../components/Notifications'
import EditingModal from '../components/EditingModal'
import EditActivityModal from '../components/Lists/EditActivityModal'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'
import { Util } from 'common'
import { unplanned } from 'common/selectors'
import { AppProps } from '../App'
import TimeCard from '../components/TimeCards/TimeCard'

const Play = ({
  lists,
  activities,
  characterGoals,
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
  return (
    <ui.Div>
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
          {/* <TallyTargets /> */}
          <TimeCard timeCardId={1} />
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
            lists={Util.List.listNavItems(lists)}
            openListId={openListId!}
            openList={setOpenListId}
            openUnplannedModal={() =>
              unplanned(lists, activities).length
                ? setSelectUnplannedModalOpen(true)
                : setCreateUnplannedModalOpen(true)
            }
          />
          <Lists
            lists={lists}
            activities={activities}
            openListId={openListId!}
          />
          <GoalList
            goals={characterGoals}
            openGoalModal={setOpenGoalId}
            style={{
              margin: '0 0 0 20px',
              maxHeight: '90vh',
              overflow: 'scroll'
            }}
          />
        </ui.Div>
      </ui.Div>
      <Possessions />
      <Vendor />
      <Notifications />
      <SelectUnplannedActivityModal
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={unplanned(lists, activities)}
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
        goal={characterGoals.find((g) => g.goalId === openGoalId)!}
        close={() => setOpenGoalId(undefined)}
      />
    </ui.Div>
  )
}

export default Play
