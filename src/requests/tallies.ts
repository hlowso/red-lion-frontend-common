import { TallyGetParams } from 'common'

const Tallies = ({ GET }) => {
  const getTallies = (params: TallyGetParams) => GET('/tallies', params)

  return {
    getTallies
  }
}

export default Tallies
