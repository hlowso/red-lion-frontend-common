import React, { useState } from 'react'
import { Delta, Item, Possessions, TallyRow, Util } from 'common'
import ItemImage from './ItemImage'
import Tallies from '../Possessions/Tallies'
import { usePlayContext, useUIContext } from '../../contexts'
import useTallies from '../../hooks/useTallies'
import useItems from '../../hooks/useItems'

interface Props {
  item?: Item
  close: () => void
  purchase: (quantity: number) => void
}

interface FooterProps {
  quantity: number
  setQuantity: (quantity: number) => void
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  affordable: boolean
  purchase: (quantity: number) => void
  close: () => void
}

interface CostProps {
  tallies: TallyRow[]
  items: Item[]
  possessions: Possessions
  quantity: number
  costDelta: Delta
}

const Cost = ({
  tallies,
  items,
  possessions,
  quantity,
  costDelta
}: CostProps) => {
  const { Div, Card, Icon, Span, Strong } = useUIContext()
  const cost = Util.Delta.applyFactorToDelta(quantity, costDelta)
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '5px',
    width: 'fit-content',
    alignItems: 'center'
  }

  return (
    <Div style={{ display: 'flex', justifyContent: 'center' }}>
      {Object.entries(cost.tallies || {}).map(([key, count]) => (
        <Card
          style={{
            ...style,
            opacity:
              -1 * count > (possessions.tallies[key] || 0) ? '0.5' : 'unset'
          }}
        >
          <Icon name={Util.Tally.byKey(tallies, key)?.icon} size={50} />
          <Span style={{ marginTop: '5px' }}>
            <Strong>{-1 * count}</Strong>{' '}
            <Span>{Util.Tally.byKey(tallies, key)?.name}</Span>
          </Span>
        </Card>
      ))}
      {Object.entries(cost.items || {}).map(([key, count]) => (
        <Card
          style={{
            ...style,
            opacity: -1 * count > possessions.items[key] || 0 ? '0.5' : 'unset'
          }}
        >
          <ItemImage src={Util.Item.byKey(items, key)?.imageUrl} scale={0.75} />
          <Span style={{ marginTop: '5px' }}>
            <Strong>{-1 * count}</Strong>{' '}
            <Span>{Util.Item.byKey(items, key)?.name}</Span>
          </Span>
        </Card>
      ))}
    </Div>
  )
}

const Footer = ({
  quantity,
  setQuantity,
  onChange,
  affordable,
  purchase
}: FooterProps) => {
  const { ModalFooter, ButtonGroup, Button, InputGroup, FormControl, Icon } =
    useUIContext()
  const height = 50
  return (
    <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Tallies />
      <InputGroup style={{ width: 'unset' }}>
        <FormControl
          value={quantity}
          onChange={onChange}
          style={{ height: `${height}px`, width: '50px' }}
        />
        <ButtonGroup vertical style={{ height: `${height}px` }}>
          <Button
            className='rounded-0'
            onClick={() => setQuantity(quantity + 1)}
            style={{ height: `${height / 2}px`, padding: '0 10px' }}
          >
            <Icon name='ChevronUp' size={10} />
          </Button>
          <Button
            className='rounded-0'
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ height: `${height / 2}px`, padding: '0 10px' }}
          >
            <Icon name='ChevronDown' size={10} />
          </Button>
        </ButtonGroup>
        <Button
          disabled={!affordable || !quantity}
          onClick={() => purchase(quantity)}
          variant='primary'
          style={{ height: `${height}px` }}
        >
          Buy
        </Button>
      </InputGroup>
    </ModalFooter>
  )
}

const PurchaseItemModal = ({ item, purchase, close }: Props) => {
  const { Modal, ModalHeader, ModalBody, Div, Spinner, Marked, Strong } =
    useUIContext()
  const { possessions, isLoading: contextIsLoading } = usePlayContext()
  const { data: tallies, isLoading: talliesAreLoading } = useTallies()
  const { data: items, isLoading: itemsAreLoading } = useItems()
  const [quantity, setQuantity] = useState(1)
  const affordable =
    !!item &&
    Util.Character.canAffordItem(possessions!, item.costDelta, quantity)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const text = ev.target.value
    const value = Number(text)
    if (Number.isInteger(value) && value >= 1) {
      setQuantity(Number(text))
    }
  }

  return !!item && !contextIsLoading ? (
    <Modal show={!!item} onHide={close}>
      <ModalHeader>
        <Div style={{ display: 'flex' }}>
          <ItemImage src={item.imageUrl} scale={1.25} />
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
              {item.name}
            </Strong>
          </Div>
        </Div>
      </ModalHeader>
      <ModalBody>
        <Marked>{item?.description || ''}</Marked>
        {contextIsLoading || talliesAreLoading || itemsAreLoading ? (
          <Spinner />
        ) : (
          <Cost
            tallies={tallies!}
            items={items!}
            possessions={possessions!}
            quantity={quantity}
            costDelta={item.costDelta}
          />
        )}
      </ModalBody>
      <Footer
        quantity={quantity}
        setQuantity={setQuantity}
        onChange={onChange}
        affordable={affordable}
        purchase={purchase}
        close={close}
      />
    </Modal>
  ) : null
}

export default PurchaseItemModal
