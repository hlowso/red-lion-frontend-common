import { ActivityGetParams, ActivityPostParams } from 'common'

const Activities = ({ GET, POST }) => {
  const getActivities = (params: ActivityGetParams) =>
    GET('/activities', params)

  const createActivity = (params: ActivityPostParams) =>
    POST('/activities', params)

  return {
    getActivities,
    createActivity
  }
}

export default Activities
