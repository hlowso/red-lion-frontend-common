import React, { useContext } from 'react'
import { RequestsContext, useUIContext } from '../../contexts'
import useCharacterTimeCard from '../../hooks/characters/useCharacterTimeCard'
import { TimeCard } from 'common'
import Timer from './Timer'
import PunchButton from './PunchButton'
import { useQueryClient } from '@tanstack/react-query'
import useCharacterTimeCardStreak from '../../hooks/characters/useCharacterTimeCardStreak'
import Streak from '../Streak'

interface Props {
  timeCardId: number
}

const TimeCard = ({ timeCardId }: Props) => {
  const ui = useUIContext()
  const R = useContext(RequestsContext)
  const queryClient = useQueryClient()
  const { data: timeCard } = useCharacterTimeCard(timeCardId)
  const { data: timeCardStreak } = useCharacterTimeCardStreak(timeCardId)

  if (!timeCard) {
    return <ui.Spinner />
  }

  const onPunch = async () => {
    await R.punchTimeCard({ id: timeCard.characterId, timeCardId })
    queryClient.invalidateQueries(['games'])
  }

  return (
    <ui.Card
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '8px',
        margin: '0 0 10px 0'
      }}
    >
      <Timer timeCard={timeCard} />
      <PunchButton
        direction={timeCard.status === 'in' ? 'out' : 'in'}
        onPunch={onPunch}
      />
      <Streak streak={timeCardStreak || 0} />
    </ui.Card>
  )
}

export default TimeCard
