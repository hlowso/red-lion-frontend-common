import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useCharacterCommitmentStreak = () => {
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
      'commitment-streak'
    ],
    queryFn: () =>
      Requests.getCommitmentStreak({
        id: id!
      }),
    enabled: !!gameId && !!userId && !!id && !context.isLoading
  })
}

export default useCharacterCommitmentStreak
