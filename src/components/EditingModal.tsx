import React, { useContext } from 'react'
import { Util } from 'common'
import { useUIContext } from '../contexts'
import { EditingContext, Field } from '../contexts/EditingContext'

const groupStyle = { margin: '0 0 10px' }

interface FieldProps {
  field: Field
  onChange: (value: string) => void
}

const TextField = ({ field, onChange }: FieldProps) => {
  const ui = useUIContext()
  return (
    <ui.InputGroup style={groupStyle}>
      <ui.InputGroupText>{field.label}</ui.InputGroupText>
      <ui.FormControl
        value={field.value}
        onChange={(ev) => onChange(ev.target.value)}
      />
    </ui.InputGroup>
  )
}

const TextareaField = ({ field, onChange }: FieldProps) => {
  const ui = useUIContext()
  return (
    <ui.InputGroup style={groupStyle}>
      <ui.InputGroupText>{field.label}</ui.InputGroupText>
      <ui.FormControl
        as='textarea'
        value={field.value}
        onChange={(ev) => onChange(ev.target.value)}
      />
    </ui.InputGroup>
  )
}

const CheckboxField = ({ field, onChange }: FieldProps) => {
  const ui = useUIContext()
  return (
    <ui.FormCheck
      label={field.label}
      checked={!!field.value}
      onChange={(ev) => onChange(ev.target.value)}
    />
  )
}

const DateField = ({ field, onChange }: FieldProps) => {
  const ui = useUIContext()
  return (
    <ui.InputGroup style={groupStyle}>
      <ui.InputGroupText>{field.label}</ui.InputGroupText>
      <ui.FormControl
        type='date'
        value={Util.Date.dateString(
          field.value ? new Date(field.value as string) : new Date()
        )}
        onChange={(ev) => onChange(ev.target.value)}
      />
    </ui.InputGroup>
  )
}

const Field = ({ field, onChange }: FieldProps) => {
  switch (field.kind) {
    case 'text':
      return <TextField field={field} onChange={onChange} />
    case 'textarea':
      return <TextareaField field={field} onChange={onChange} />
    case 'checkbox':
      return <CheckboxField field={field} onChange={onChange} />
    case 'date':
      return <DateField field={field} onChange={onChange} />
  }
}

const EditingModal = () => {
  const ui = useUIContext()
  const {
    formName,
    isEditing,
    isSubmitting,
    canSubmit,
    submitLabel,
    setValue,
    submit,
    clear,
    fields
  } = useContext(EditingContext)

  const onChange = (name: string, kind: Field['kind'], value: any) => {
    switch (kind) {
      case 'text':
      case 'textarea':
        return setValue(name, value)
      case 'checkbox':
        return setValue(name, !value)
      case 'date':
        return setValue(name, new Date(value))
    }
  }

  return (
    <ui.Modal show={isEditing} onHide={clear}>
      <ui.ModalHeader>{formName}</ui.ModalHeader>
      <ui.ModalBody>
        {isSubmitting ? (
          <ui.Div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <ui.Spinner />
          </ui.Div>
        ) : (
          <ui.Div>
            {fields.map((f) => (
              <Field
                key={`field-${f.name}`}
                field={f}
                onChange={(value: string) => onChange(f.name, f.kind, value)}
              />
            ))}
          </ui.Div>
        )}
      </ui.ModalBody>
      <ui.ModalFooter>
        <ui.Button variant='success' disabled={!canSubmit} onClick={submit}>
          {submitLabel}
        </ui.Button>
      </ui.ModalFooter>
    </ui.Modal>
  )
}

export default EditingModal
