import React, { useEffect, useState } from 'react'
import { Util, TimeCard } from 'common'
import { useUIContext } from '../../contexts'

interface Props {
  timeCard: TimeCard
}

const HOURS_TARGET = 6

const msToProgress = (ms: number) =>
  (ms / (HOURS_TARGET * 60 * 60 * 1000)) * 100

const totalTime = (timeCard: TimeCard) =>
  timeCard.clockedTime +
  (timeCard.status === 'out' || !timeCard.lastPunch
    ? 0
    : new Date().getTime() - timeCard.lastPunch.getTime())

const Timer = ({ timeCard }: Props) => {
  const ui = useUIContext()
  const [_, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const total = totalTime(timeCard)
  const progress = msToProgress(total)
  const working = timeCard.status === 'in'

  return (
    <ui.Div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        margin: '0 10px 0 0'
      }}
    >
      <ui.ProgressBar
        progress={progress}
        zone={working ? 'success' : undefined}
        color='primary'
      />
      <ui.Span style={{ color: working ? '#198754' : '#666' }}>
        {Util.Date.duration(total)}
      </ui.Span>
    </ui.Div>
  )
}

export default Timer
