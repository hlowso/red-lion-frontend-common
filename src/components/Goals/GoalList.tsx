import React, { useContext } from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import useActivities from '../../hooks/activities/useActivities'
import * as S from 'common/selectors'
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

const Goal = ({
  goalId,
  targetDate,
  icon,
  openGoalModal
}: CharacterGoal & Omit<Props, 'goals' | 'style'>) => {
  const ui = useUIContext()
  const { data: activities, isFetching: AFetching } = useActivities()

  return (
    <ui.Card
      style={{ margin: '0 0 10px', minWidth: '84px' }}
      onClick={() => openGoalModal(goalId)}
    >
      <ui.CardBody>
        <ui.Div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ui.Icon name={icon} size={30} />
          {targetDate && <Days date={targetDate} />}
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
              {S.serveGoal(activities || [], goalId).map((a) => (
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
  )
}

const GoalList = ({ goals, openGoalModal, style }: Props) => {
  const ui = useUIContext()
  const { gameId, characterId } = usePlayContext()
  const { edit } = useContext(EditingContext)
  const { data: activities } = useActivities()
  const inProgress = S.Goal.incomplete(goals, activities || [])

  return inProgress.length ? (
    <ui.Div style={style}>
      {inProgress.map((goal) => (
        <Goal key={goal.goalId} {...goal} openGoalModal={openGoalModal} />
      ))}
      <ui.Div
        key='new-goal'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ui.Button
          className='rounded-circle'
          variant='outline-secondary'
          onClick={() =>
            edit({
              formName: 'New Goal',
              resource: 'character-goal',
              fields: [
                { name: 'name', kind: 'text', label: 'Name' },
                { name: 'description', kind: 'textarea', label: 'Description' },
                { name: 'icon', kind: 'text', label: 'Icon' },
                { name: 'targetDate', kind: 'date', label: 'Target Date' }
              ],
              base: { gameId, characterId },
              isUpdate: false
            })
          }
        >
          <ui.Icon name='PlusLg' />
        </ui.Button>
      </ui.Div>
      <ui.Div style={{ height: '400px', backgroundColor: 'rgba(0,0,0,0)' }} />
    </ui.Div>
  ) : null
}

export default GoalList
