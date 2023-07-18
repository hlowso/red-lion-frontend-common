import React, { PropsWithChildren } from 'react'
import { useUIContext } from '../contexts'
import useCharacterTallyTargets from '../hooks/characters/useCharacterTallyTargets'
import { CharacterTallyTarget } from 'common'

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
      <ui.Icon name={tallyIcon!} style={{ margin: '0 5px 0 0' }} />
      <ui.Span>
        {Math.round((currentValue || 0) / value)}% ({currentValue} / {value})
      </ui.Span>
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
        <ProgressOverlayTrigger {...target}>
          <ui.ProgressBar
            key={target.id}
            now={100 * (target.currentValue! / target.value)}
            variant={target.color}
            style={{ margin: '0 0 10px' }}
          />
        </ProgressOverlayTrigger>
      ))}
    </ui.Div>
  )
}

export default TallyTargets
