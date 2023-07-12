import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect
} from 'react'
import useCurrentUser from '../hooks/useCurrentUser'
import useGames from '../hooks/useGames'
import useCharacters from '../hooks/useCharacters'
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
  const { data: user } = useCurrentUser(query.get('username') as string)
  const { data: games } = useGames({ userId: user?.id }, !!user)
  const [game] = Array.isArray(games) ? games : []
  const { data: characters, isLoading } = useCharacters(
    { userId: user?.id, gameId: game?.id },
    !!user && !!game
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
    isLoading,
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
