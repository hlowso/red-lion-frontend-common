import React from 'react'
import { useUIContext } from '../contexts'
import { Delta, Formula, Util } from 'common'
import ItemImage from './Items/ItemImage'
import useTallies from '../hooks/useTallies'
import useItems from '../hooks/useItems'
import { UI } from '../types/ui-components'

interface Props extends UI.BaseProps {
  delta: Delta
  fadedItems?: string[]
  fadedTallies?: string[]
  flipSigns?: boolean
}

interface ChangeProps {
  name: string
  change: number | Formula
  flipSigns: boolean
}

const Change = ({ name, change, flipSigns }: ChangeProps) => {
  const ui = useUIContext()
  const tooltip = (props) => (
    <ui.Tooltip {...props}>{(change as Formula).expression}</ui.Tooltip>
  )
  return (
    <ui.OverlayTrigger overlay={tooltip} disabled={typeof change === 'number'}>
      <ui.Div style={{ cursor: 'default' }}>
        <ui.Strong>
          {typeof change === 'object' ? 'Fn' : flipSigns ? -1 * change : change}{' '}
        </ui.Strong>{' '}
        <ui.Span>{name}</ui.Span>
      </ui.Div>
    </ui.OverlayTrigger>
  )
}

const Delta = ({
  delta,
  fadedTallies,
  fadedItems,
  flipSigns = false,
  ...props
}: Props) => {
  const ui = useUIContext()
  const { data: tallies } = useTallies()
  const { data: items } = useItems()

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '0 5px 0 0',
    width: 'fit-content',
    alignItems: 'center'
  }

  return (
    <ui.Div {...props} style={{ display: 'flex', ...(props?.style || {}) }}>
      {Object.entries(delta.tallies || {}).map(([key, change]) => (
        <ui.Card
          style={{
            ...style,
            opacity: fadedTallies?.includes(key) ? 0.5 : 'unset'
          }}
        >
          <ui.Icon
            name={Util.Tally.byKey(tallies || [], key)?.icon}
            size={40}
          />
          <ui.Span style={{ marginTop: '5px', display: 'flex' }}>
            <Change
              name={Util.Tally.byKey(tallies || [], key)?.name}
              change={change}
              flipSigns={flipSigns}
            />{' '}
          </ui.Span>
        </ui.Card>
      ))}
      {Object.entries(delta.items || {}).map(([key, change]) => (
        <ui.Card
          style={{
            ...style,
            opacity: fadedItems?.includes(key) ? 0.5 : 'unset'
          }}
        >
          <ItemImage
            src={Util.Item.byKey(items || [], key)?.imageUrl}
            scale={0.75}
          />
          <ui.Span style={{ marginTop: '5px' }}>
            <Change
              name={Util.Item.byKey(items || [], key)?.name}
              change={change}
              flipSigns={flipSigns}
            />{' '}
          </ui.Span>
        </ui.Card>
      ))}
    </ui.Div>
  )
}

export default Delta
