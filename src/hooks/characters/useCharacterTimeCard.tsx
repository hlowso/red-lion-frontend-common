import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { RequestsContext } from '../../contexts/RequestsContext'
import { usePlayContext } from '../../contexts'
import { TimeCard } from 'common'

const useCharacterTimeCard = (timeCardId: number) => {
  const Requests = useContext(RequestsContext)
  const { gameId, characterId: id, userId, ...context } = usePlayContext()

  const result = useQuery<undefined, undefined, TimeCard, any>({
    queryKey: [
      'games',
      gameId,
      'users',
      userId,
      'characters',
      id,
      'time-cards',
      timeCardId
    ],
    queryFn: () =>
      Requests.getTimeCardToday({
        id: id!,
        timeCardId
      }),
    enabled: !!gameId && !!userId && !!id && !context.isLoading
  })

  return {
    ...result,
    data: result.data?.lastPunch
      ? { ...result.data, lastPunch: new Date(result.data.lastPunch) }
      : result.data
  }
}

export default useCharacterTimeCard
