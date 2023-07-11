import React from 'react'
import Inventory from './Inventory'
import Tallies from './Tallies'
import { useUIContext, useVendorContext } from '../../contexts'

const Possessions = () => {
  const { Div, Accordion, Span } = useUIContext()
  const { shopping } = useVendorContext()

  return (
    <Accordion open={shopping}>
      <Span>
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
