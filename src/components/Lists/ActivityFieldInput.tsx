import React from 'react'
import { ActivityField } from 'common'
import { useUIContext } from '../../contexts'

interface Props extends ActivityField {
  setValue: (value: number) => void
  value?: number
}

const ActivityFieldInput = ({ kind, options, setValue, value }: Props) => {
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

export default ActivityFieldInput
