import React from 'react'
import { useUIContext } from '../contexts'
import useCharacterTallyTargets from '../hooks/characters/useCharacterTallyTargets'

const TallyTargets = () => {
  const ui = useUIContext()
  const { data: tallyTargets } = useCharacterTallyTargets()

  return (
    <ui.Div style={{ width: '100%' }}>
      {tallyTargets?.map((target) => (
        <ui.ProgressBar
          key={target.id}
          now={100 * (target.currentValue! / target.value)}
          variant='primary'
        />
      ))}
    </ui.Div>
  )
}

export default TallyTargets
