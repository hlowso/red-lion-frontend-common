import { GameGetParams } from 'common'
import { HTTPRequests } from '.'

const Games = ({ GET }: HTTPRequests) => {
  const getGames = (params: GameGetParams) => GET('/games', params)

  return {
    getGames
  }
}

export default Games
