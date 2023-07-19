import { ActivityRow, FormulaContextValue } from 'common'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { usePlayContext } from './PlayContext'
import { useQueryClient } from '@tanstack/react-query'
import { RequestsContext } from './RequestsContext'
import useA from '../hooks/activities/useActivities'

interface Props extends PropsWithChildren {
  activity?: ActivityRow | number
}

interface Context {
  setActivityId: (id: number) => void
  activity?: ActivityRow
  fieldValues: FormulaContextValue[]
  setFieldValue: (key: string, value: number) => void
  isLogging: boolean
  logCompletion: () => Promise<void>
  canLog: boolean
}

export const ActivityCompletionContext = createContext<Context>({
  setActivityId: () => {},
  fieldValues: [],
  setFieldValue: () => {},
  isLogging: false,
  logCompletion: async () => {},
  canLog: false
})

export const ActivityCompletionProvider = ({ children, ...props }: Props) => {
  const Requests = useContext(RequestsContext)
  const queryClient = useQueryClient()
  const { gameId, characterId, userId } = usePlayContext()
  const { data: activities } = useA()
  const [activityId, setActivityId] = useState<number | undefined>(
    typeof props.activity === 'number' ? props.activity : props.activity?.id
  )
  const [isLogging, setIsLogging] = useState(false)
  const [fieldValues, setFieldValues] = useState<FormulaContextValue[]>([])
  const activity = (activities || []).find((a) => a.id === activityId)
  const canLog =
    !isLogging &&
    !!activity &&
    (!activity.fields ||
      !activity.fields.length ||
      activity.fields.length === fieldValues.length)

  useEffect(() => setFieldValues([]), [activityId])

  const setFieldValue = (key: string, value: number) => {
    setFieldValues([
      ...fieldValues.filter((f) => f.key !== key),
      { key, kind: 'activity:field', value }
    ])
  }

  const logCompletion = async () => {
    // 0. Throw an error if the required IDs are not present
    if (!gameId || !characterId || !activityId) {
      throw `Cannot log activity completion; missing an identifier: gameId: ${gameId}, characterId: ${characterId}, activityId: ${activityId}`
    }

    // 1. Set logging state
    setIsLogging(true)

    // 2. Create the log record
    await Requests.completeActivityAsCharacter(
      {
        characterId,
        activityId
      },
      { fieldValues }
    )

    // 3. Done logging
    setIsLogging(false)

    // 4. Fetch updated records pertaining to character and activities
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
    setActivityId,
    activity,
    fieldValues,
    setFieldValue,
    isLogging,
    logCompletion,
    canLog
  }

  return (
    <ActivityCompletionContext.Provider value={value}>
      {children}
    </ActivityCompletionContext.Provider>
  )
}
