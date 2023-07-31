import React from 'react'
import { useUIContext } from '../contexts'
import useCharacterGoals from '../hooks/characters/useCharacterGoals'
import useActivities from '../hooks/activities/useActivities'
import { Goal } from 'common/selectors'
import { CharacterGoal } from 'common'

interface Props {
  openGoalModal: (id: number) => void
}

const Decoration = ({
  id,
  icon,
  name,
  onClick
}: CharacterGoal & { onClick: () => void }) => {
  const ui = useUIContext()

  const tooltip = (props: any) => (
    <ui.Tooltip id={`decoration-tooltip-${id}`} {...props}>
      <ui.Card bg='dark' style={{ color: 'white' }}>
        <ui.CardBody style={{ color: 'white', padding: '3px' }}>
          {name}
        </ui.CardBody>
      </ui.Card>
    </ui.Tooltip>
  )

  return (
    <ui.OverlayTrigger overlay={tooltip} placement='right'>
      <ui.Icon name={icon} size={30} onClick={onClick} />
    </ui.OverlayTrigger>
  )
}

const Decorations = ({ openGoalModal }: Props) => {
  const ui = useUIContext()
  const { data: goals, isFetching: CGFetching } = useCharacterGoals()
  const { data: activities, isFetching: AFetching } = useActivities()
  const isFetching = CGFetching || AFetching
  const decorations = Goal.complete(goals || [], activities || [])

  return !!decorations.length ? (
    <ui.Div style={{ display: 'flex' }}>
      {isFetching ? (
        <ui.Spinner />
      ) : (
        decorations?.map((decoration) => (
          <Decoration
            {...decoration}
            onClick={() => openGoalModal(decoration.goalId)}
          />
        ))
      )}
    </ui.Div>
  ) : null
}

export default Decorations
