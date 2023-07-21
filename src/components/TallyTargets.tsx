import React, { PropsWithChildren } from 'react'
import { useUIContext } from '../contexts'
import useCharacterTallyTargets from '../hooks/characters/useCharacterTallyTargets'
import { CharacterTallyTarget } from 'common'

const getZone = (current: number, value: number) => {
  if (current < 0) return 'danger'
  if (current >= 2 * value) return 'glory'
  if (current >= value) return 'success'

  return undefined
}

const ProgressOverlayTrigger = ({
  id,
  currentValue,
  value,
  tallyIcon,
  children
}: PropsWithChildren<CharacterTallyTarget>) => {
  const ui = useUIContext()
  const tooltip = (props: any) => (
    <ui.Tooltip id={`target-tooltip-${id}`} {...props}>
      <ui.Div style={{ display: 'flex', alignItems: 'center' }}>
        <ui.Icon
          name={tallyIcon!}
          style={{ margin: '0 10px 0 0', fontSize: 'x-large' }}
        />
        <ui.Div style={{ display: 'flex', flexDirection: 'column' }}>
          <ui.Span>{Math.round(100 * ((currentValue || 0) / value))}%</ui.Span>
          <ui.Span style={{ fontSize: 'x-small' }}>
            {currentValue} / {value}
          </ui.Span>
        </ui.Div>
      </ui.Div>
    </ui.Tooltip>
  )

  return (
    <ui.OverlayTrigger overlay={tooltip} placement='bottom'>
      {children}
    </ui.OverlayTrigger>
  )
}

const TallyTargets = () => {
  const ui = useUIContext()
  const { data: tallyTargets } = useCharacterTallyTargets()

  return (
    <ui.Div style={{ width: '100%' }}>
      {tallyTargets?.map((target) => (
        <ProgressOverlayTrigger key={target.id} {...target}>
          <ui.ProgressBar
            key={target.id}
            progress={
              target.currentValue! < 2 * target.value
                ? (100 * (target.currentValue! / target.value)) % 100
                : 100
            }
            color={target.color}
            zone={getZone(target.currentValue!, target.value)}
            style={{ margin: '0 0 7px' }}
          />
        </ProgressOverlayTrigger>
      ))}
    </ui.Div>
  )
}

export default TallyTargets
