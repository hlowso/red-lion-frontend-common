import { ActivityGetParams } from 'common'

const Activities = ({ GET }) => {
  const getActivities = (params: ActivityGetParams) =>
    GET('/activities', params)

  return {
    getActivities
  }
}

export default Activities
