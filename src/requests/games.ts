import { GameGetParams } from 'common'

const Games = ({ GET }) => {
  const getGames = (params: GameGetParams) => GET('/games', params)

  return {
    getGames
  }
}

export default Games
