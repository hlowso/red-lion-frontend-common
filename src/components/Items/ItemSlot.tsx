import React from 'react'
import ItemImage from './ItemImage'
import { Item } from 'common'
import { useUIContext } from '../../contexts'

interface Props {
  item?: Item & {
    count?: number
    open?: () => void
  }
}

type TooltipItemProps = Pick<Item, 'key' | 'name' | 'description' | 'imageUrl'>

const Contents = ({
  imageUrl,
  count
}: {
  imageUrl: string
  count?: number
}) => {
  const { Div, Badge } = useUIContext()
  return (
    <Div className='contents'>
      <ItemImage src={imageUrl} />
      {count && (
        <Badge
          bg='secondary'
          style={{
            position: 'absolute',
            bottom: '1px',
            left: '1px',
            zIndex: 3
          }}
        >
          {count}
        </Badge>
      )}
    </Div>
  )
}

const SlotOverlayTrigger = (
  item: Item & {
    count?: number
    open?: () => void
  }
) => {
  const { OverlayTrigger, Card, Div, Strong, Tooltip, Marked } = useUIContext()
  const { id, name, description, imageUrl, count } = item

  const tooltip = (props: TooltipItemProps & any) => (
    <Tooltip id={`item-tooltip-${id}`} {...props}>
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
          <Marked>{description}</Marked>
        </Div>
      </Card>
    </Tooltip>
  )

  return (
    <OverlayTrigger overlay={tooltip}>
      <Contents imageUrl={imageUrl} count={count} />
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
      <SlotOverlayTrigger {...item} />
    </Div>
  ) : (
    <Div style={style} />
  )
}

export default ItemSlot
