import {
  ActivityGetParams,
  ActivityPostParams,
  ActivityPatchParams
} from 'common'

const Activities = ({ GET, POST, PATCH }) => {
  const getActivities = (params: ActivityGetParams) =>
    GET('/activities', params)

  const createActivity = (params: ActivityPostParams) =>
    POST('/activities', params)

  const updateActivity = ({ id, ...params }: ActivityPatchParams) =>
    PATCH(`/activities/${id}`, params)

  return {
    getActivities,
    createActivity,
    updateActivity
  }
}

export default Activities
