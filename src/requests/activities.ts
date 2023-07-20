import { ActivityGetParams, ActivityPostParams, ActivityRow } from 'common'

const Activities = ({ GET, POST, PATCH }) => {
  const getActivities = (params: ActivityGetParams) =>
    GET('/activities', params)

  const createActivity = (params: ActivityPostParams) =>
    POST('/activities', params)

  const updateActivity = ({
    id,
    ...params
  }: { id: number } & ActivityPostParams) => PATCH(`/activities/${id}`, params)

  return {
    getActivities,
    createActivity,
    updateActivity
  }
}

export default Activities
