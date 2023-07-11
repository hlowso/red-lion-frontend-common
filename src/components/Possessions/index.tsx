import React from 'react'
import Inventory from './Inventory'
import Tallies from './Tallies'
import { useUIContext, useVendorContext } from '../../contexts'

const Possessions = () => {
  const { Div, Accordion, Span } = useUIContext()
  const { shopping } = useVendorContext()
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    right: '30px',
    minWidth: '520px',
    border: 'solid 1px #aaa',
    borderBottom: 'unset',
    zIndex: 2
  }

  return (
    <Accordion style={style} open={shopping}>
      <Span style={{ borderBottom: 'solid 1px #ddd' }}>
        <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Span>Inventory</Span>
          <Tallies />
        </Div>
      </Span>
      <Div>
        <Inventory />
      </Div>
    </Accordion>
  )
}

export default Possessions
