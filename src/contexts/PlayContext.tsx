import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useG from '../hooks/useGames'
import useC from '../hooks/characters/useCharacters'
import { Character, Possessions, Commitment } from 'common'
import { useSocket } from './SocketContext'
import useCharacterCommitment from '../hooks/characters/useCharacterCommitment'
import useLocal from '../hooks/useLocal'

interface Context extends Omit<Character, 'id'> {
  isLoading: boolean
  isFetching: boolean
  username: string
  characterId: number
  gameName: string
  possessions: Possessions
  committed: boolean
  commitmentActivityIds: number[]
  toggleCommittingActivityId: (id: number) => void
}

const PlayContext = createContext<Partial<Context>>({})

export const usePlayContext = () => useContext(PlayContext)
export const PlayProvider = ({ children }: PropsWithChildren) => {
  const socketEvents = useSocket()
  const query = new URLSearchParams(document.location.search)
  const {
    data: user,
    isLoading: currentUserLoading,
    isFetching: currentUserFetching
  } = useCurrentUser(query.get('username') as string)

  const {
    data: games,
    isLoading: GLoading,
    isFetching: GFetching
  } = useG({ userId: user?.id }, !!user)
  const [game] = Array.isArray(games) ? games : []

  const {
    data: characters,
    isLoading: CLoading,
    isFetching: CFetching
  } = useC({ userId: user?.id, gameId: game?.id }, !!user?.id && !!game?.id)
  const [character] = Array.isArray(characters) ? characters : []

  const { data: commitment } = useCharacterCommitment({
    gameId: game?.id,
    userId: user?.id,
    characterId: character?.id
  })
  const { value: committingActivityIds, set: setCommittingActivityIds } =
    useLocal('committing-activities')

  const toggleCommittingActivityId = (id: number) =>
    setCommittingActivityIds(
      committingActivityIds.includes(id)
        ? committingActivityIds.filter((i) => i !== id)
        : [...committingActivityIds, id]
    )

  useEffect(() => {
    if (user?.id) {
      socketEvents?.identify({ userId: user.id })
    }
  }, [user?.id, socketEvents])

  const possessions = {
    items: character?.items || {},
    tallies: character?.tallies || {},
    progressions: character?.progressions || {},
    subscriptions: character?.subscriptions || {},
    states: character?.states || {}
  }

  const value = {
    isLoading: currentUserLoading || GLoading || CLoading,
    isFetching: currentUserFetching || GFetching || CFetching,
    userId: user?.id,
    username: user?.username,
    characterId: character?.id,
    imageUrl: character?.imageUrl,
    gameId: game?.id,
    gameName: game?.name,
    possessions,
    commitmentActivityIds: commitment?.activityIds || committingActivityIds,
    committed: !!commitment?.committed,
    toggleCommittingActivityId,
    ...possessions
  }

  return <PlayContext.Provider value={value}>{children}</PlayContext.Provider>
}
