import React from 'react'
import ItemImage from './ItemImage'
import { Item } from 'common'
import Marked from '../Marked'
import { useUIContext } from '../../contexts'

interface Props {
  item?: Item & {
    count?: number
    open?: () => void
  }
}

type TooltipItemProps = Pick<Item, 'key' | 'name' | 'description' | 'imageUrl'>

const tooltip = ({
  key,
  name,
  description,
  imageUrl,
  ...props
}: TooltipItemProps & any) => {
  const { Card, Div, Strong, Tooltip } = useUIContext()
  return (
    <Tooltip id={`item-tooltip-${key}`} {...props}>
      <Card bg='dark' text='white'>
        <Div style={{ padding: '6px 0px' }}>
          <Div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ItemImage src={imageUrl} scale={0.75} />
            <Div
              style={{
                paddingLeft: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Strong
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                {name}
              </Strong>
            </Div>
          </Div>
        </Div>
        <Div>
          <Marked markdown={description} />
        </Div>
      </Card>
    </Tooltip>
  )
}

const SlotContents = (
  item: Item & {
    count?: number
    open?: () => void
  }
) => {
  const { Div, Badge, OverlayTrigger } = useUIContext()
  const { key, name, description, imageUrl } = item
  return (
    <OverlayTrigger
      overlay={(props) =>
        tooltip({ key, name, description, imageUrl, ...props })
      }
    >
      <Div className='contents'>
        <ItemImage src={item.imageUrl} />
        {item.count && (
          <Badge
            bg='secondary'
            style={{
              position: 'absolute',
              bottom: '1px',
              left: '1px',
              zIndex: 3
            }}
          >
            {item.count}
          </Badge>
        )}
      </Div>
    </OverlayTrigger>
  )
}

const ItemSlot = ({ item }: Props) => {
  const { Div } = useUIContext()
  const style: React.CSSProperties = {
    cursor: !!item?.open ? 'pointer' : undefined,
    position: 'relative',
    height: '70px',
    margin: '2px',
    border: 'solid 1px #ddd'
  }
  return item ? (
    <Div className='rounded' onClick={item.open} style={style}>
      <SlotContents {...item} />
    </Div>
  ) : (
    <Div className='item-slot empty rounded' />
  )
}

export default ItemSlot
