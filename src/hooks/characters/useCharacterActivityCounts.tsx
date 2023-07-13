import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useCharacterActivityCounts = ({ activityId }: { activityId: number }) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId, userId, ...context } = usePlayContext()

  return useQuery<undefined, undefined, number, any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      characterId,
      'activities',
      activityId
    ],
    queryFn: () =>
      Requests.getCharacterActivityCountToday({
        characterId: characterId!,
        activityId
      }),
    enabled: !!gameId && !!userId && !!characterId && !context.isLoading
  })
}

export default useCharacterActivityCounts
