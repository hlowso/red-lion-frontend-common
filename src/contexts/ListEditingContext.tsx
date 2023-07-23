import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from 'react'
import { usePlayContext } from './PlayContext'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext } from './RequestsContext'

interface Context {
  isRequesting: boolean
  canCreate: boolean
  create: () => Promise<void>
  onNameChange: (ev: React.ChangeEvent<{ value: string }>) => void
  onDescriptionChange: (ev: React.ChangeEvent<{ value: string }>) => void
  name: string
  description: string
}

export const ListEditingContext = createContext<Context>({
  isRequesting: false,
  canCreate: false,
  create: async () => {},
  onNameChange: () => {},
  onDescriptionChange: () => {},
  name: '',
  description: ''
})

export const ListEditingProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const Requests = useContext(RequestsContext)
  const {
    gameId,
    isLoading: contextLoading,
    isFetching: contextFetching
  } = usePlayContext()
  const [isRequesting, setIsRequesting] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const canCreate =
    !!gameId && !isRequesting && !contextLoading && !contextFetching && !!name

  const onNameChange = (ev: React.ChangeEvent<{ value: string }>) => {
    setName(ev.target.value)
  }

  const onDescriptionChange = (ev: React.ChangeEvent<{ value: string }>) => {
    setDescription(ev.target.value)
  }

  const create = async () => {
    if (!canCreate) throw 'Cannot create List right now'

    setIsRequesting(true)
    await Requests.createList({
      gameId: gameId!,
      name,
      description,
      hidden: false
    })
    setIsRequesting(false)
    queryClient.invalidateQueries({ queryKey: ['games', gameId] })
  }

  const value: Context = {
    isRequesting,
    canCreate,
    create,
    onNameChange,
    onDescriptionChange,
    name,
    description
  }
  return (
    <ListEditingContext.Provider value={value}>
      {children}
    </ListEditingContext.Provider>
  )
}
