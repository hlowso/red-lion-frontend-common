import { EditableResource } from 'common'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'
import { Requests } from '../requests'
import { RequestsContext } from './RequestsContext'
import { useQueryClient } from '@tanstack/react-query'

interface Context {
  formName: string
  isEditing: boolean
  isSubmitting: boolean
  canSubmit: boolean
  submitLabel: string
  setValue: (name: string, value: any) => void
  edit: (
    formName: string,
    resource: EditableResource,
    fields: Field[],
    base: any,
    isUpdate: boolean
  ) => void
  submit: () => Promise<void>
  clear: () => void
  fields: Field[]
}

interface FieldBase {
  kind: 'text' | 'textarea' | 'checkbox' | 'date'
  name: string
  label: string
}

interface TextField extends FieldBase {
  kind: 'text' | 'textarea'
  value?: string
}

interface CheckboxField extends FieldBase {
  kind: 'checkbox'
  value?: boolean
}

interface DateField extends FieldBase {
  kind: 'date'
  value?: Date
}

export type Field = TextField | CheckboxField | DateField

const getRequestName = (
  resource: EditableResource,
  update = false
): keyof Requests => {
  switch (resource) {
    case 'list':
      if (update) return 'updateCharacterList'
      else return 'createList'
    case 'goal':
      if (update) return 'createCharacterGoal'
      else return 'createCharacterGoal'
  }
}

export const EditingContext = createContext<Context>({
  formName: '',
  isEditing: false,
  isSubmitting: false,
  canSubmit: false,
  submitLabel: '',
  setValue: () => {},
  edit: () => {},
  submit: async () => {},
  clear: () => {},
  fields: []
})

export const EditingProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const Requests = useContext(RequestsContext)
  const [formName, setFormName] = useState('')
  const [resource, setResource] = useState<EditableResource>()
  const [base, setBase] = useState<any>({})
  const [isUpdate, setIsUpdate] = useState(!!base.id)
  const [fields, setFields] = useState<Field[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = (name: string, value: any) =>
    setFields((fields) =>
      fields.map((f) => (f.name === name ? { ...f, value } : f))
    )

  const edit: Context['edit'] = (
    formName,
    resource,
    fields,
    base,
    isUpdate
  ) => {
    setFields(fields)
    setFormName(formName)
    setResource(resource)
    setBase(base)
    setIsUpdate(isUpdate)
  }

  const clear = () => {
    setFormName('')
    setResource(undefined)
    setBase({})
    setFields([])
  }

  const submit = async () => {
    setIsSubmitting(true)

    const fn = Requests[getRequestName(resource!, isUpdate)] as (
      payload: any
    ) => Promise<void>
    const payload: any = { id: base.id }

    for (let field of fields) payload[field.name] = field.value
    await fn({ ...base, ...payload })

    setIsSubmitting(false)
    queryClient.invalidateQueries()
    clear()
  }

  const value: Context = {
    formName,
    isEditing: !!resource,
    isSubmitting,
    canSubmit: !!resource,
    submitLabel: isUpdate ? 'Edit' : 'Create',
    setValue,
    edit,
    submit,
    clear,
    fields
  }

  return (
    <EditingContext.Provider value={value}>{children}</EditingContext.Provider>
  )
}
