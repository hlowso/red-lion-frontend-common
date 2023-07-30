import { HTTPRequests } from '.'

const Goals = ({ GET }: HTTPRequests) => {
  const getGoals = (params: { gameId?: number; id?: number }) =>
    GET('/goals', params)

  return {
    getGoals
  }
}

export default Goals
