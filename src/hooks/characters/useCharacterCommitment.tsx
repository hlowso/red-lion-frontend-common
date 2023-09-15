import { useQuery } from '@tanstack/react-query'
import { Commitment, CommitmentRow } from 'common'
import { useContext, useEffect } from 'react'
import { RequestsContext } from '../../contexts/RequestsContext'
import useLocal from '../useLocal'

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
  const { set } = useLocal('committing-activities')

  const row = result.data
  useEffect(() => row && set([]), [!!row])

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
