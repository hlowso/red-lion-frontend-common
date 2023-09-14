import { useQuery } from '@tanstack/react-query'
import { Commitment, CommitmentRow } from 'common'
import { useContext } from 'react'
import { RequestsContext } from '../../contexts/RequestsContext'

interface Props {
  gameId?: number
  userId?: number
  characterId?: number
}

const useCharacterCommitment = ({ gameId, characterId, userId }: Props) => {
  const Requests = useContext(RequestsContext)

  const result = useQuery<undefined, undefined, CommitmentRow, any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      characterId,
      'commitment'
    ],
    queryFn: () => Requests.getCharacterCommitment({ id: characterId }),
    enabled: !!gameId && !!userId && !!characterId
  })

  const row = result.data

  return {
    ...result,
    data: {
      ...(row || {}),
      activityIds: row?.activityIds.split(',').map(Number),
      committed: !!row
    } as Commitment
  }
}

export default useCharacterCommitment
