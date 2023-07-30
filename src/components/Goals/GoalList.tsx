import React from 'react'
import { useUIContext } from '../../contexts'
import useActivities from '../../hooks/activities/useActivities'
import { serveGoal } from 'common/selectors'
import { CharacterGoal } from 'common'

interface Props {
  goals: CharacterGoal[]
  openGoalModal: (id: number) => void
}

const GoalList = ({ goals, openGoalModal }: Props) => {
  const ui = useUIContext()
  const { data: activities, isFetching: AFetching } = useActivities()

  return (
    <ui.Div style={{ display: 'flex', flexDirection: 'column' }}>
      {(goals || []).map((goal) => (
        <ui.Card
          key={goal.id}
          style={{ margin: '0 0 10px' }}
          onClick={() => openGoalModal(goal.goalId)}
        >
          <ui.CardBody>
            <ui.Icon name={goal.icon} size={30} />
            <ui.Div style={{ display: 'flex' }}>
              {AFetching ? (
                <ui.Spinner />
              ) : (
                serveGoal(activities || [], goal.goalId).map((a) => (
                  <ui.FormCheck
                    label=''
                    onChange={() => {}}
                    checked={!!a.status.done}
                    style={{ pointerEvents: 'none' }}
                  />
                ))
              )}
            </ui.Div>
          </ui.CardBody>
        </ui.Card>
      ))}
    </ui.Div>
  )
}

export default GoalList
