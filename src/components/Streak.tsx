import React from 'react'
import { useUIContext } from '../contexts'

interface Props {
  streak: number
}

const Streak = ({ streak }: Props) => {
  const ui = useUIContext()
  return (
    <ui.Div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 10px 0 0',
        cursor: 'default',
        width: '30px',
        height: '30px'
      }}
    >
      <ui.Icon name='Trophy' size={30} style={{ position: 'absolute' }} />
      <ui.Span style={{ fontSize: 'x-small', transform: 'translateY(-35%)' }}>
        {streak}
      </ui.Span>
    </ui.Div>
  )
}

export default Streak
