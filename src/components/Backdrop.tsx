import React from 'react'
import { useUIContext } from '../contexts'

interface Props {
  onClick?: () => void
}

const Backdrop = ({ onClick }: Props) => {
  const { Div } = useUIContext()
  const style: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 1
  }
  return <Div onClick={onClick} style={style} />
}

export default Backdrop
