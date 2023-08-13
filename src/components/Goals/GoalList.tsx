import React, { useContext } from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import useActivities from '../../hooks/activities/useActivities'
import { serveGoal, Goal } from 'common/selectors'
import { CharacterGoal } from 'common'
import { daysUntil } from 'common/util/date'
import { plural } from 'common/util/misc'
import { EditingContext } from '../../contexts/EditingContext'

interface Props {
  goals: CharacterGoal[]
  openGoalModal: (id: number) => void
  style: React.CSSProperties
}

const Days = ({ date }: { date: Date }) => {
  const ui = useUIContext()
  const days = daysUntil(date)

  return (
    <ui.Span
      style={{
        margin: '5px 0 0',
        fontSize: 'small',
        color: '#555',
        cursor: 'default'
      }}
    >
      {plural('day', days)}
    </ui.Span>
  )
}

const GoalList = ({ goals, openGoalModal, style }: Props) => {
  const ui = useUIContext()
  const { gameId, characterId } = usePlayContext()
  const { edit } = useContext(EditingContext)
  const { data: activities, isFetching: AFetching } = useActivities()
  const inProgress = Goal.incomplete(goals, activities || [])

  return inProgress.length ? (
    <ui.Div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {inProgress.map((goal) => (
        <ui.Card
          key={goal.id}
          style={{ margin: '0 0 10px', minWidth: '84px' }}
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
              {goal.targetDate && <Days date={goal.targetDate} />}
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
                      key={a.id}
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
      <ui.Button
        className='rounded-circle'
        onClick={() =>
          edit(
            'New Goal',
            'goal',
            [
              { name: 'name', kind: 'text', label: 'Name' },
              { name: 'description', kind: 'textarea', label: 'Description' },
              { name: 'icon', kind: 'text', label: 'Icon' },
              { name: 'targetDate', kind: 'date', label: 'Target Date' }
            ],
            { gameId, characterId },
            false
          )
        }
      >
        <ui.Icon name='Plus' />
      </ui.Button>
    </ui.Div>
  ) : null
}

export default GoalList
