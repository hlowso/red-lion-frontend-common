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
import useA from '../hooks/useActivities'

interface Props extends PropsWithChildren {
  activityId?: number
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
  const { gameId, characterId, ...context } = usePlayContext()
  const { data: activities } = useA({ gameId, characterId }, !context.isLoading)
  const [activityId, setActivityId] = useState<number | undefined>(
    props.activityId
  )
  const [isLogging, setIsLogging] = useState(false)
  const [fieldValues, setFieldValues] = useState<FormulaContextValue[]>([])
  const activity = (activities || []).find((a) => a.id === activityId)
  const canLog =
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
    if (!gameId || !characterId || !activityId) {
      throw `Cannot log activity completion; missing an identifier: gameId: ${gameId}, characterId: ${characterId}, activityId: ${activityId}`
    }
    setIsLogging(true)
    await Requests.completeActivityAsCharacter(
      {
        characterId: characterId!,
        activityId
      },
      { fieldValues }
    )
    setIsLogging(false)
    await queryClient.invalidateQueries({ queryKey: ['games', gameId] })
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
