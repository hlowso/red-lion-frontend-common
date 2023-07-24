import { TallyGetParams } from 'common'
import { HTTPRequests } from '.'

const Tallies = ({ GET }: HTTPRequests) => {
  const getTallies = (params: TallyGetParams) => GET('/tallies', params)

  return {
    getTallies
  }
}

export default Tallies
