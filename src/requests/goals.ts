import { GoalRow } from 'common'
import { HTTPRequests } from '.'

const Goals = ({ GET }: HTTPRequests) => {
  const getGoals = (params: {
    gameId?: number
    id?: number
  }): Promise<GoalRow[]> => GET('/goals', params)

  return {
    getGoals
  }
}

export default Goals
