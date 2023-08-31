import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'
import { ActivityStreak } from 'common'

const useCharacterLongestStreaks = () => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId: id, userId, ...context } = usePlayContext()

  return useQuery<undefined, undefined, ActivityStreak[], any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      id,
      'longest-streaks'
    ],
    queryFn: () =>
      Requests.getCharacterLongestStreaks({
        id: id!
      }),
    enabled: !!gameId && !!userId && !!id && !context.isLoading
  })
}

export default useCharacterLongestStreaks
