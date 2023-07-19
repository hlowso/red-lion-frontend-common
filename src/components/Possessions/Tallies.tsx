import React from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import useTallies from '../../hooks/useTallies'

interface TallyProps {
  icon: string
  count: number
}

const Tally = ({ icon, count }: TallyProps) => {
  const ui = useUIContext()
  return (
    <ui.Span>
      <ui.Icon name={icon} /> {count}
    </ui.Span>
  )
}

const Tallies = () => {
  const { Badge, Spinner } = useUIContext()
  const {
    tallies: characterTallies,
    isLoading: contextLoading,
    isFetching
  } = usePlayContext()
  const { data: tallies, isLoading: talliesLoading } = useTallies()
  const isLoading = contextLoading || talliesLoading || isFetching

  return isLoading ? (
    <Spinner small />
  ) : (
    <Badge
      bg='secondary'
      style={{
        width: `${40 * (tallies?.length || 0)}px`,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      {tallies?.map((tally) => (
        <Tally
          key={tally.id}
          icon={tally.icon}
          count={(characterTallies || {})[tally.key] || 0}
        />
      ))}
    </Badge>
  )
}

export default Tallies
