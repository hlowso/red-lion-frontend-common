import { LogGetParams } from 'common'
import { HTTPRequests } from '.'

const Logs = ({ GET }: HTTPRequests) => {
  const getLogs = (params: LogGetParams) => GET('/logs', params)

  return {
    getLogs
  }
}

export default Logs
