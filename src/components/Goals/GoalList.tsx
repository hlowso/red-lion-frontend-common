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
            <ui.Div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ui.Icon name={goal.icon} size={30} />
              {AFetching ? (
                <ui.Spinner style={{ margin: '5px 0 0' }} />
              ) : (
                <ui.Div
                  style={{
                    margin: '5px 0 0',
                    width: '50px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    justifyItems: 'center'
                  }}
                >
                  {serveGoal(activities || [], goal.goalId).map((a) => (
                    <ui.Icon
                      name={!!a.status.done ? 'StarFill' : 'Star'}
                      size={15}
                    />
                  ))}
                </ui.Div>
              )}
            </ui.Div>
          </ui.CardBody>
        </ui.Card>
      ))}
    </ui.Div>
  )
}

export default GoalList
