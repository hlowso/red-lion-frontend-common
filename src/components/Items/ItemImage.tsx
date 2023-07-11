import React from 'react'
import { useUIContext } from '../../contexts'

interface Props {
  src: string
  scale?: number
}

const RATIO = { W: 87, H: 70 }

const ItemImage = ({ src, scale = 1 }: Props) => {
  const { Image } = useUIContext()
  const style = {
    width: `${scale * RATIO.W}px`,
    height: `${scale * RATIO.H}px`
  }
  return <Image src={src} style={style} rounded />
}

export default ItemImage
