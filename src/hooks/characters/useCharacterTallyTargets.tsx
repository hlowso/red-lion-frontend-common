import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'
import { CharacterTallyTarget } from 'common'

const useCharacterTallyTargets = () => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId: id, userId, ...context } = usePlayContext()

  const result = useQuery<undefined, undefined, CharacterTallyTarget[], any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      id,
      'tally-targets'
    ],
    queryFn: () =>
      Requests.getCharacterTallyTargets({
        id: id!
      }),
    enabled: !!gameId && !!userId && !!id && !context.isLoading
  })

  return { ...result, data: result.data?.sort((a, b) => a.id - b.id) }
}

export default useCharacterTallyTargets
