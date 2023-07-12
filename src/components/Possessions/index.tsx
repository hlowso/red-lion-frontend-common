import React from 'react'
import Inventory from './Inventory'
import Tallies from './Tallies'
import { useUIContext, useVendorContext } from '../../contexts'

const Possessions = () => {
  const { Div, Accordion, AccordionHeader, AccordionBody, Span } =
    useUIContext()
  const { shopping } = useVendorContext()
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    right: '20px',
    minWidth: '520px',
    border: 'solid 1px #aaa',
    borderBottom: 'unset',
    zIndex: 2
  }

  return (
    <Accordion style={style} open={shopping}>
      <AccordionHeader>
        <Div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 10px 0 0'
          }}
        >
          <Span>Inventory</Span>
          <Tallies />
        </Div>
      </AccordionHeader>
      <AccordionBody>
        <Inventory />
      </AccordionBody>
    </Accordion>
  )
}

export default Possessions
