import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'

const useCharacterCommitmentStreak = (params: {
  gameId?: number
  characterId?: number
  userId?: number
}) => {
  const Requests = useContext(RequestsContext)

  return useQuery<undefined, undefined, number, any>({
    queryKey: [
      'games',
      params.gameId,
      'users',
      params.userId,
      'characters',
      params.characterId,
      'commitment-streak'
    ],
    queryFn: () =>
      Requests.getCommitmentStreak({
        id: params.characterId!
      }),
    enabled: !!params.gameId && !!params.userId && !!params.characterId
  })
}

export default useCharacterCommitmentStreak
