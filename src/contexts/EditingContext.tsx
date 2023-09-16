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
  edit: (args: {
    formName: string
    resource: EditableResource
    fields: Field[]
    base: any
    isUpdate: boolean
    fieldsToPayload?: (fields: Field[]) => any
  }) => void
  submit: () => Promise<void>
  clear: () => void
  fields: Field[]
  resource?: EditableResource
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
    case 'character-goal':
      if (update) return 'updateCharacterGoal'
      else return 'createCharacterGoal'
    case 'activity':
      if (update) return 'updateActivity'
      else return 'createActivity'
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
  const [fieldsToPayload, setFieldsToPayload] = useState<
    (fields: Field[]) => any
  >(
    () => (fields: Field[]) =>
      fields.reduce((p, f) => ({ ...p, [f.name]: f.value }), {} as any)
  )

  const setValue = (name: string, value: any) =>
    setFields((fields) =>
      fields.map((f) => (f.name === name ? { ...f, value } : f))
    )

  const edit: Context['edit'] = (args) => {
    setFields(args.fields)
    setFormName(args.formName)
    setResource(args.resource)
    setBase(args.base)
    setIsUpdate(args.isUpdate)
    if (args.fieldsToPayload) setFieldsToPayload(() => args.fieldsToPayload)
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

    await fn({ ...base, ...fieldsToPayload(fields) })

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
    fields,
    resource
  }

  return (
    <EditingContext.Provider value={value}>{children}</EditingContext.Provider>
  )
}
