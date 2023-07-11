import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Character, CharacterGetParams } from 'common'
import { RequestsContext } from '../contexts/RequestsContext'

const useCharacters = (params: CharacterGetParams, enabled: boolean) => {
  const Requests = useContext(RequestsContext)

  return useQuery<Character[]>({
    queryKey: [
      'games',
      params.gameId,
      'users',
      params.userId,
      'characters',
      params.id
    ],
    queryFn: () => Requests.getCharacters(params),
    enabled
  })
}

export default useCharacters
