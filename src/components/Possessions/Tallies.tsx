import React from 'react'
import { usePlayContext, useUIContext } from '../../contexts'
import useTallies from '../../hooks/useTallies'

interface TallyProps {
  icon: string
  color?: string
  count: number
}

const getColor = (color?: string) => {
  switch (color) {
    case 'warning':
      return '#ffc107'
    case 'info':
      return '#0dcaf0'
    case 'primary':
      return '#0d6efd'
    default:
      return color
  }
}

const Tally = ({ icon, color, count }: TallyProps) => {
  const ui = useUIContext()
  return (
    <ui.Span>
      <ui.Icon name={icon} style={{ color: getColor(color) }} /> {count}
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
          color={tally.color}
          count={(characterTallies || {})[tally.key] || 0}
        />
      ))}
    </Badge>
  )
}

export default Tallies
