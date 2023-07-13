import React, { useContext } from 'react'
import { ActivityField } from 'common'
import { useUIContext } from '../../contexts'
import ActivityFieldInput from './ActivityFieldInput'
import { ActivityCompletionContext } from '../../contexts/ActivityCompletionContext'

interface Props {
  fields: ActivityField[]
}

const ActivityFieldForm = ({ fields }: Props) => {
  const ui = useUIContext()
  const { fieldValues: values, setFieldValue: onValueChange } = useContext(
    ActivityCompletionContext
  )

  return (
    <ui.Card>
      <ui.CardHeader>
        <ui.CardTitle style={{ color: '#555', fontSize: 'smaller', margin: 0 }}>
          Activity Fields
        </ui.CardTitle>
      </ui.CardHeader>
      <ui.CardBody>
        {fields
          ? fields.map((f) => (
              <ActivityFieldInput
                {...f}
                setValue={(value) => onValueChange(f.key, value)}
                value={values.find((fv) => fv.key === f.key)?.value}
              />
            ))
          : null}
      </ui.CardBody>
    </ui.Card>
  )
}

export default ActivityFieldForm
