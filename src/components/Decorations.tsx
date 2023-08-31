import React from 'react'
import { useUIContext } from '../contexts'
import useCharacterGoals from '../hooks/characters/useCharacterGoals'
import useActivities from '../hooks/activities/useActivities'
import useCharacterLongestStreaks from '../hooks/characters/useCharacterLongestStreaks'
import { Goal } from 'common/selectors'
import { CharacterGoal } from 'common'

interface Props {
  openGoalModal: (id: number) => void
}

interface DecorationProps {
  goalId?: number
  id: number | string
  icon: string
  name: string
  onClick: () => void
}

const Decoration = ({ id, icon, name, onClick }: DecorationProps) => {
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
    <ui.Div style={{ margin: '0 5px 0 0' }}>
      <ui.OverlayTrigger overlay={tooltip} placement='right'>
        <ui.Icon name={icon} size={30} onClick={onClick} />
      </ui.OverlayTrigger>
    </ui.Div>
  )
}

const Decorations = ({ openGoalModal }: Props) => {
  const ui = useUIContext()
  const { data: goals, isFetching: CGFetching } = useCharacterGoals()
  const { data: activities, isFetching: AFetching } = useActivities()
  const { data: streaks, isFetching: LSFetching } = useCharacterLongestStreaks()
  const isFetching = CGFetching || AFetching || LSFetching

  const goaldecs = Goal.complete(goals || [], activities || [])
  const streakdecs = (streaks || [])
    .filter((s) => s.streak >= 50)
    .map((s) => ({
      id: `streak-${s.activityId}`,
      name: s.antistreak ? `Don't ${s.activityName}` : s.activityName + ' x50',
      icon: 'Trophy'
    }))

  const decorations: DecorationProps[] = [
    ...goaldecs.map((g) => ({ ...g, onClick: () => openGoalModal(g.goalId) })),
    ...streakdecs.map((s) => ({ ...s, onClick: () => {} }))
  ]

  return !!decorations.length ? (
    <ui.Div style={{ display: 'flex' }}>
      {isFetching ? (
        <ui.Spinner />
      ) : (
        decorations.map((decoration, idx) => (
          <Decoration key={`decoration-${idx}`} {...decoration} />
        ))
      )}
    </ui.Div>
  ) : null
}

export default Decorations
