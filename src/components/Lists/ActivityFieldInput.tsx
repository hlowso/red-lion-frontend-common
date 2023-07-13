import React from 'react'
import { ActivityField } from 'common'
import { useUIContext } from '../../contexts'

interface Props extends ActivityField {
  setValue: (value: number) => void
  value?: number
}

const InputSwitch = ({
  kind,
  options,
  setValue,
  value
}: Omit<Props, 'description'>) => {
  const ui = useUIContext()
  switch (kind) {
    case 'radio':
      return (
        <ui.Div>
          {options?.map((option) => (
            <ui.Button
              key={option.value}
              onClick={() => setValue(option.value)}
              variant={
                value === option.value ? 'secondary' : 'outline-secondary'
              }
              style={{ margin: '0 5px 5px 0' }}
            >
              {option.name}
            </ui.Button>
          ))}
        </ui.Div>
      )
  }
}

const ActivityFieldInput = ({ description, ...props }: Props) => {
  const ui = useUIContext()
  return (
    <ui.Div>
      <ui.Span
        style={{
          fontStyle: 'italic',
          color: '#777',
          fontSize: 'small',
          margin: '0 0 5px',
          display: 'block'
        }}
      >
        {description}
      </ui.Span>
      <InputSwitch {...props} />
    </ui.Div>
  )
}

export default ActivityFieldInput
