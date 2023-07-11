import React from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import useTallies from '../../hooks/useTallies'

interface TallyProps {
  icon: string
  count: number
}

const Tally = ({ icon, count }: TallyProps) => {
  const { Icon } = useUIContext()
  return (
    <span>
      <Icon name={icon} /> {count}
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
            icon={tally.icon}
            count={(characterTallies || {})[tally.key] || 0}
          />
        ))
      )}
    </Badge>
  )
}

export default Tallies
