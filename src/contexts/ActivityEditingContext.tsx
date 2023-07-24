import { ActivityPostParams, Delta } from 'common'
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
import useActivities from '../hooks/activities/useActivities'

interface Props extends PropsWithChildren {
  listId?: number
  activityId?: number
}

interface Context {
  edition: boolean
  creation: boolean
  isCreating: boolean
  isUpdating: boolean
  isRequesting: boolean
  createActivity: () => Promise<void>
  updateActivity: (args?: Partial<ActivityPostParams>) => Promise<void>
  canCreate: boolean
  canUpdate: boolean
  listId?: number
  setListId: (listId: number) => void
  name?: string
  onNameChange: (ev: React.ChangeEvent<{ value: string }>) => void
  tallyKey?: string
  onTallyChange: (ev: React.ChangeEvent<{ value: string }>) => void
  description?: string
  onDescriptionChange: (ev: React.ChangeEvent<{ value: string }>) => void
  hasCount: boolean
  setHasCount: (hasState: boolean) => void
  count?: number
  onCountChange: (ev: React.ChangeEvent<{ value: number }>) => void
  schedule?: string
  onScheduleChange: (ev: React.ChangeEvent<{ value: string }>) => void
  setSchedule: (schedule: string) => void
  direction?: 1 | -1
  setDirection: (d: 1 | -1) => void
  significance?: 1 | 2 | 3
  setSignificance: (d: 1 | 2 | 3) => void
}

export const ActivityEditingContext = createContext<Context>({
  edition: false,
  creation: true,
  isCreating: false,
  isUpdating: false,
  isRequesting: false,
  createActivity: async () => {},
  updateActivity: async () => {},
  canCreate: false,
  canUpdate: false,
  setListId: () => {},
  onNameChange: () => {},
  onTallyChange: () => {},
  onDescriptionChange: () => {},
  hasCount: false,
  setHasCount: () => {},
  onCountChange: () => {},
  onScheduleChange: () => {},
  setSchedule: () => {},
  setDirection: () => {},
  setSignificance: () => {}
})

export const ActivityEditingProvider = ({ children, ...props }: Props) => {
  const Requests = useContext(RequestsContext)
  const queryClient = useQueryClient()
  const { gameId, userId, characterId } = usePlayContext()
  const { data: tallies } = useTallies()
  const { data: lists } = useLists()
  const { data: activities } = useActivities()
  const activity = activities?.find((a) => a.id === props.activityId)
  const [isRequesting, setIsRequesting] = useState(false)
  const [tallyKey, setTallyKey] = useState('')
  const [listId, setListId] = useState(props.listId)
  const [name, setName] = useState(activity?.name || '')
  const [description, setDescription] = useState(activity?.description || '')
  const [hasCount, setHasCount] = useState(!!activity?.count)
  const [count, setCount] = useState(activity?.count)
  const [schedule, setSchedule] = useState(activity?.schedule)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [significance, setSignificance] = useState<1 | 2 | 3>(1)
  const canCreate = !!name && !!direction && !!significance && !isRequesting

  useEffect(() => {
    if (tallies) {
      setTallyKey(tallies[0]?.key)
    }
  }, [tallies?.length])

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

  const onCountChange = (ev: React.ChangeEvent<{ value: number }>) => {
    const n = Number(ev.target.value)
    if (Number.isInteger(n) && n > 0) setCount(n)
  }

  const onScheduleChange = (ev: React.ChangeEvent<{ value: string }>) => {
    // TODO validate count
    setSchedule(ev.target.value)
  }

  // TODO: add dynamic fields...

  const upsert = async (args?: ActivityPostParams) => {
    const expression = `${direction} * randomInt(${significance}, ${significance} ^ 3)`
    const completionDelta: Delta = {
      tallies: {
        [tallyKey]: {
          expression,
          variables: []
        }
      }
    }
    setIsRequesting(true)

    const params = {
      name,
      description,
      completionDelta,
      schedule,
      fields: null,
      count: hasCount ? count : null,
      fieldValues: null,
      listId: listId || Util.List.unplannedList(lists || [])?.id!,
      logCompletionOnCreate:
        activity || listId
          ? undefined
          : {
              subjectId: characterId!,
              subjectType: 'character'
            },
      ...args
    } as ActivityPostParams

    const result = props.activityId
      ? await Requests.updateActivity({ id: props.activityId, ...params })
      : await Requests.createActivity(params)

    setIsRequesting(false)
    queryClient.invalidateQueries({
      queryKey: ['games', gameId, 'users', userId, 'characters']
    })
    queryClient.invalidateQueries({
      queryKey: [
        'games',
        gameId,
        'lists',
        undefined,
        'characters',
        characterId,
        'activities'
      ]
    })
  }

  const value = {
    edition: !!activity,
    creation: !activity,
    createActivity: () => upsert(),
    updateActivity: (args) => upsert(args),
    isCreating: !activity && isRequesting,
    isUpdating: !!activity && isRequesting,
    isRequesting,
    canCreate,
    canUpdate: canCreate,
    listId,
    setListId,
    name,
    onNameChange,
    tallyKey,
    onTallyChange,
    description,
    onDescriptionChange,
    hasCount,
    setHasCount,
    count,
    onCountChange,
    schedule,
    onScheduleChange,
    setSchedule,
    direction,
    setDirection,
    significance,
    setSignificance
  }

  return (
    <ActivityEditingContext.Provider value={value}>
      {children}
    </ActivityEditingContext.Provider>
  )
}
