import { Delta } from 'common'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'
import { usePlayContext } from './PlayContext'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext } from './RequestsContext'
import useTallies from '../hooks/useTallies'
import useLists from '../hooks/useLists'
import { Util } from 'common'

interface Props extends PropsWithChildren {
  listId?: number
}

interface Context {
  isCreating: boolean
  createActivity: () => Promise<void>
  canCreate: boolean
  name?: string
  onNameChange: (ev: React.ChangeEvent<{ value: string }>) => void
  tallyKey?: string
  onTallyChange: (ev: React.ChangeEvent<{ value: string }>) => void
  description?: string
  onDescriptionChange: (ev: React.ChangeEvent<{ value: string }>) => void
  direction?: 1 | -1
  setDirection: (d: 1 | -1) => void
  significance?: 1 | 2 | 3
  setSignificance: (d: 1 | 2 | 3) => void
}

export const ActivityCreationContext = createContext<Context>({
  isCreating: false,
  createActivity: async () => {},
  canCreate: false,
  onNameChange: () => {},
  onTallyChange: () => {},
  onDescriptionChange: () => {},
  setDirection: () => {},
  setSignificance: () => {}
})

export const ActivityCreationProvider = ({ children, listId }: Props) => {
  const Requests = useContext(RequestsContext)
  const queryClient = useQueryClient()
  const { gameId, characterId } = usePlayContext()
  const { data: tallies } = useTallies()
  const { data: lists } = useLists()
  const [isCreating, setIsCreating] = useState(false)
  const [tallyKey, setTallyKey] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [direction, setDirection] = useState<1 | -1>(1)
  const [significance, setSignificance] = useState<1 | 2 | 3>(1)

  useEffect(() => {
    if (tallies) {
      setTallyKey(tallies[0]?.key)
    }
  }, [tallies?.length])

  const canCreate = !!name && !!direction && !!significance

  const onTallyChange = (ev: React.ChangeEvent<{ value: string }>) => {
    setTallyKey(ev.target.value)
  }

  const onNameChange = (ev: React.ChangeEvent<{ value: string }>) => {
    // TODO validate name
    setName(ev.target.value)
  }

  const onDescriptionChange = (ev: React.ChangeEvent<{ value: string }>) => {
    // TODO validate description
    setDescription(ev.target.value)
  }

  // TODO: add dynamic fields...

  const createActivity = async () => {
    const expression = `${direction} * randomInt(${significance}, ${significance} ^ 3)`
    const completionDelta: Delta = {
      tallies: {
        [tallyKey]: {
          expression,
          variables: []
        }
      }
    }
    setIsCreating(true)
    await Requests.createActivity({
      name,
      description,
      completionDelta,
      schedule: null,
      fields: null,
      count: 1,
      fieldValues: null,
      listId: listId || Util.List.unplannedList(lists || [])?.id || -1,
      logCompletionOnCreate: listId
        ? undefined
        : {
            subjectId: characterId || -1,
            subjectType: 'character'
          }
    })
    setIsCreating(false)
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })
  }

  const value = {
    createActivity,
    isCreating,
    canCreate,
    name,
    onNameChange,
    tallyKey,
    onTallyChange,
    description,
    onDescriptionChange,
    direction,
    setDirection,
    significance,
    setSignificance
  }

  return (
    <ActivityCreationContext.Provider value={value}>
      {children}
    </ActivityCreationContext.Provider>
  )
}
