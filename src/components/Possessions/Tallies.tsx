import React from 'react'
import Icon, { IconName } from '../Icon'
import { usePlayContext, useUIContext } from '../../contexts'
import useTallies from '../../hooks/useTallies'

interface TallyProps {
  icon: IconName
  count: number
}

const Tally = ({ icon, count }: TallyProps) => {
  return (
    <span>
      <Icon iconName={icon} /> {count}
    </span>
  )
}

const Tallies = () => {
  const { Badge, Spinner } = useUIContext()
  const {
    gameId,
    tallies: characterTallies,
    isLoading: contextLoading
  } = usePlayContext()
  const { data: tallies, isLoading: talliesLoading } = useTallies(
    { gameId },
    !!gameId
  )
  const isLoading = contextLoading || talliesLoading

  return (
    <Badge bg='secondary'>
      {isLoading ? (
        <Spinner small />
      ) : (
        tallies?.map((tally) => (
          <Tally
            key={tally.id}
            icon={tally.icon as IconName}
            count={(characterTallies || {})[tally.key] || 0}
          />
        ))
      )}
    </Badge>
  )
}

export default Tallies
