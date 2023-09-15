import React from 'react'
import { useUIContext } from '../../contexts'
import { TimeCardPunchDirection } from 'common'

interface Props {
  direction: TimeCardPunchDirection
  onPunch: () => void
}

const PunchButton = ({ direction, onPunch }: Props) => {
  const ui = useUIContext()
  return (
    <ui.Button
      variant={direction === 'in' ? 'primary' : 'secondary'}
      onClick={onPunch}
      style={{ margin: '0 10px 0 0' }}
    >
      {direction === 'in' ? 'Punch In' : 'Punch Out'}
    </ui.Button>
  )
}

export default PunchButton
