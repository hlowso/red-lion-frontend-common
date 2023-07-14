import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect
} from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useG from '../hooks/useGames'
import useC from '../hooks/characters/useCharacters'
import { Character, Possessions } from 'common'
import { useSocket } from './SocketContext'

interface Context extends Omit<Character, 'id'> {
  isLoading: boolean
  username: string
  characterId: number
  gameName: string
  possessions: Possessions
}

const PlayContext = createContext<Partial<Context>>({})

export const usePlayContext = () => useContext(PlayContext)
export const PlayProvider = ({ children }: PropsWithChildren) => {
  const socketEvents = useSocket()
  const query = new URLSearchParams(document.location.search)
  const { data: user, isLoading: currentUserLoading } = useCurrentUser(
    query.get('username') as string
  )
  const { data: games, isLoading: GLoading } = useG(
    { userId: user?.id },
    !!user
  )
  const [game] = Array.isArray(games) ? games : []
  const { data: characters, isLoading: CLoading } = useC(
    { userId: user?.id, gameId: game?.id },
    !!user?.id && !!game?.id
  )
  const [character] = Array.isArray(characters) ? characters : []

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
    userId: user?.id,
    username: user?.username,
    characterId: character?.id,
    imageUrl: character?.imageUrl,
    gameId: game?.id,
    gameName: game?.name,
    possessions,
    ...possessions
  }

  return <PlayContext.Provider value={value}>{children}</PlayContext.Provider>
}
