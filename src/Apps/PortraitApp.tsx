import React from 'react'
import { useUIContext } from '../contexts'
import { AppProps } from '../App'
import useL from '../hooks/useLists'
import useA from '../hooks/activities/useActivities'
import Lists from '../components/Lists'
import ListNav from '../components/ListNav'
import SelectUnplannedActivityModal from '../components/Lists/SelectUnplannedActivityModal'
import EditActivityModal from '../components/Lists/EditActivityModal'
import { unplanned } from 'common/selectors'
import { Util } from 'common'

const PortraitApp = ({
  openListId,
  setOpenListId,
  setSelectUnplannedModalOpen,
  setCreateUnplannedModalOpen,
  selectUnplannedModalOpen,
  createUnplannedModalOpen
}: AppProps) => {
  const ui = useUIContext()
  const { data: L, isLoading: LLoading } = useL()
  const { data: A, isLoading: ALoading } = useA()

  return (
    <ui.Div>
      {!openListId ? (
        <ListNav
          lists={Util.List.listNavItems(L || [])}
          openListId={openListId}
          openList={(id) => setOpenListId(id)}
          openUnplannedModal={() =>
            unplanned(L || [], A || []).length
              ? setSelectUnplannedModalOpen(true)
              : setCreateUnplannedModalOpen(true)
          }
        />
      ) : (
        <ui.Div>
          <ui.Button onClick={() => setOpenListId()}>Lists</ui.Button>
          <Lists
            lists={L || []}
            activities={A || []}
            openListId={openListId!}
          />
        </ui.Div>
      )}
      <SelectUnplannedActivityModal
        show={selectUnplannedModalOpen}
        close={() => setSelectUnplannedModalOpen(false)}
        activities={unplanned(L || [], A || [])}
        createNewActivity={() => {
          setSelectUnplannedModalOpen(false)
          setCreateUnplannedModalOpen(true)
        }}
      />
      <EditActivityModal
        show={createUnplannedModalOpen}
        close={() => setCreateUnplannedModalOpen(false)}
      />
    </ui.Div>
  )
}

export default PortraitApp
