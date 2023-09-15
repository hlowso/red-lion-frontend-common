import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useCharacterTimeCardStreak = (timeCardId: number) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId: id, userId, ...context } = usePlayContext()

  return useQuery<undefined, undefined, number, any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      id,
      'time-card-streaks',
      timeCardId
    ],
    queryFn: () =>
      Requests.getTimeCardStreak({
        id: id!,
        timeCardId
      }),
    enabled: !!gameId && !!userId && !!id && !context.isLoading
  })
}

export default useCharacterTimeCardStreak
