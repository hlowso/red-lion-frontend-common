import React from 'react'
import { useUIContext } from '../../contexts'

interface Props {
  editing: boolean
  edit: () => void
}

const AddEntryButton = ({ editing, edit }: Props) => {
  const ui = useUIContext()
  return editing ? null : (
    <ui.Div>
      <ui.Button onClick={edit}>
        <ui.Icon name='Plus' />
      </ui.Button>
    </ui.Div>
  )
}

export default AddEntryButton
